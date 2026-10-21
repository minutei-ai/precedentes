import { BunRuntime, BunServices } from "@effect/platform-bun";
import {
  Cause,
  Clock,
  Console,
  Effect,
  FileSystem,
  Layer,
  Ref,
  Schema,
} from "effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const API = "https://pangeabnp.pdpj.jus.br/api/v1";
const ROOT = "fontes/pangea";
const safeKey = Schema.NonEmptyString.pipe(
  Schema.check(Schema.isPattern(/^[a-zA-Z0-9_-]+$/u)),
);
const digest = (bytes: Uint8Array | string) =>
  new Bun.CryptoHasher("sha256").update(bytes).digest("hex");
const jsonRecord = Schema.Record(Schema.String, Schema.Unknown);
const Parameters = Schema.Struct({
  orgaos: Schema.Array(
    Schema.Struct({
      sigla: safeKey,
      descricao: Schema.NonEmptyString,
      grupoEspecies: Schema.Int,
    }),
  ),
  gruposEspecies: Schema.Array(
    Schema.Struct({
      id: Schema.Int,
      especies: Schema.Array(Schema.NonEmptyString),
    }),
  ),
  especies: Schema.Array(
    Schema.Struct({
      sigla: Schema.NonEmptyString,
      descricao: Schema.NonEmptyString,
    }),
  ),
});
const Record = Schema.StructWithRest(
  Schema.Struct({
    id: safeKey,
    nr: Schema.Union([Schema.Number, Schema.String]),
    orgao: safeKey,
    tipo: safeKey,
    tese: Schema.optional(Schema.NullOr(Schema.String)),
    questao: Schema.optional(Schema.NullOr(Schema.String)),
    situacao: Schema.optional(Schema.NullOr(Schema.String)),
    ultimaAtualizacao: Schema.optional(Schema.NullOr(Schema.String)),
    textoEmenta: Schema.optional(Schema.NullOr(Schema.String)),
    textoDecisao: Schema.optional(Schema.NullOr(Schema.String)),
    textoAtoImpugnado: Schema.optional(Schema.NullOr(Schema.String)),
    linkDecisao: Schema.optional(Schema.NullOr(Schema.String)),
    processosParadigma: Schema.optional(
      Schema.NullOr(
        Schema.Array(
          Schema.StructWithRest(
            Schema.Struct({
              numero: Schema.optional(Schema.NullOr(Schema.String)),
              link: Schema.optional(Schema.NullOr(Schema.String)),
            }),
            [jsonRecord],
          ),
        ),
      ),
    ),
  }),
  [jsonRecord],
);
export const Page = Schema.Struct({
  total: Schema.Int,
  posicao_inicial: Schema.Int,
  posicao_final: Schema.Int,
  resultados: Schema.Array(Record),
  aggsOrgaos: Schema.Array(Schema.Struct({ tipo: safeKey, total: Schema.Int })),
  aggsEspecies: Schema.Array(
    Schema.Struct({ tipo: Schema.NonEmptyString, total: Schema.Int }),
  ),
});
const Receipt = Schema.Struct({
  file: Schema.NonEmptyString,
  sha256: Schema.NonEmptyString,
  bytes: Schema.Int,
  capturedAt: Schema.NonEmptyString,
});
const Partition = Schema.Struct({
  types: Schema.Array(Schema.NonEmptyString),
  expected: Schema.Int,
  pages: Schema.Array(Receipt),
  verification: Receipt,
});
const Court = Schema.Struct({
  court: safeKey,
  types: Schema.Array(Schema.NonEmptyString),
  status: Schema.Literals(["collected", "failed", "unavailable"]),
  expected: Schema.optional(Schema.Int),
  records: Schema.Int,
  partitions: Schema.Array(Partition),
  inventory: Schema.optional(Receipt),
  failure: Schema.optional(Schema.String),
});
const Manifest = Schema.Struct({
  source: Schema.Literal(API),
  startedAt: Schema.NonEmptyString,
  parameters: Receipt,
  inventory: Receipt,
  courts: Schema.Array(Court),
});
const Filter = Schema.Struct({
  buscaGeral: Schema.String,
  todasPalavras: Schema.String,
  quaisquerPalavras: Schema.String,
  semPalavras: Schema.String,
  trechoExato: Schema.String,
  atualizacaoDesde: Schema.String,
  atualizacaoAte: Schema.String,
  cancelados: Schema.Boolean,
  ordenacao: Schema.Literal("Nume-Asc"),
  nr: Schema.String,
  pagina: Schema.Int,
  tamanhoPagina: Schema.Literal(100),
  orgaos: Schema.Array(safeKey),
  tipos: Schema.Array(Schema.NonEmptyString),
});
const Request = Schema.Struct({ filtro: Filter });
class IntegrityError extends Schema.TaggedError<IntegrityError>()(
  "IntegrityError",
  { reason: Schema.NonEmptyString },
) {
  override get message() {
    return this.reason;
  }
}

