# portifolio — pixelbarz

Portfólio pessoal feito com HTML, CSS e JavaScript puro. Isso aqui não ta puro sinceramente.

Acesse em: [josebraz.cc](https://josebraz.cc)

---

## Sobre o projeto

Site de portfólio com identidade visual inspirada em interfaces de videogames japoneses e dashboards retrô-futuristas. A proposta foi criar algo que tivesse personalidade própria em vez de parecer mais um template do Figma. (bruh)

O design prioriza azul como cor dominante, tipografia angulosa, elementos sem border-radius excessivo e microanimações que existem por um motivo real, não só pra impressionar o visitante por 3 segundos.

---

## Estrutura do projeto

```
portifolio/
├── index.html         pagina principal
├── style.css          todo o estilo, variaveis e responsividade
├── script.js          logica de interacao, animacoes e player
├── barzpfpwoah.png    foto de perfil
├── fachada.png        screenshot do projeto Casa Trigo Zero
├── links.png          screenshot do portifolio
├── persona.png        capa do album para o player de vinil
├── persona.mp3        musica de fundo
├── preview.png        imagem de preview para Open Graph
├── favicon.ico        icone da aba
└── CNAME              dominio customizado para o GitHub Pages
```

---

## Funcionalidades

**Interface**

- Boot screen com barra de progresso e porcentagem animada ao carregar a pagina
- Navbar fixa com active state baseado na secao visivel na tela
- Menu hamburguer para mobile com animacao de abertura
- Alternador de tema claro e escuro com persistencia em `localStorage`
- Barra de progresso de scroll no topo da pagina
- Animacoes de entrada (`reveal`) usando `IntersectionObserver`

**Visual**

- Grid de fundo com linhas que remetem a HUDs de jogos
- Cantos decorativos angulares nos cards que aparecem no hover
- Barras de stats de personagem animadas na secao do perfil
- Efeito de scanlines e vignette sutis para dar textura de tela CRT
- Cursor piscante no titulo rotativo
- Contador de numeros animado com easing cubico

**Player de musica**

- Player fixo no canto inferior esquerdo com disco de vinil giratório
- Capa do album exibida no centro do disco via `persona.png`
- Rotacao CSS que pausa suavemente quando a musica e pausada
- Agulha com dois estados visuais: afastada (pausado) e encostada no disco (tocando)
- Botao para minimizar o player sem perder o estado de reproducao
- Autoplay com fallback para primeiro clique do usuario (politica dos navegadores)

---

## Tecnologias utilizadas

- HTML5 semantico
- CSS3 com variaveis customizadas, `clip-path`, `IntersectionObserver` e animacoes por keyframe
- JavaScript puro, sem bibliotecas externas
- Google Fonts: Rajdhani, Share Tech Mono, Inter
- GitHub Pages para deploy continuo

---

## Como rodar localmente

Nao tem build, nao tem `npm install`, nao tem nada que precise de terminal.

1. Clone o repositorio:

```bash
git clone https://github.com/pixelbarz/portifolio.git
```

2. Abra a pasta no VS Code e use a extensao Live Server, ou simplesmente abra o `index.html` direto no navegador.

O player de musica precisa de um servidor local para funcionar corretamente por causa das restricoes de autoplay e CORS em arquivos locais. O Live Server resolve isso sem dor.

---

## Personalizacao

**Conteudo:** edite `index.html` diretamente. O HTML e semantico e bem organizado, nao deve ser dificil achar o que mudar.

**Cores e estilo:** todas as variaveis de design ficam no inicio do `style.css` dentro de `:root`. Mudar a paleta inteira e uma questao de alterar meia duzia de valores la.

**Animacoes e logica:** o `script.js` e dividido em blocos por funcionalidade (boot, tema, nav, reveal, rotator, counters, player). Cada bloco e independente e facil de isolar.

**Musica:** substitua `persona.mp3` por qualquer arquivo `.mp3` e `persona.png` pela capa correspondente.

---

## Deploy

O site e hospedado via GitHub Pages com dominio customizado configurado no arquivo `CNAME`.

Qualquer push na branch `main` atualiza o site automaticamente. Simples assim.

---

## Autor

Jose Braz — front-end em evolucao, designer nas horas vagas.

- [LinkedIn](https://www.linkedin.com/in/jos%C3%A9-braz-9842023a8/)
- [GitHub](https://github.com/pixelbarz)
- [Links](https://pixelbarz.github.io/linksdobarz/)
