# Precedentes brasileiros em Markdown

Súmulas, temas e precedentes judiciais em arquivos abertos. Para ler, estudar, pesquisar e usar com IA.

Um acervo público do [Minutei](https://minutei.legal), a partir de fontes oficiais. **14.753 registros de 62 órgãos**, organizados por tribunal e espécie.

O objetivo é reunir os precedentes de todo o Brasil. A cobertura ainda é parcial e está [documentada por órgão](COBERTURA.md).

## Comece por aqui

- [STF — Súmula Vinculante 13: nepotismo](tribunais/STF/sv/stf-sv-13.md)
- [STJ — Súmula 7: reexame de prova](tribunais/STJ/sum/stj-sum-7.md)
- [STF — Tema 1046: negociação coletiva](tribunais/STF/rg/stf-rg-1046.md)
- [Tribunais no acervo](tribunais/)
- [Baixar o acervo completo](https://github.com/minutei-ai/precedentes/archive/refs/heads/main.zip)

## Explore

| Órgão | Registros |
| --- | ---: |
| [STF](tribunais/STF/) | 7.490 |
| [STJ](tribunais/STJ/) | 3.016 |
| [STM](tribunais/STM/) | 2 |
| [TJAC](tribunais/TJAC/) | 7 |
| [TJAL](tribunais/TJAL/) | 4 |
| [TJAM](tribunais/TJAM/) | 72 |
| [TJAP](tribunais/TJAP/) | 45 |
| [TJBA](tribunais/TJBA/) | 118 |
| [TJCE](tribunais/TJCE/) | 17 |
| [TJDF](tribunais/TJDF/) | 41 |
| [TJES](tribunais/TJES/) | 162 |
| [TJGO](tribunais/TJGO/) | 151 |
| [TJMA](tribunais/TJMA/) | 23 |
| [TJMG](tribunais/TJMG/) | 139 |
| [TJMS](tribunais/TJMS/) | 33 |
| [TJMT](tribunais/TJMT/) | 29 |
| [TJPA](tribunais/TJPA/) | 69 |
| [TJPB](tribunais/TJPB/) | 10 |
| [TJPE](tribunais/TJPE/) | 190 |
| [TJPI](tribunais/TJPI/) | 25 |
| [TJPR](tribunais/TJPR/) | 166 |
| [TJRJ](tribunais/TJRJ/) | 90 |
| [TJRN](tribunais/TJRN/) | 11 |
| [TJRO](tribunais/TJRO/) | 21 |
| [TJRR](tribunais/TJRR/) | 29 |
| [TJRS](tribunais/TJRS/) | 47 |
| [TJSC](tribunais/TJSC/) | 91 |
| [TJSE](tribunais/TJSE/) | 22 |
| [TJSP](tribunais/TJSP/) | 237 |
| [TJTO](tribunais/TJTO/) | 37 |
| [TNU](tribunais/TNU/) | 394 |
| [TRF01](tribunais/TRF01/) | 110 |
| [TRF02](tribunais/TRF02/) | 24 |
| [TRF03](tribunais/TRF03/) | 110 |
| [TRF04](tribunais/TRF04/) | 66 |
| [TRF05](tribunais/TRF05/) | 4 |
| [TRF06](tribunais/TRF06/) | 22 |
| [TRT01](tribunais/TRT01/) | 76 |
| [TRT02](tribunais/TRT02/) | 69 |
| [TRT03](tribunais/TRT03/) | 72 |
| [TRT04](tribunais/TRT04/) | 202 |
| [TRT05](tribunais/TRT05/) | 49 |
| [TRT06](tribunais/TRT06/) | 36 |
| [TRT07](tribunais/TRT07/) | 47 |
| [TRT08](tribunais/TRT08/) | 66 |
| [TRT09](tribunais/TRT09/) | 65 |
| [TRT10](tribunais/TRT10/) | 21 |
| [TRT11](tribunais/TRT11/) | 32 |
| [TRT12](tribunais/TRT12/) | 46 |
| [TRT13](tribunais/TRT13/) | 63 |
| [TRT14](tribunais/TRT14/) | 36 |
| [TRT15](tribunais/TRT15/) | 78 |
| [TRT16](tribunais/TRT16/) | 18 |
| [TRT17](tribunais/TRT17/) | 40 |
| [TRT18](tribunais/TRT18/) | 73 |
| [TRT19](tribunais/TRT19/) | 37 |
| [TRT20](tribunais/TRT20/) | 34 |
| [TRT21](tribunais/TRT21/) | 27 |
| [TRT22](tribunais/TRT22/) | 39 |
| [TRT23](tribunais/TRT23/) | 21 |
| [TRT24](tribunais/TRT24/) | 61 |
| [TST](tribunais/TST/) | 321 |

## Abra, leia, use

Cada registro tem um arquivo Markdown com o texto disponível, a questão discutida quando informada, a situação na fonte e links oficiais. Há também um [JSONL](dados/precedentes.jsonl), com um registro por linha e os campos retornados pelo BNP, para processamento e ferramentas de IA.

Leia aqui no GitHub, [baixe o ZIP](https://github.com/minutei-ai/precedentes/archive/refs/heads/main.zip) ou clone:

```bash
git clone https://github.com/minutei-ai/precedentes.git
```

## Fontes e cobertura

A coleta inicial vem do [Pangea/BNP, do Conselho Nacional de Justiça](https://bnp.pdpj.jus.br/), com dados enviados pelos tribunais. As [respostas originais](fontes/pangea/), datas e hashes são preservados para permitir auditoria.

O acervo inclui registros cancelados, controvérsias e procedimentos pendentes. Ter um arquivo aqui não significa que exista tese firmada ou vigente. Nem todo registro tem texto; nem toda decisão vinculada tem inteiro teor neste repositório. Confira a [cobertura e suas limitações](COBERTURA.md) e a situação na fonte oficial.

## Contribua

Encontrou um precedente ausente, texto incompleto ou situação desatualizada? [Abra uma issue](https://github.com/minutei-ai/precedentes/issues/new) com o tribunal, a identificação e o link oficial. Para sugerir uma nova fonte, indique também como consultar seu catálogo completo.

Os scripts de coleta e conversão estão em [scripts/](scripts/). Com [Bun](https://bun.sh) instalado:

```bash
bun install --frozen-lockfile
bun run audit
bun test
```

A coleta é sequencial, com espera entre requisições, tentativas limitadas e retomada por órgão. Para uma nova fotografia da fonte, use uma cópia de trabalho sem a pasta `fontes/pangea`; `bun run collect` retoma a fotografia existente e não atualiza órgãos já concluídos. Gere e revise o resultado com `bun run build` e `bun run audit` antes de publicar.

Veja também: [leis brasileiras em Markdown](https://github.com/minutei-ai/leis).

Mantido pelo [Minutei](https://minutei.legal). Este é um projeto independente; não é um repositório oficial do Poder Judiciário.