const atomicWrite = Effect.fn("corpus.atomicWrite")(function* (
  file: string,
  bytes: string | Uint8Array,
) {
  const fs = yield* FileSystem.FileSystem;
  const separator = file.lastIndexOf("/");
  if (separator > 0)
    yield* fs.makeDirectory(file.slice(0, separator), { recursive: true });
  yield* fs.writeFile(`${file}.tmp`, new Uint8Array(Buffer.from(bytes)));
  yield* fs.rename(`${file}.tmp`, file);
});

const capture = Effect.fn("pangea.capture")(function* (
  file: string,
  request: HttpClientRequest.HttpClientRequest,
) {
  yield* Effect.sleep("300 millis");
  const http = (yield* HttpClient.HttpClient).pipe(
    HttpClient.retryTransient({ times: 2 }),
  );
  const response = yield* http
    .execute(request)
    .pipe(Effect.timeout("45 seconds"));
  yield* HttpClientResponse.filterStatusOk(response);
  const bytes = new Uint8Array(yield* response.arrayBuffer);
  const compressed = Bun.gzipSync(bytes);
  yield* atomicWrite(file, compressed);
  return Receipt.make({
    file,
    sha256: digest(compressed),
    bytes: bytes.length,
    capturedAt: new Date(yield* Clock.currentTimeMillis).toISOString(),
  });
});

const readCapture = Effect.fn("pangea.readCapture")(function* (
  receipt: typeof Receipt.Type,
) {
  const fs = yield* FileSystem.FileSystem;
  const compressed = yield* fs.readFile(receipt.file);
  if (digest(compressed) !== receipt.sha256)
    return yield* new IntegrityError({
      reason: `SHA-256 divergente: ${receipt.file}`,
    });
  const bytes = Bun.gunzipSync(new Uint8Array(compressed));
  if (bytes.length !== receipt.bytes)
    return yield* new IntegrityError({
      reason: `Tamanho divergente: ${receipt.file}`,
    });
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
});

const requestPage = (
  courts: ReadonlyArray<string>,
  types: ReadonlyArray<string>,
  page: number,
) =>
  HttpClientRequest.post(`${API}/precedentes`).pipe(
    HttpClientRequest.bodyText(
      Schema.encodeSync(Schema.fromJsonString(Request))({
        filtro: {
          buscaGeral: "",
          todasPalavras: "",
          quaisquerPalavras: "",
          semPalavras: "",
          trechoExato: "",
          atualizacaoDesde: "",
          atualizacaoAte: "",
          cancelados: true,
          ordenacao: "Nume-Asc",
          nr: "",
          pagina: page,
          tamanhoPagina: 100,
          orgaos: courts,
          tipos: types,
        },
      }),
      "application/json",
    ),
  );

export const validatePage = Effect.fn("pangea.validatePage")(function* (
  page: typeof Page.Type,
  court: string,
  types: ReadonlyArray<string>,
  number: number,
  expected: number,
  seen: Set<string>,
) {
  if (page.total !== expected || page.total < 0)
    return yield* new IntegrityError({
      reason: `Total mudou: ${court}, página ${number}, ${expected} → ${page.total}`,
    });
  const length = Math.min(100, Math.max(0, expected - (number - 1) * 100));
  if (page.resultados.length !== length)
    return yield* new IntegrityError({
      reason: `Página truncada: ${court}/${number}: ${page.resultados.length}/${length}`,
    });
  if (
    length > 0 &&
    (page.posicao_inicial !== (number - 1) * 100 + 1 ||
      page.posicao_final !== (number - 1) * 100 + length)
  )
    return yield* new IntegrityError({
      reason: `Posição incorreta: ${court}/${number}`,
    });
  for (const row of page.resultados) {
    if (row.orgao !== court || !types.includes(row.tipo) || seen.has(row.id))
      return yield* new IntegrityError({
        reason: `Registro duplicado ou fora do filtro: ${row.id}`,
      });
    seen.add(row.id);
  }
});

