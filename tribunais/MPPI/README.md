# MPPI

Ministério Público do Estado do Piauí. **16 registros.**

O catálogo do Conselho Superior publica suas séries de súmulas e enunciados em páginas distintas. Foram incorporadas 12 súmulas (incluindo a nº 01, identificada pelo catálogo como suspensa, mas sem texto publicado na página) e quatro enunciados numerados de 01 a 04/2019. Os registros não atribuem vigência ou efeito vinculante além do que a fonte declara.

| Espécie | Registros |
| --- | ---: |
| [Súmulas do Conselho Superior](sum-csmp/) | 12 |
| [Enunciados do Conselho Superior](en-csmp/) | 4 |

O [Regimento Interno do CSMP, aprovado pela Resolução CSMP/PI nº 01/2025](https://www.mppi.mp.br/internet/wp-content/uploads/2025/03/Resolucao-CSMP-no-01.2025-Regimento-Interno.pdf), aparece como referência institucional. Seu conteúdo não foi lido nem transcrito, e não recebeu identificador. A deliberação e as cinco redações finais da página 9 da ata de 30/04/2021 e o item 5.2 da ata de 01/08/2025 foram incorporados; as demais passagens das atas e atos deliberativos vinculados permanecem pendentes.

## Capturas e consistência

Os catálogos foram capturados duas vezes em 29/10/2026. Ambas as respostas de cada página foram HTTP 200 e tiveram o mesmo tamanho e o mesmo texto normalizado. Os bytes HTML completos variaram entre as duas respostas, mas o resumo textual normalizado foi idêntico:

| Catálogo | Bytes por captura | SHA-256 da captura 1 | SHA-256 da captura 2 | SHA-256 do texto normalizado |
| --- | ---: | --- | --- | --- |
| [Súmulas](https://www.mppi.mp.br/internet/conselho-superior/sumulas/) | 119.095 | `253421dd19d65e1f82c00766ff2202893224c20057f4d046c38bb7674261693f` | `877e2a005187e53eddbd5a6d7fa4ec66bb8fa515e5cb952d76645e9939844d10` | `9bbd3f2a7621d1015d1608bb5436c27331729699fcd32fe60498a1c793985ab5` |
| [Enunciados](https://www.mppi.mp.br/internet/conselho-superior/enunciados/) | 109.231 | `cc6a9d8ca11265f75a38e8be159a30c41fb3b6319962e3a2d26784c2e74363ee` | `a202ac46fc55fdda9ae289ddb46611d28c6f80635a357c85c70afe39a364d65b` | `4df6bddbdc6cd6f4551e9b4cdcde36a8cbff5fd62f1fb9195c18b2cb5149d2ce` |

O conteúdo dos verbetes foi transcrito do HTML publicado nos catálogos. Nos enunciados 01 a 03, a página concatena justificativas e trechos de voto da sessão após o texto do verbete; essas passagens agora estão nos respectivos registros, em seção própria, e não foram tratadas como parte do enunciado nem como reprodução integral do voto ou da justificativa da ata. As transcrições do catálogo permanecem intactas. As redações finais da página 9 da ata de 30/04/2021 foram posteriormente conferidas no PDF e acrescentadas em seções próprias das súmulas 04–08. Nenhum texto foi reconstruído a partir de citação. O HTML da Súmula 08 termina em “2.000 UFR”. A página adicional do CACOP publica o mesmo corpo com ponto final, sem palavras adicionais. O documento vinculado não integra essa comparação.

Os 11 endereços de documentos “Download” exibidos nos catálogos também foram capturados duas vezes; cada par retornou HTTP 200, com tamanho e SHA-256 coincidentes. As cinco URLs vinculadas às súmulas 04 a 08 retornaram os mesmos 215.992 bytes e o mesmo SHA-256, portanto não foram tratados como cinco documentos textualmente independentes.

| Registro na página | Documento vinculado | Bytes | SHA-256 (duas capturas coincidentes) |
| --- | --- | ---: | --- |
| Súmula 12 | [ATA-1416a-Sessao-Ordinaria-01-08-2025.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2025/08/ATA-1416a-Sessao-Ordinaria-01-08-2025.pdf) | 356.124 | `d3f420589c0d4b52863618634e754d346dbdc23ad27e9931b52263a71380b7ac` |
| Súmula 11 | [ATA-1370a-Sessao-Ordinaria-02-12-2022-1.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2023/01/ATA-1370a-Sessao-Ordinaria-02-12-2022-1.pdf) | 243.105 | `1dea8caad973bd398b85deb1f1d7d4cd9920ba876b5bfebf8a531423cde44230` |
| Súmula 10 | [ATA-1347a-01-10-2021.odt](https://www.mppi.mp.br/internet/wp-content/uploads/2021/10/ATA-1347a-01-10-2021.odt) | 115.369 | `105a275bd6c6697d506e1706d57ca689e8119c23bc1814c280de6a403ac75949` |
| Súmula 09 | [ATA-1346a-17-09-2021-MP43759.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2021/10/ATA-1346a-17-09-2021-MP43759.pdf) | 325.539 | `a5e99ef2c10609f2a659d8e1b5f6de457a836029a19744a398aaedd0da605843` |
| Súmula 08 | [Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-4.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2021/06/Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-4.pdf) | 215.992 | `392df13e5260921f8b3dc2a09d9272d51e5e0498b13bc0b84a983e4c91bfa2e7` |
| Súmula 07 | [Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-3.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2021/06/Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-3.pdf) | 215.992 | `392df13e5260921f8b3dc2a09d9272d51e5e0498b13bc0b84a983e4c91bfa2e7` |
| Súmula 06 | [Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-2.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2021/06/Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-2.pdf) | 215.992 | `392df13e5260921f8b3dc2a09d9272d51e5e0498b13bc0b84a983e4c91bfa2e7` |
| Súmula 05 | [Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-1.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2021/06/Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-1.pdf) | 215.992 | `392df13e5260921f8b3dc2a09d9272d51e5e0498b13bc0b84a983e4c91bfa2e7` |
| Súmula 04 | [Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021.pdf](https://www.mppi.mp.br/internet/wp-content/uploads/2021/06/Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021.pdf) | 215.992 | `392df13e5260921f8b3dc2a09d9272d51e5e0498b13bc0b84a983e4c91bfa2e7` |
| Súmula 03 | [ata 3 extraordinria - 23-10-17 1.pdf](https://www.mppi.mp.br/internet/wp-content/uploads//2018/01/ata%203%20extraordinria%20-%2023-10-17%201.pdf) | 202.106 | `4cdbb13de5a93e93b256f260c302251239c53e8e43b45dc3f9411b4a5f0b10a4` |
| Enunciados 01–04/2019 | [ata 1322 06-12-2019.pdf](https://www.mppi.mp.br/internet/wp-content/uploads//2020/02/ata%201322%2006-12-2019.pdf) | 557.563 | `835e15ebc1388521dcfd229ba44729186c094f8a37aad62be9ff1f04044b34a1` |

## Assentos e limites da busca

O menu institucional do Conselho Superior oferece páginas de súmulas e enunciados, além de atas, registros e resoluções; não apresenta catálogo de assentos. A busca pública WordPress por “assento”, repetida duas vezes, retornou itens de notícias e não uma série de precedentes. A página “Registros” apresenta anos, mas não os identifica como assentos. A consulta ao índice de resoluções do Portal da Legislação não pôde ser confirmada: o `curl` recusou o certificado TLS apresentado pelo subdomínio e a ferramenta web retornou HTTP 502. Não houve tentativa de contornar TLS. Esses limites não demonstram que nunca existiram assentos; nenhum foi cadastrado sem fonte que confirme sua identidade e texto.

As capturas, cabeçalhos de resposta e script de extração ficam fora deste repositório, no diretório privado de evidências desta coleta. Apenas Markdown foi adicionado ao acervo público.

## Comparação com a página do CACOP

A página oficial [Súmulas CSMP — CACOP](https://www.mppi.mp.br/internet/cacop/sumulas-csmp/) publica as súmulas 04 a 08 e 12. Duas capturas HTTP 200 em 29/10/2026 têm 108.484 bytes cada, com SHA-256 `a6fa2bb9633d26776a6e947f657747a100f2babfe06d4c26ad79eda9f6d7faea` e `061beded64cd3a141089c57981cc1fecc1919820371e1d69b32a16e56db68f62`. O bloco jurídico normalizado é idêntico nas duas (SHA-256 `d532a454d20ec1c34ff31daf88d0185d898c8106788fbfd30a21d833646d2166`). As nºs 04 a 07 coincidem com o catálogo do Conselho Superior. A nº 08 tem ponto final adicional; na nº 12, as duas ocorrências de “lei nº” estão em minúsculas. As variantes estão nas mesmas identidades, sem substituir o texto do catálogo. Nenhum registro novo foi criado. Esta comparação não abrange as atas vinculadas nem confirma vigência.

## Aprovação das cinco súmulas em 30/04/2021

Na [página física 9 da ata da 4ª sessão extraordinária](<https://www.mppi.mp.br/internet/wp-content/uploads/2021/06/Ata-4a-SESSAO-CSMP-EXTRA-30-04-2021-4.pdf#page=9>), o trecho deliberativo publica:

> Egrégio Conselho Superior, à unanimidade, na 4ª sessão extraordinária, de 30 de abril de 2021, à unanimidade, aprovou as súmulas com as seguintes redações:

As cinco redações completas dos quadros seguintes estão nas mesmas identidades das [súmulas 04](sum-csmp/mppi-sum-csmp-4.md), [05](sum-csmp/mppi-sum-csmp-5.md), [06](sum-csmp/mppi-sum-csmp-6.md), [07](sum-csmp/mppi-sum-csmp-7.md) e [08](sum-csmp/mppi-sum-csmp-8.md). A página não numera os quadros; seus corpos e os vínculos do catálogo sustentam a associação. A repetição de “à unanimidade” foi mantida. A nº 08 termina em “2.000 UFR.”, como a página do CACOP.

As duas capturas do PDF têm 215.992 bytes e SHA-256 `392df13e5260921f8b3dc2a09d9272d51e5e0498b13bc0b84a983e4c91bfa2e7`. O arquivo tem 33 páginas; este complemento publica somente a deliberação e os cinco quadros finais da página 9, conferidos visualmente. Não publica o trecho de fundamentação que começa antes dessa deliberação, as propostas anteriores, o restante da sessão nem o diário. As demais passagens continuam pendentes. Não houve OCR. Nenhum registro novo ou vigência atual foi inferido.

## Revisão da Súmula 12 em 01/08/2025

O item 5.2, nas páginas físicas 77–78 do extrato da ata da 1416ª sessão ordinária, foi incorporado integralmente à [Súmula 12](sum-csmp/mppi-sum-csmp-12.md#revisão-documentada-na-ata-de-01082025). O dispositivo aprova a revisão, enquanto o cabeçalho chama o assunto de proposta de edição. Foram preservados os dois termos e a redação em caixa alta. As duas páginas foram lidas visualmente, sem nova rasterização nem OCR. O título da página 1 e o fecho da página 78 confirmam a data da sessão.

Os dois PDFs têm 356.124 bytes e SHA-256 `d3f420589c0d4b52863618634e754d346dbdc23ad27e9931b52263a71380b7ac`. O arquivo tem 78 páginas; este complemento publica apenas o item 5.2. Os demais itens, a exposição de motivos mencionada e a redação anterior permanecem fora do complemento. Nenhum novo registro ou órgão foi criado, e a aprovação da revisão não confirma vigência atual.
