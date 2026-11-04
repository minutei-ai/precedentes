# TJCE

Tribunal de Justiça do Estado do Ceará. **96 registros.**

| Espécie | Registros |
| --- | ---: |
| [Incidente de Assunção de Competência](iac/) | 6 |
| [Incidente de Resolução de Demandas Repetitivas](irdr/) | 15 |
| [Nota Técnica](nt/) | 3 |
| [Súmula](sum/) | 72 |

## Reconsulta SJURIS/e-SAJ — 04/11/2026 (Refs #186)

Fontes conferidas:

- SPA https://sjuris.tjce.jus.br/ (HTTP 200) e gateway https://gateway.tjce.jus.br/sjuris/api/v1.
- Facetas GET .../jurisprudencia/buscaListaCampos/2 listam Incidente de Resolução de Demandas Repetitivas (47 + 6 grafias) e Incidente de Assunção de Competência (5 + 3 grafias).
- POST .../jurisprudencia/?page=&size= com o DTO observado no frontend (busca, nomeDocumento, baseDocumento/origem PJE|SAJ, classe como arrays) respondeu HTTP 204 sem corpo em 04/11/2026, inclusive para nomeDocumento=["SÚMULA"] (faceta informa 72 súmulas). A faceta funciona; a busca paginada não devolveu conteúdo nesta data.
- e-SAJ https://esaj.tjce.jus.br/cjsg/consultaCompleta.do (HTTP 200) expõe formulário com classesTreeSelection para próxima tentativa de recuperação histórica.

O acervo atual permanece com 15 IRDR e 6 IAC já conciliados. Não foram criados registros novos a partir de facetas sem teor. Próximo passo: repetir o POST quando deixar de retornar 204 e/ou consultar o e-SAJ por classe IRDR/IAC com capturas privadas. Evidências: /home/yorizel/.local/share/precedentes-coleta-planejamento/tjce-sjuris-20261104/.