const collect = Effect.fn("pangea.collect")(function* () {
  const fs = yield* FileSystem.FileSystem;
  const manifestFile = `${ROOT}/manifest.json`;
  const openManifest = Effect.gen(function* () {
    if (yield* fs.exists(manifestFile))
      return yield* Schema.decodeUnknownEffect(Schema.fromJsonString(Manifest))(
        yield* fs.readFileString(manifestFile),
      );
    const parameters = yield* capture(
      `${ROOT}/parametros.json.gz`,
      HttpClientRequest.get(`${API}/parametros`),
    );
    const catalog = yield* Schema.decodeUnknownEffect(
      Schema.fromJsonString(Parameters),
    )(yield* readCapture(parameters));
    const inventory = yield* capture(
      `${ROOT}/inventario.json.gz`,
      requestPage(
        catalog.orgaos.map((court) => court.sigla),
        [...new Set(catalog.gruposEspecies.flatMap((group) => group.especies))],
        1,
      ),
    );
    const manifest = Manifest.make({
      source: API,
      startedAt: new Date(yield* Clock.currentTimeMillis).toISOString(),
      parameters,
      inventory,
      courts: [],
    });
    yield* atomicWrite(
      manifestFile,
      Schema.encodeSync(Schema.fromJsonString(Manifest))(manifest),
    );
    return manifest;
  });
  const manifest = yield* Ref.make(yield* openManifest);
  const initial = yield* Ref.get(manifest);
  const catalog = yield* Schema.decodeUnknownEffect(
    Schema.fromJsonString(Parameters),
  )(yield* readCapture(initial.parameters));
  const inventory = yield* Schema.decodeUnknownEffect(
    Schema.fromJsonString(Page),
  )(yield* readCapture(initial.inventory));
  for (const court of catalog.orgaos) {
    const current = yield* Ref.get(manifest);
    const previous = current.courts.find((item) => item.court === court.sigla);
    if (
      previous?.status === "collected" ||
      previous?.status === "unavailable"
    ) {
      for (const partition of previous.partitions) {
        for (const receipt of partition.pages) yield* readCapture(receipt);
        yield* readCapture(partition.verification);
      }
      if (previous.inventory !== undefined)
        yield* readCapture(previous.inventory);
      continue;
    }
    const types =
      catalog.gruposEspecies.find((group) => group.id === court.grupoEspecies)
        ?.especies ?? [];
    const partitions: Array<typeof Partition.Type> = [];
    const attempt = Effect.gen(function* () {
      if (types.length === 0)
        return Court.make({
          court: court.sigla,
          types,
          status: "unavailable",
          records: 0,
          partitions,
        });
      const courtInventory = yield* capture(
        `${ROOT}/${court.sigla}/inventario.json.gz`,
        requestPage([court.sigla], types, 1),
      );
      const first = yield* Schema.decodeUnknownEffect(
        Schema.fromJsonString(Page),
      )(yield* readCapture(courtInventory));
      const nationalCount =
        inventory.aggsOrgaos.find((item) => item.tipo === court.sigla)?.total ??
        0;
      if (nationalCount !== first.total)
        return yield* new IntegrityError({
          reason: `Inventário nacional diverge: ${court.sigla}, ${nationalCount}/${first.total}`,
        });
      const seen = new Set<string>();
      if (first.total <= 100) {
        yield* validatePage(first, court.sigla, types, 1, first.total, seen);
        const verification = yield* capture(
          `${ROOT}/${court.sigla}/verificacao.json.gz`,
          requestPage([court.sigla], types, 1),
        );
        const verified = yield* Schema.decodeUnknownEffect(
          Schema.fromJsonString(Page),
        )(yield* readCapture(verification));
        if (
          verified.total !== first.total ||
          verified.resultados
            .map((row) => row.id)
            .sort()
            .join() !==
            first.resultados
              .map((row) => row.id)
              .sort()
              .join()
        )
          return yield* new IntegrityError({
            reason: `Fonte mudou durante coleta: ${court.sigla}`,
          });
        partitions.push(
          Partition.make({
            types,
            expected: first.total,
            pages: [courtInventory],
            verification,
          }),
        );
        return Court.make({
          court: court.sigla,
          types,
          status: "collected",
          expected: first.total,
          records: seen.size,
          partitions,
          inventory: courtInventory,
        });
      }
      for (const species of first.aggsEspecies.filter(
        (item) => item.total > 0,
      )) {
        yield* Schema.decodeUnknownEffect(safeKey)(species.tipo);
        if (!types.includes(species.tipo))
          return yield* new IntegrityError({
            reason: `Espécie fora do catálogo: ${court.sigla}/${species.tipo}`,
          });
        const pages: Array<typeof Receipt.Type> = [];
        for (const number of Array.from(
          { length: Math.ceil(species.total / 100) },
          (_, index) => index + 1,
        )) {
          const receipt = yield* capture(
            `${ROOT}/${court.sigla}/${species.tipo}/pagina-${String(number).padStart(3, "0")}.json.gz`,
            requestPage([court.sigla], [species.tipo], number),
          );
          pages.push(receipt);
          const page = yield* Schema.decodeUnknownEffect(
            Schema.fromJsonString(Page),
          )(yield* readCapture(receipt));
          yield* validatePage(
            page,
            court.sigla,
            [species.tipo],
            number,
            species.total,
            seen,
          );
        }
        const verification = yield* capture(
          `${ROOT}/${court.sigla}/${species.tipo}/verificacao.json.gz`,
          requestPage([court.sigla], [species.tipo], 1),
        );
        const verified = yield* Schema.decodeUnknownEffect(
          Schema.fromJsonString(Page),
        )(yield* readCapture(verification));
        const firstReceipt = pages[0];
        if (firstReceipt === undefined)
          return yield* new IntegrityError({
            reason: `Sem primeira página: ${court.sigla}/${species.tipo}`,
          });
        const firstPage = yield* Schema.decodeUnknownEffect(
          Schema.fromJsonString(Page),
        )(yield* readCapture(firstReceipt));
        if (
          verified.total !== species.total ||
          verified.resultados.map((row) => row.id).join() !==
            firstPage.resultados.map((row) => row.id).join()
        )
          return yield* new IntegrityError({
            reason: `Fonte mudou durante coleta: ${court.sigla}/${species.tipo}`,
          });
        partitions.push(
          Partition.make({
            types: [species.tipo],
            expected: species.total,
            pages,
            verification,
          }),
        );
      }
      if (seen.size !== first.total)
        return yield* new IntegrityError({
          reason: `União das espécies incompleta: ${court.sigla}, ${seen.size}/${first.total}`,
        });
      return Court.make({
        court: court.sigla,
        types,
        status: "collected",
        expected: first.total,
        records: seen.size,
        partitions,
        inventory: courtInventory,
      });
    }).pipe(
      Effect.catchCause((cause) =>
        Effect.succeed(
          Court.make({
            court: court.sigla,
            types,
            status: "failed",
            records: 0,
            partitions,
            failure: Cause.pretty(cause),
          }),
        ),
      ),
    );
    const result = yield* attempt;
    const next = {
      ...current,
      courts: [
        ...current.courts.filter((item) => item.court !== court.sigla),
        result,
      ],
    };
    yield* atomicWrite(
      manifestFile,
      Schema.encodeSync(Schema.fromJsonString(Manifest))(next),
    );
    yield* Ref.set(manifest, next);
    yield* Console.log(
      `${result.court}: ${result.status}, ${result.records} registros`,
    );
    if (result.failure !== undefined) yield* Console.error(result.failure);
  }
  const final = yield* Ref.get(manifest);
  if (final.courts.some((court) => court.status === "failed"))
    process.exitCode = 1;
});

