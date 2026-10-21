import { describe, expect, test } from "bun:test";
import { Effect, Exit, Schema } from "effect";
import { Page, toMarkdown, validatePage } from "./corpus";

const original = new TextDecoder().decode(
  Bun.gunzipSync(
    new Uint8Array(
      await Bun.file("fontes/pangea/STF/inventario.json.gz").arrayBuffer(),
    ),
  ),
);
const page = Schema.decodeUnknownSync(Schema.fromJsonString(Page))(original);
const types = [...new Set(page.resultados.map((row) => row.tipo))];

describe("paginação oficial", () => {
  test("preserva referências oficiais do STJ sem número de processo", async () => {
    const bytes = new Uint8Array(
      await Bun.file("fontes/pangea/STJ/RR/pagina-002.json.gz").arrayBuffer(),
    );
    const official = Schema.decodeUnknownSync(Schema.fromJsonString(Page))(
      new TextDecoder().decode(Bun.gunzipSync(bytes)),
    );
    const record = official.resultados.find((row) => row.id === "stj-rr-166");
    expect(record?.processosParadigma?.[0]?.numero).toBeUndefined();
    expect(record?.processosParadigma?.[0]?.link).toContain(
      "https://processo.stj.jus.br/",
    );
  });

  test("aceita o catálogo real que cabe inteiro em uma página", async () => {
    const bytes = new Uint8Array(
      await Bun.file("fontes/pangea/STF/SV/pagina-001.json.gz").arrayBuffer(),
    );
    const complete = Schema.decodeUnknownSync(Schema.fromJsonString(Page))(
      new TextDecoder().decode(Bun.gunzipSync(bytes)),
    );
    const seen = new Set<string>();
    Effect.runSync(
      validatePage(complete, "STF", ["SV"], 1, complete.total, seen),
    );
    expect(complete.total).toBeLessThanOrEqual(100);
    expect(seen.size).toBe(complete.total);
  });

  test("aceita uma página real e preserva números iguais entre espécies distintas", () => {
    const seen = new Set<string>();
    Effect.runSync(validatePage(page, "STF", types, 1, page.total, seen));
    expect(seen.size).toBe(100);
    expect(new Set(page.resultados.map((row) => row.nr)).size).toBeLessThan(
      100,
    );
  });

  test("recusa IDs repetidos entre páginas", () => {
    const seen = new Set(page.resultados.map((row) => row.id));
    expect(
      Exit.isFailure(
        Effect.runSync(
          Effect.exit(validatePage(page, "STF", types, 1, page.total, seen)),
        ),
      ),
    ).toBe(true);
  });

  test("recusa página truncada, total alterado, tribunal errado e posição repetida", () => {
    const attempts = [
      validatePage(
        { ...page, resultados: page.resultados.slice(1) },
        "STF",
        types,
        1,
        page.total,
        new Set(),
      ),
      validatePage(page, "STF", types, 1, page.total + 1, new Set()),
      validatePage(page, "STJ", types, 1, page.total, new Set()),
      validatePage(page, "STF", types, 2, page.total, new Set()),
      validatePage(page, "STF", ["IRDR"], 1, page.total, new Set()),
    ];
    for (const attempt of attempts)
      expect(Exit.isFailure(Effect.runSync(Effect.exit(attempt)))).toBe(true);
  });

  test("não interpreta desafio HTML como resposta vazia", () => {
    expect(
      Schema.decodeUnknownOption(Schema.fromJsonString(Page))(
        "<html>Access denied</html>",
      )._tag,
    ).toBe("None");
  });
});

describe("texto em Markdown", () => {
  test("mantém tabelas, referências, parágrafos e texto riscado", () => {
    const converted = toMarkdown(
      '<p>Texto <del>cancelado</del>.</p><table><thead><tr><th>Tema</th><th>Tese</th></tr></thead><tbody><tr><td>1</td><td>Conteúdo</td></tr></tbody></table><p><a href="https://www.stf.jus.br/">Fonte</a></p>',
    );
    expect(converted).toContain("~cancelado~");
    expect(converted).toContain("| Tema | Tese |");
    expect(converted).toContain("| 1 | Conteúdo |");
    expect(converted).toContain("[Fonte](https://www.stf.jus.br/)");
  });

  test("não incorpora scripts da fonte", () => {
    expect(
      toMarkdown(
        "<p>Tese</p><script>alert('source')</script><style>body{display:none}</style>",
      ),
    ).toBe("Tese");
  });

  test("não apresenta o aviso da fonte como uma tese", () => {
    expect(toMarkdown("<p>não informado</p>")).toBe("");
    expect(toMarkdown("NÃO INFORMADO")).toBe("");
  });
});
