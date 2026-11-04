# TRT17 — Reconciliação leitor ↔ Consulta Unificada (04/11/2026)

Documento complementar ao inventário amostral do PR #304. Não altera contagens de IDs.

## Fontes e identidades verificadas

| Apresentação | Identidade | Observação |
|---|---|---|
| Consulta Unificada | PDF SHA-256 `32055b651824f55a5850d398c85fcc48537af8b49f06464c92790a8a9a48d40f` (65 verbetes) | Já no acervo; inalterada nesta coleta |
| Catálogo do leitor | https://app.trt17.jus.br/principal/atividade-judiciaria/jurisprudencia/sumulas | **62 fichas** listadas + caderno |
| Caderno do leitor | id `585769318` — https://app.trt17.jus.br/principal/publicacoes/leitor/585769318?formato=pdf | Viewer Chrome exibiu o PDF após Turnstile; binário dual ainda sem arquivo local íntegro |
| Fichas individuais | IDs no inventário privado `leitor-ids-full.json` | 62 textos HTML capturados no navegador integrado |

Ausentes na lista do leitor (confirmado live 04/11/2026): **53**, **55**, **65**. Sem inferência de motivo ou de vigência a partir da ausência.

## Divergências de cancelamento / revisão (preservadas)

- **SEI `0000920-56.2025.5.17.0500` na Unificada, ausente no leitor:** 2, 4, 5, 8, 14, 18, 19, 23, 25, 36, 40, 46 (e o item II da 21, coberto no PR #304). O leitor mantém enunciado/publicações sem a nota SEI 2025.
- **PetCiv no leitor e na Unificada:** 42 (`0002240-60.2023.5.17.0000`). 53 e 55 só na Unificada (fichas ausentes da lista).
- **IUJ de cancelamento no leitor:** 34 (`0000313-69.2017.5.17.0000`).
- **Em revisão / sobrestamento:** 47 — Unificada “Em revisão”; leitor com OBS de IRR/TST (Ofício TST.GMVMF n.º 56/2017), sem fundir apresentações.

As fichas do leitor acrescentam, em regra, linhas de disponibilização no Diário Oficial/DEJT (grafia recorrente “Trablho”). Esses acréscimos não substituem o enunciado da Unificada.

## Escopo deste PR

- Atualiza os registros **exceto** `trt17-sum-1.md`, `trt17-sum-2.md`, `trt17-sum-21.md` e `sum/README.md` (já tocados pelo PR #304): seções “Página individual do leitor (04/11/2026)” com texto literal capturado.
- Documenta a ausência de 53/55/65 na lista do leitor.
- Depende do PR #304 para consolidar README e amostras 1/2/21.

## Caderno 585769318

O viewer do navegador integrado renderizou o caderno “SÚMULAS DO TRT DA 17ª REGIÃO” após `captchaSuccessCallback`/postback. `fetch`/curl da mesma URL, mesmo autenticado na sessão da página, devolve shell HTML (~35 683 bytes), não o PDF. Download pelo botão do viewer Chrome não registrou arquivo neste ambiente. Evidências visuais (screenshots) e o impedimento ficam no recibo privado. Sem OCR como fonte conclusiva.

## Sem novos IDs

65 registros Unificada + 62 fichas leitor reconciliadas; ausência de 53/55/65 na lista não cria nem remove IDs.