const markdown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
});
markdown.use(gfm);
markdown.remove(["script", "style", "iframe"]);
export const toMarkdown = (html: string) => {
  const text = markdown.turndown(html).trim();
  if (/^não informado\.?$/iu.test(text)) return "";
  return text;
};
const recordPath = (row: typeof Record.Type) =>
  `tribunais/${row.orgao}/${row.tipo.toLowerCase()}/${row.id}.md`;
const formatNumber = (value: number) =>
  new Intl.NumberFormat("pt-BR").format(value);

const build = Effect.fn("corpus.build")(function* (check: boolean) {
  const fs = yield* FileSystem.FileSystem;
  const manifest = yield* Schema.decodeUnknownEffect(
    Schema.fromJsonString(Manifest),
  )(yield* fs.readFileString(`${ROOT}/manifest.json`));
  const catalog = yield* Schema.decodeUnknownEffect(
    Schema.fromJsonString(Parameters),
  )(yield* readCapture(manifest.parameters));
  const inventory = yield* Schema.decodeUnknownEffect(
    Schema.fromJsonString(Page),
  )(yield* readCapture(manifest.inventory));
  const records = new Map<string, typeof Record.Type>();
  const files = new Map<string, string>();
  for (const court of manifest.courts) {
    if (court.status !== "collected") continue;
    const seen = new Set<string>();
    for (const partition of court.partitions) {
      const partitionSeen = new Set<string>();
      for (const [index, receipt] of partition.pages.entries()) {
        const page = yield* Schema.decodeUnknownEffect(
          Schema.fromJsonString(Page),
        )(yield* readCapture(receipt));
        yield* validatePage(
          page,
          court.court,
          partition.types,
          index + 1,
          partition.expected,
          partitionSeen,
        );
        for (const row of page.resultados) {
          if (records.has(row.id))
            return yield* new IntegrityError({
              reason: `ID repetido entre tribunais: ${row.id}`,
            });
          records.set(row.id, row);
          seen.add(row.id);
        }
      }
      if (partitionSeen.size !== partition.expected)
        return yield* new IntegrityError({
          reason: `Partição incompleta: ${court.court}/${partition.types.join(",")}`,
        });
      const verified = yield* Schema.decodeUnknownEffect(
        Schema.fromJsonString(Page),
      )(yield* readCapture(partition.verification));
      const firstReceipt = partition.pages[0];
      if (firstReceipt === undefined)
        return yield* new IntegrityError({
          reason: `Sem primeira página: ${court.court}`,
        });
      const first = yield* Schema.decodeUnknownEffect(
        Schema.fromJsonString(Page),
      )(yield* readCapture(firstReceipt));
      if (
        verified.total !== partition.expected ||
        verified.resultados
          .map((row) => row.id)
          .sort()
          .join() !==
          first.resultados
            .map((row) => row.id)
            .sort()
            .join()
      )
        return yield* new IntegrityError({
          reason: `Verificação divergente: ${court.court}`,
        });
    }
    if (
      seen.size !== court.records ||
      seen.size !== court.expected ||
      court.inventory === undefined
    )
      return yield* new IntegrityError({
        reason: `Coleta incompleta: ${court.court}`,
      });
    const courtInventory = yield* Schema.decodeUnknownEffect(
      Schema.fromJsonString(Page),
    )(yield* readCapture(court.inventory));
    if (
      courtInventory.total !== court.records ||
      courtInventory.aggsEspecies.reduce(
        (total, species) => total + species.total,
        0,
      ) !== court.records
    )
      return yield* new IntegrityError({
        reason: `Inventário de espécies divergente: ${court.court}`,
      });
    const official =
      inventory.aggsOrgaos.find((item) => item.tipo === court.court)?.total ??
      0;
    if (official !== court.records)
      return yield* new IntegrityError({
        reason: `Inventário divergente: ${court.court}`,
      });
  }
  const ordered = [...records.values()].sort((left, right) =>
    left.id.localeCompare(right.id),
  );
  const emptyTheses = new Set<string>();
  const emptyRecords = new Set<string>();
  for (const row of ordered) {
    const title = `${row.orgao} · ${row.tipo} ${row.nr}`;
    const question = toMarkdown(row.questao ?? "");
    const text = toMarkdown(row.tese ?? "");
    const ementa = toMarkdown(row.textoEmenta ?? "");
    const decision = toMarkdown(row.textoDecisao ?? "");
    const act = toMarkdown(row.textoAtoImpugnado ?? "");
    if (text.length === 0) emptyTheses.add(row.id);
    const sections = [
      `# ${title}`,
      `- **Tribunal:** ${row.orgao}\n- **Espécie:** ${catalog.especies.find((type) => type.sigla === row.tipo)?.descricao ?? row.tipo}\n- **Número:** ${row.nr}\n- **Identificador na fonte:** \`${row.id}\`\n- **Situação na fonte:** ${row.situacao ?? "Não informada"}\n- **Atualização informada pela fonte:** ${row.ultimaAtualizacao ?? "Não informada"}\n- **Fonte:** [Pangea/BNP — CNJ](https://bnp.pdpj.jus.br/pesquisa?orgao=${encodeURIComponent(row.orgao.toLowerCase())}&tipo=${encodeURIComponent(row.tipo)}&nr=${encodeURIComponent(String(row.nr))})`,
    ];
    if (question.length > 0)
      sections.push(`## Questão submetida a julgamento\n\n${question}`);
    if (text.length > 0)
      sections.push(`## Texto disponibilizado pela fonte\n\n${text}`);
    if (ementa.length > 0) sections.push(`## Ementa\n\n${ementa}`);
    if (decision.length > 0) sections.push(`## Decisão\n\n${decision}`);
    if (act.length > 0) sections.push(`## Ato impugnado\n\n${act}`);
    if (
      row.linkDecisao?.startsWith("https://") ||
      row.linkDecisao?.startsWith("http://")
    )
      sections.push(`[Consultar a decisão no tribunal](${row.linkDecisao})`);
    if (
      question.length === 0 &&
      text.length === 0 &&
      ementa.length === 0 &&
      decision.length === 0 &&
      act.length === 0
    ) {
      emptyRecords.add(row.id);
      sections.push(
        "A fonte não disponibilizou questão, tese, ementa ou texto da decisão para este registro nesta coleta.",
      );
    }
    if (
      row.processosParadigma !== undefined &&
      row.processosParadigma !== null &&
      row.processosParadigma.length > 0
    ) {
      sections.push(
        `## Processos paradigma\n\n${row.processosParadigma
          .map((process, index) => {
            const label = process.numero ?? `Processo paradigma ${index + 1}`;
            if (
              process.link?.startsWith("https://") ||
              process.link?.startsWith("http://")
            )
              return `- [${label}](${process.link})`;
            return `- ${label}`;
          })
          .join("\n")}`,
      );
    }
    sections.push(
      `Registro reproduzido da fonte oficial. Situação e conteúdo devem ser conferidos na origem. [Dados e histórico preservados](../../../fontes/pangea/${row.orgao}/).`,
    );
    files.set(recordPath(row), `${sections.join("\n\n")}\n`);
  }
  const groups = Map.groupBy(ordered, (row) => row.orgao);
  const rows = [...groups.entries()].sort(([left], [right]) =>
    left.localeCompare(right),
  );
  for (const [court, courtRecords] of rows) {
    const byType = [
      ...Map.groupBy(courtRecords, (row) => row.tipo).entries(),
    ].sort(([left], [right]) => left.localeCompare(right));
    files.set(
      `tribunais/${court}/README.md`,
      `# ${court}\n\n${catalog.orgaos.find((item) => item.sigla === court)?.descricao ?? court}. **${formatNumber(courtRecords.length)} registros.**\n\n| Espécie | Registros |\n| --- | ---: |\n${byType.map(([type, items]) => `| [${catalog.especies.find((item) => item.sigla === type)?.descricao ?? type}](${type.toLowerCase()}/) | ${formatNumber(items.length)} |`).join("\n")}\n`,
    );
    for (const [type, items] of byType)
      files.set(
        `tribunais/${court}/${type.toLowerCase()}/README.md`,
        `# ${court} · ${catalog.especies.find((item) => item.sigla === type)?.descricao ?? type}\n\n**${formatNumber(items.length)} registros.** [Voltar ao tribunal](../)\n\n${items
          .sort(
            (left, right) =>
              Number(left.nr) - Number(right.nr) ||
              left.id.localeCompare(right.id),
          )
          .map(
            (row) =>
              `- [${type} ${row.nr}](${row.id}.md) — ${row.situacao ?? "Situação não informada"}`,
          )
          .join("\n")}\n`,
      );
  }
  files.set(
    "dados/precedentes.jsonl",
    `${ordered.map((row) => Schema.encodeSync(Schema.fromJsonString(Record))(row)).join("\n")}\n`,
  );
  const missingText = emptyTheses.size;
  files.set(
    "COBERTURA.md",
    `# Cobertura\n\nColeta iniciada em ${manifest.startedAt}. Fonte: [Pangea/BNP do CNJ](https://bnp.pdpj.jus.br/).\n\n**${formatNumber(ordered.length)} registros de ${groups.size} órgãos com registros.** ${formatNumber(missingText)} registros não têm texto no campo \`tese\`; podem conter questão, ementa ou decisão em outros campos. ${formatNumber(emptyRecords.size)} registros têm apenas metadados, sem texto nesses campos. Incluímos cancelados, controvérsias e procedimentos ainda sem tese. Contagem de registros não é contagem de teses vigentes.\n\n| Órgão | Registros | Inventário BNP | Coleta |\n| --- | ---: | ---: | --- |\n${catalog.orgaos
      .map((court) => {
        const result = manifest.courts.find(
          (item) => item.court === court.sigla,
        );
        const expected =
          inventory.aggsOrgaos.find((item) => item.tipo === court.sigla)
            ?.total ?? 0;
        const actual = groups.get(court.sigla)?.length ?? 0;
        const label = {
          collected: "Conferido",
          failed: "Falha",
          unavailable: "Sem espécies no catálogo",
          pending: "Pendente",
        }[result?.status ?? "pending"];
        if (actual > 0)
          return `| [${court.sigla}](tribunais/${court.sigla}/) | ${formatNumber(actual)} | ${formatNumber(expected)} | ${label} |`;
        return `| ${court.sigla} | 0 | ${formatNumber(expected)} | ${label} |`;
      })
      .join(
        "\n",
      )}\n\n## O que foi conferido\n\nRespostas HTTP preservadas em gzip, SHA-256 e tamanho de cada resposta, paginação de 100 registros, posição das páginas, órgão e espécie de cada registro, IDs únicos, total por órgão e inventário nacional. A coleta foi particionada por órgão e espécie para evitar empates de número entre espécies. A primeira página foi consultada novamente ao terminar cada partição para detectar mudanças de total ou IDs. Catálogos que cabem inteiros em uma página são conferidos na mesma consulta, sem subdivisão por espécie. \`bun run audit\` refaz a auditoria local e confere cada arquivo gerado.\n\n## Limites\n\nA busca nacional limita o campo total a 10 mil resultados. A auditoria usa a soma das contagens por órgão e coleta cada espécie separadamente; não interpreta esse teto como cobertura completa.\n\nA fonte não fornece uma transação de leitura: mudanças intermediárias de conteúdo podem ocorrer durante a coleta. Igualdade com o inventário do BNP não demonstra que todos os precedentes existentes nos portais dos tribunais estão aqui. Órgãos com grupo de espécies vazio ficam identificados na tabela; isso não significa inexistência de precedentes. Falhas e pendências permanecem visíveis no manifesto.\n\nA sigla, classificação e situação são as informadas pelo BNP. O acervo inclui súmulas, repercussão geral, repetitivos, IRDR, IAC, controle concentrado e outras espécies cadastradas pela fonte. Não é uma coleção de todos os acórdãos do Brasil, nem inclui automaticamente o inteiro teor das decisões vinculadas.\n\n## Próximas frentes\n\n- Conciliar cada tribunal e espécie com o respectivo portal oficial, inclusive itens ausentes do BNP.\n- Complementar TSE, súmulas e orientações trabalhistas e demais categorias não expostas pelo catálogo nacional.\n- Incluir fontes próprias para precedentes administrativos, como CARF e TCU, ausentes desta coleta judicial.\n- Acompanhar mudanças de texto, situação, afetação, julgamento e cancelamento por novas coletas revisadas.\n`,
  );
  files.set(
    "README.md",
    `# Precedentes brasileiros em Markdown\n\nSúmulas, temas e precedentes judiciais em arquivos abertos. Para ler, estudar, pesquisar e usar com IA.\n\nUm acervo público do [Minutei](https://minutei.legal), a partir de fontes oficiais. **${formatNumber(ordered.length)} registros de ${groups.size} órgãos**, organizados por tribunal e espécie.\n\nO objetivo é reunir os precedentes de todo o Brasil. A cobertura ainda é parcial e está [documentada por órgão](COBERTURA.md).\n\n## Comece por aqui\n\n- [STF — Súmula Vinculante 13: nepotismo](tribunais/STF/sv/stf-sv-13.md)\n- [STJ — Súmula 7: reexame de prova](tribunais/STJ/sum/stj-sum-7.md)\n- [STF — Tema 1046: negociação coletiva](tribunais/STF/rg/stf-rg-1046.md)\n- [Tribunais no acervo](tribunais/)\n- [Baixar o acervo completo](https://github.com/minutei-ai/precedentes/archive/refs/heads/main.zip)\n\n## Explore\n\n| Órgão | Registros |\n| --- | ---: |\n${rows.map(([court, items]) => `| [${court}](tribunais/${court}/) | ${formatNumber(items.length)} |`).join("\n")}\n\n## Abra, leia, use\n\nCada registro tem um arquivo Markdown com o texto disponível, a questão discutida quando informada, a situação na fonte e links oficiais. Há também um [JSONL](dados/precedentes.jsonl), com um registro por linha e os campos retornados pelo BNP, para processamento e ferramentas de IA.\n\nLeia aqui no GitHub, [baixe o ZIP](https://github.com/minutei-ai/precedentes/archive/refs/heads/main.zip) ou clone:\n\n\`\`\`bash\ngit clone https://github.com/minutei-ai/precedentes.git\`\`\`\n\n## Fontes e cobertura\n\nA coleta inicial vem do [Pangea/BNP, do Conselho Nacional de Justiça](https://bnp.pdpj.jus.br/), com dados enviados pelos tribunais. As [respostas originais](fontes/pangea/), datas e hashes são preservados para permitir auditoria.\n\nO acervo inclui registros cancelados, controvérsias e procedimentos pendentes. Ter um arquivo aqui não significa que exista tese firmada ou vigente. Nem todo registro tem texto; nem toda decisão vinculada tem inteiro teor neste repositório. Confira a [cobertura e suas limitações](COBERTURA.md) e a situação na fonte oficial.\n\n## Contribua\n\nEncontrou um precedente ausente, texto incompleto ou situação desatualizada? [Abra uma issue](https://github.com/minutei-ai/precedentes/issues/new) com o tribunal, a identificação e o link oficial. Para sugerir uma nova fonte, indique também como consultar seu catálogo completo.\n\nOs scripts de coleta e conversão estão em [scripts/](scripts/). Com [Bun](https://bun.sh) instalado:\n\n\`\`\`bash\nbun install --frozen-lockfile\nbun run audit\nbun test\`\`\`\n\nA coleta é sequencial, com espera entre requisições, tentativas limitadas e retomada por órgão. Para uma nova fotografia da fonte, use uma cópia de trabalho sem a pasta \`fontes/pangea\`; \`bun run collect\` retoma a fotografia existente e não atualiza órgãos já concluídos. Gere e revise o resultado com \`bun run build\` e \`bun run audit\` antes de publicar.\n\nVeja também: [leis brasileiras em Markdown](https://github.com/minutei-ai/leis).\n\nMantido pelo [Minutei](https://minutei.legal). Este é um projeto independente; não é um repositório oficial do Poder Judiciário.\n`,
  );
  for (const [file, contents] of files) {
    if (check) {
      if (
        !(yield* fs.exists(file)) ||
        (yield* fs.readFileString(file)) !== contents
      )
        return yield* new IntegrityError({
          reason: `Arquivo ausente ou divergente: ${file}`,
        });
    } else yield* atomicWrite(file, contents);
  }
  const actualFiles = yield* fs.readDirectory("tribunais", { recursive: true });
  const expectedFiles = new Set(
    [...files.keys()].filter((file) => file.startsWith("tribunais/")),
  );
  for (const relative of actualFiles.filter((file) => file.endsWith(".md"))) {
    if (!expectedFiles.has(`tribunais/${relative}`))
      return yield* new IntegrityError({
        reason: `Arquivo obsoleto: tribunais/${relative}`,
      });
  }
  if (
    manifest.courts.length !== catalog.orgaos.length ||
    manifest.courts.some((court) => court.status === "failed")
  )
    return yield* new IntegrityError({
      reason: "Coleta tem órgãos pendentes ou com falha; consulte o manifesto",
    });
  const nationalExpected = inventory.aggsOrgaos.reduce(
    (total, court) => total + court.total,
    0,
  );
  if (ordered.length !== nationalExpected)
    return yield* new IntegrityError({
      reason: `Total nacional diverge: ${ordered.length}/${nationalExpected}`,
    });
  yield* Console.log({
    records: ordered.length,
    courts: groups.size,
    withoutThesisText: missingText,
    files: files.size,
    audit: check,
  });
});

if (import.meta.main)
  BunRuntime.runMain(
    Effect.gen(function* () {
      const command = Bun.argv[2];
      if (command === "collect") return yield* collect();
      if (command === "build") return yield* build(false);
      if (command === "audit") return yield* build(true);
      return yield* new IntegrityError({
        reason: "Uso: bun scripts/corpus.ts collect|build|audit",
      });
    }).pipe(
      Effect.provide(Layer.merge(BunServices.layer, FetchHttpClient.layer)),
    ),
  );
