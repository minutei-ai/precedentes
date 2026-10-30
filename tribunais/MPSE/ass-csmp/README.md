# MPSE · Assentos do Conselho Superior

**36 registros.** Fonte: [Quadro de Assentos do CSMP — DOFe nº 2163, de 10/04/2025](https://sistemas.mpse.mp.br/PublicDoc/PublicacaoDocumento/AbrirDocumento.aspx?cd_documento=96972), seis páginas físicas.

O cabeçalho comum imprime “QUADRO DE ASSENTOS DO CSMP”, “Revisão e/ou sugestão anual de novos Assentos com fundamento no art. 93, caput, do Regimento Interno do Conselho Superior.” e “Aprovado na 7ª Reunião Ordinária ocorrida no dia 10 de abril de 2025”. O cabeçalho do diário identifica o Estado de Sergipe, a Procuradoria Geral de Justiça e o Conselho Superior do Ministério Público. Esse cabeçalho, repetido nas seis páginas, é registrado aqui uma vez.

## Identidades e transcrição

Há 35 linhas com número/ano no quadro de 2025: 001/2008 e 001/2009 a 034/2025, com os anos efetivamente impressos. O 5-A está na célula do 005/2009, mas recebe título, corpo e aprovação próprios em 21/03/2012; tem um registro separado sem ano acrescentado ao número. O catálogo da API rotula a mesma identidade como 05-A/2012. O quadro de 2025 imprime só “5-A”. O Diário n. 3508, de 04/04/2012, imprime “05-A” no título e “Assento 5-A” no corpo, também sem ano. O identificador permanece `mpse-ass-csmp-5-a`. As duas entradas 001 de anos diferentes não foram fundidas. As versões históricas do mesmo número ficam na mesma ficha, sem gerar novos IDs.

Os corpos, redações anteriores e notas foram lidos visualmente nas seis imagens, com a camada textual como apoio, sem OCR. Os riscos foram reproduzidos em Markdown; as notas de revogação ficam fora do risco, como no quadro. Negrito e sublinhado não foram reproduzidos sistematicamente. As quebras de linha foram reunidas. O espaçamento artificial entre letras nos nºs 023/2021 e 024/2021 e em quatro notas de aprovação foi recomposto pela imagem. Aspas e pontuação não foram completadas. A mudança de assunto que o quadro atribui à nova redação do 001/2009 foi mantida. O 009/2010 atravessa as páginas 2–3; o 024/2021, as páginas 4–5; e o 031/2025, as páginas 5–6.

As anotações de aprovação, alteração e revogação são as desta edição. Não se infere vigência atual, força vinculante, identidade de atos em outras edições ou exaustividade. Não foram criados IDs para normas, temas ou outros assentos apenas citados.

## Proveniência

As duas capturas do PDF em 30/10/2026 retornaram HTTP 200, **128.329 bytes** cada, SHA-256 **`0ac2602ccc0f675e978da4b24a6535657790171e121c9a56269bba86dfe3bc0b`**. O arquivo tem seis páginas. PDFs, imagens, camada textual, recibos e scripts permanecem privados; o repositório contém apenas Markdown.

A [página institucional do Conselho Superior](https://www.mpse.mp.br/conselho-superior-do-ministerio-publico/) liga a [publicações do Conselho](https://www.mpse.mp.br/index.php/publicacoes-conselho-superior/), que liga à [página de Assentos](https://www.mpse.mp.br/index.php/conselho-superior-assentos/). A página de Assentos incorpora o [aplicativo de publicações](https://sistemas.mpse.mp.br/modernizacaoportal/Publicacaodocumentos/6). O HTML desse aplicativo é uma casca. O script público abre cada arquivo em `/api/documentos/{id}/arquivo`, sobre `https://sistemas.mpse.mp.br/modernizacaoportalbe`. O exemplo lido é o [documento 107879](https://sistemas.mpse.mp.br/modernizacaoportalbe/api/documentos/107879/arquivo). O botão “Baixar” usa outra rota, `/api/documentos/{id}/dados`, que não foi chamada nesta complementação.

A [listagem](https://sistemas.mpse.mp.br/modernizacaoportalbe/api/documentos/listagem?pagina=1&tamanho=60&tipoDocumentoId=6) foi capturada de novo em duas respostas HTTP 200, 29.858 bytes e SHA-256 `764c3cf0b16b62645353bcff0b853754e14b1df51315759a8fc525d13d36b265`, iguais ao par já guardado. O JSON informa `total` 35, `pagina` 1 e `tamanho` 60. A página 2 da mesma consulta, também em duas capturas, devolveu HTTP 200, 46 bytes, SHA-256 `0b78a11a6cedb40118ecbe0b883f909f6e0ba3ba4dd5f3e6fe4ef50cd9aaade1` e lista vazia. São 35 linhas de catálogo, não 35 atos novos: há o quadro, compilações e variantes dos mesmos assentos. A consulta não esgota o MPSE nem outras séries. O PDF de 2025 não é declarado última edição. A linha mais recente dessa lista é o documento 107879, nova redação do 024/2021, publicada no Diário n. 2511 de 16 de outubro de 2026.

Cada linha foi baixada duas vezes pela rota `/arquivo`. Os pares coincidiram em status, bytes e SHA-256. A rota legada `AbrirDocumento.aspx` foi conferida só para 107879, 13073 e 1416 e devolveu os mesmos três arquivos. O documento 96972, por essa rota nova, repete o SHA-256 do quadro já lido. O documento 14916 chega como `application/octet-stream` e é um arquivo Word, não PDF. PDFs, imagens, camada textual, o Word, recibos e scripts permanecem privados.

As duas capturas da página de Assentos retornaram HTTP 200, 160.528 bytes e SHA-256 `0c870dfb74b1982cd844dcf847f9b4d047e831960ea98d177039fac4a7f075df`. As duas capturas da casca do aplicativo retornaram HTTP 200, 5.658 bytes e SHA-256 `bd00e46b7c5fe31f93525ef4cdf91e0d0e8fd08daf87d97d290aef9f286ca1ec`. Esses hashes são dos HTMLs, sem alegação de que contenham os corpos. A página institucional do Conselho foi capturada duas vezes, HTTP 200, 239.422 bytes e SHA-256 `43925e5c19dbad557c258d70b94bd8e30f08b9251148898ba5d4cf7e44fcc095`. A cadeia TLS do portal foi validada com a intermediária Sectigo e as raízes do sistema, mantendo a verificação do hostname.

## O que foi lido e o que ficou só vinculado

Foram lidas visualmente, nesta complementação, as páginas jurídicas das 35 linhas. O quadro 96972 não foi relido: a rota nova devolveu o mesmo arquivo de seis páginas. O documento 14916 é Word e foi lido depois de convertido para uma página. O 7164 imprime “ASSENTO Nº 11/2010” e permanece em `mpse-ass-csmp-11-2011`. O 42411 imprime “ASSENTO Nº 12/2015” e permanece em `mpse-ass-csmp-12-2012`. Os documentos 72496 e 72497 imprimem, no rodapé, “01.2021”, enquanto os corpos são 23/2021 e 24/2021. Descrições do JSON não substituem a página. A página 2 vazia da listagem não esgota a série.

| Documento | Bytes | SHA-256 | Páginas segundo o pdfinfo | Leitura visual |
| --- | ---: | --- | --- | --- |
| 107879 | 120.519 | `265f06a553a07f54208083c2de4f2848704bc0b730829cb41bc04669a10cd11e` | 1 | lida |
| 96972 | 128.329 | `0ac2602ccc0f675e978da4b24a6535657790171e121c9a56269bba86dfe3bc0b` | 6 | lida na coleta anterior; mesmo arquivo |
| 13073 | 22.757 | `c4a48c52dcbac12eca09c6588d345531127d0b3a479de75cc9a580e33ac2f026` | 2 | lidas |
| 1416 | 8.698 | `6bbb5c088eff442f0a8f410d3d848a353ad09eb2c4835b96b6187a394916aad1` | 1 | lida |
| 96951 | 135.806 | `23cffac71cf1f80a54f1d131175116cbc489ee68c50e3738e222224d8b5da79a` | 1 | lida |
| 96950 | 135.222 | `446d64b68cfe87d7bd4745937983559ec171f0dff421d8c0c8ad6de073487c69` | 1 | lida |
| 96949 | 134.335 | `5e7201b8d0104f30caabe2ce8a41adfc5be7fa6f94e270596c331451cf4bf594` | 1 | lida |
| 96948 | 135.253 | `c24d7c9c9e9945138f7c5ff167f5efdf8f17b6ca3677a3c3ba833d7f8187949d` | 1 | lida |
| 96947 | 133.940 | `40311d161be28f25b3d427cf0087e5fdd01eb65048559358744066ce3f544bbb` | 1 | lida |
| 96946 | 135.962 | `f6f4f84157e676d7d31f6d86ccf4b80f3f72442d6e0bc7f699c799fac2130faf` | 1 | lida |
| 94027 | 144.792 | `fd0212272e66461fe56d8326e7ac88d299098b9e64641e05b9a35dfc3d6f75bb` | 1 | lida |
| 90745 | 151.103 | `2122df53efec2119d7b6b5a35ebc06de893f20ced73fa4c7649bd3970ffc3ccd` | 1 | lida |
| 82678 | 128.156 | `17c1df4deaee7073e49c74b3c3cc36b026302e4cb595a720a919a5d9ce214525` | 1 | lida |
| 78067 | 131.657 | `ce875488cb8c72ea13e4d86e6f9cc5d49e337c27d5ae5a3ab1787850e23365fb` | 1 | lida |
| 72497 | 131.766 | `14e949ccd3b45b0b0efdba95ac619ab9a0646f0cbb59c36fbae1f5e211778a12` | 1 | lida |
| 72496 | 130.623 | `e95e37dd199247b4182c2e53adf2d4f7f4ad8da2dfb7e53e08d0bededfddedfe` | 1 | lida |
| 61521 | 132.085 | `60ee840797af0a079ef7b409504cc77505cb6a0130b250f99e6a97e3f4fbb733` | 1 | lida |
| 55191 | 131.718 | `75bc6307ff6c6233b41b07e117e452bc9cb9de9099c7ffa0b4a239315b5dbe0c` | 1 | lida |
| 55190 | 130.495 | `c14f6ce55d1cc63ee95082d3f5e289022077eabecccc0a9948cd607462c4d6ca` | 1 | lida |
| 44887 | 90.105 | `f751c321b14ee9d5deca92fd91039b4b4587403b39d5d3848bc4f9e1fed9f6a4` | 1 | lida |
| 42411 | 76.342 | `9515f2eaedfa1dd84f35544526441f8d9e147eedef2288f53c5eb3384ca4ad19` | 1 | lida |
| 42410 | 87.522 | `6b9ec193da21978cf6dbec20223ae681df46253e72bd3d207ac6d8612b3d49b4` | 1 | lida |
| 41775 | 82.647 | `bf8143dfad427fd587e850bfbf842cc362879b1535de7a2988efce5c662404c9` | 1 | lida |
| 35594 | 83.038 | `4b83f4740335553d76f5f36af9d3509d0138c903b1d22534416c0a019cd77694` | 1 | lida |
| 35593 | 83.708 | `71bc6666a534ebda3799d95b2fdac5c1681a6f967f4fa4e99a91c94cc15fb8f7` | 1 | lida |
| 35592 | 76.555 | `f203cc33f5e524d075939f6879e4871c57594341e972cfb6ff3ea4602fbf364c` | 1 | lida |
| 31964 | 78.680 | `0fd80beb5e3171c788018bf3112235dd095d02325244066c598c364861363bbd` | 1 | lida |
| 7164 | 139.155 | `9065a864d0980b91ffc30303c8af1905ee53bd6b1af0734bc70afea3722a7a4a` | 1 | lida |
| 6580 | 143.693 | `703fe5369d7fea3e08ebc0cf8c7c6756d0bebb2dd9f2f68d5e8ddf5a0f3e527a` | 1 | lida |
| 6579 | 143.804 | `c2c883b5facb1fdba97cbf18df97e0ab03701e7acf2f54f81612c31b70c6e1f2` | 1 | lida |
| 6578 | 144.207 | `89edbec57267f0c458ab1af20bed722baea227e6f33f0ab2bb7430ecc67489fa` | 1 | lida |
| 6577 | 141.756 | `b9518494b1a0802200c5985633a099343187bc9ed6a9b365fd1ff8fe61e0f0bb` | 2 | lidas; a segunda página só tem o timbre |
| 6576 | 140.704 | `defcd01f90325a7556cefdc2ca87be4e2d10f9584f2edeadc4ab745bbb41c34a` | 2 | lidas; a segunda página só tem o timbre |
| 28303 | 17.469 | `ce33f7bbf7ef18d912ac5ea973657df8b577be0cb384c516ae14e660d45b4fe9` | 1 | lida |
| 14916 | 30.208 | `9d889219a3c4537bb1680b991ae7b2a62f33c9e87862ad04ef816aaca934e32d` | Word; uma página depois da conversão | lida |

O `file` anuncia duas páginas no 41775; o `pdfinfo` anuncia uma. A renderização produziu uma imagem, e a página lida é uma. Vários PDFs antigos trazem no metadado o título “ASSENTO Nº 06/2010”; esse metadado não foi usado como identidade.

## Pendências

As 35 linhas tiveram a página jurídica lida. A página 2 vazia da listagem não prova que a série esteja esgotada. Permanecem outras edições que essa listagem não devolveu e outras séries do MPSE. O regimento e as normas citadas no quadro não foram lidos integralmente nem receberam IDs. Não há CPF, RG, matrícula pessoal ou URL de autenticação nos blocos publicados. As nove lacunas textuais iniciais do BNP permanecem. Não se infere vigência, vinculação ou ausência a partir de edição não lida.

## Registros

| Número na fonte | Registro | Páginas físicas |
| --- | --- | --- |
| 001/2008 | [mpse-ass-csmp-1-2008](mpse-ass-csmp-1-2008.md) | 1 |
| 001/2009 | [mpse-ass-csmp-1-2009](mpse-ass-csmp-1-2009.md) | 1 |
| 002/2009 | [mpse-ass-csmp-2-2009](mpse-ass-csmp-2-2009.md) | 1 |
| 003/2009 | [mpse-ass-csmp-3-2009](mpse-ass-csmp-3-2009.md) | 1 |
| 004/2009 | [mpse-ass-csmp-4-2009](mpse-ass-csmp-4-2009.md) | 1 |
| 005/2009 | [mpse-ass-csmp-5-2009](mpse-ass-csmp-5-2009.md) | 2 |
| 5-A | [mpse-ass-csmp-5-a](mpse-ass-csmp-5-a.md) | 2 |
| 006/2010 | [mpse-ass-csmp-6-2010](mpse-ass-csmp-6-2010.md) | 2 |
| 007/2010 | [mpse-ass-csmp-7-2010](mpse-ass-csmp-7-2010.md) | 2 |
| 008/2010 | [mpse-ass-csmp-8-2010](mpse-ass-csmp-8-2010.md) | 2 |
| 009/2010 | [mpse-ass-csmp-9-2010](mpse-ass-csmp-9-2010.md) | 2, 3 |
| 010/2010 | [mpse-ass-csmp-10-2010](mpse-ass-csmp-10-2010.md) | 3 |
| 011/2011 | [mpse-ass-csmp-11-2011](mpse-ass-csmp-11-2011.md) | 3 |
| 012/2012 | [mpse-ass-csmp-12-2012](mpse-ass-csmp-12-2012.md) | 3 |
| 013/2014 | [mpse-ass-csmp-13-2014](mpse-ass-csmp-13-2014.md) | 3 |
| 014/2015 | [mpse-ass-csmp-14-2015](mpse-ass-csmp-14-2015.md) | 3 |
| 015/2015 | [mpse-ass-csmp-15-2015](mpse-ass-csmp-15-2015.md) | 3 |
| 016/2015 | [mpse-ass-csmp-16-2015](mpse-ass-csmp-16-2015.md) | 3 |
| 017/2015 | [mpse-ass-csmp-17-2015](mpse-ass-csmp-17-2015.md) | 4 |
| 018/2015 | [mpse-ass-csmp-18-2015](mpse-ass-csmp-18-2015.md) | 4 |
| 019/2016 | [mpse-ass-csmp-19-2016](mpse-ass-csmp-19-2016.md) | 4 |
| 020/2017 | [mpse-ass-csmp-20-2017](mpse-ass-csmp-20-2017.md) | 4 |
| 021/2017 | [mpse-ass-csmp-21-2017](mpse-ass-csmp-21-2017.md) | 4 |
| 022/2019 | [mpse-ass-csmp-22-2019](mpse-ass-csmp-22-2019.md) | 4 |
| 023/2021 | [mpse-ass-csmp-23-2021](mpse-ass-csmp-23-2021.md) | 4 |
| 024/2021 | [mpse-ass-csmp-24-2021](mpse-ass-csmp-24-2021.md) | 4, 5 |
| 025/2022 | [mpse-ass-csmp-25-2022](mpse-ass-csmp-25-2022.md) | 5 |
| 026/2023 | [mpse-ass-csmp-26-2023](mpse-ass-csmp-26-2023.md) | 5 |
| 027/2024 | [mpse-ass-csmp-27-2024](mpse-ass-csmp-27-2024.md) | 5 |
| 028/2024 | [mpse-ass-csmp-28-2024](mpse-ass-csmp-28-2024.md) | 5 |
| 029/2025 | [mpse-ass-csmp-29-2025](mpse-ass-csmp-29-2025.md) | 5 |
| 030/2025 | [mpse-ass-csmp-30-2025](mpse-ass-csmp-30-2025.md) | 5 |
| 031/2025 | [mpse-ass-csmp-31-2025](mpse-ass-csmp-31-2025.md) | 5, 6 |
| 032/2025 | [mpse-ass-csmp-32-2025](mpse-ass-csmp-32-2025.md) | 6 |
| 033/2025 | [mpse-ass-csmp-33-2025](mpse-ass-csmp-33-2025.md) | 6 |
| 034/2025 | [mpse-ass-csmp-34-2025](mpse-ass-csmp-34-2025.md) | 6 |
