# Instituto TEIAS — Plataforma Web

[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)](LICENCE)

Plataforma web do **Instituto TEIAS** — projeto acadêmico de uma organização
do terceiro setor voltada à tecnologia, educação, inclusão, acessibilidade e
sustentabilidade.

## 📋 Sobre o projeto

O Instituto TEIAS busca ampliar o acesso à educação e à tecnologia,
promovendo inclusão, acessibilidade, igualdade de oportunidades e
conscientização ambiental.

A plataforma apresenta informações institucionais, projetos e iniciativas
da organização, além de disponibilizar um formulário de participação para
voluntários e doadores e um dashboard com dados simulados de impacto.

> **Observação:** este projeto possui finalidade acadêmica. Os cadastros são
> armazenados localmente no navegador por meio do `localStorage` e não são
> enviados para um servidor ou banco de dados real.

## ✨ Funcionalidades

- SPA com roteamento por hash
- Três views: Início, Projetos e Participe
- Validação de formulário
- Máscaras para CPF, telefone e CEP
- Persistência local de cadastros e rascunhos
- Persistência da preferência de tema
- Tema claro e escuro
- Dashboard interativo com Chart.js
- Navegação por teclado
- Skip-link para acesso direto ao conteúdo
- Menu responsivo para dispositivos móveis
- Notificações do tipo toast
- Preferência por redução de movimento (`prefers-reduced-motion`)

## 🛠️ Tecnologias

- **HTML5** — estrutura semântica e landmarks
- **CSS3** — Custom Properties, Grid, Flexbox e Media Queries
- **JavaScript ES Modules** — organização modular do código
- **Chart.js 4.x** — gráficos do dashboard
- **Vite 8.x** — servidor de desenvolvimento e build
- **Git** — versionamento

## 📁 Estrutura do projeto

```text
ong-terceiro-setor/
├── index.html                  # Página principal da aplicação
│
├── public/
│   ├── html/                   # Views carregadas pelo roteador
│   │   ├── home.html
│   │   ├── projetos.html
│   │   └── cadastro.html
│   │
│   ├── imagens/                # Logo, imagens e ícones da aplicação
│   │   ├── logo-teias.svg
│   │   ├── icone-acessibilidade.svg
│   │   ├── icone-contato.svg
│   │   ├── icone-doacoes.svg
│   │   ├── icone-educacao.svg
│   │   ├── icone-meio-ambiente.svg
│   │   ├── icone-palestras.svg
│   │   ├── icone-sustentabilidade.svg
│   │   ├── icone-tecnologia.svg
│   │   └── icone-voluntariado.svg
│   │
│   └── fontes/                 # Fontes utilizadas na interface
│       ├── AtkinsonHyperlegible-Regular.ttf
│       └── AtkinsonHyperlegible-Bold.ttf
│
├── css/
│   └── style.css               # Estilos, temas e responsividade
│
├── js/
│   ├── main.js                 # Inicialização da aplicação
│   ├── dados.js                # Dados dos projetos e gráficos
│   │
│   └── modulos/
│       ├── graficos.js         # Criação dos gráficos com Chart.js
│       ├── menu.js             # Menu de navegação e menu mobile
│       ├── router.js            # Roteamento da aplicação
│       ├── storage.js           # Persistência de dados no localStorage
│       ├── templates.js         # Renderização dos cards de projetos
│       ├── tema.js              # Gerenciamento dos temas claro e escuro
│       ├── toast.js             # Notificações temporárias
│       └── validacao.js         # Validação e processamento do formulário
│
├── package.json                # Configuração do projeto e scripts npm
├── package-lock.json           # Versões exatas das dependências
├── vite.config.js              # Configuração do Vite
├── .gitignore                  # Arquivos e pastas ignorados pelo Git
├── LICENCE                     # Licença do projeto
└── README.md                   # Documentação do projeto
```

### 🧩 Organização dos principais diretórios

* **`public/`** — reúne os arquivos estáticos disponibilizados diretamente pela aplicação, como páginas HTML, imagens, ícones e fontes.
* **`public/html/`** — contém as views carregadas dinamicamente pelo roteador da aplicação.
* **`public/imagens/`** — armazena o logotipo e os ícones SVG utilizados na interface.
* **`public/fontes/`** — contém as fontes utilizadas pelo projeto.
* **`css/`** — concentra os estilos visuais da aplicação, incluindo layout, responsividade, acessibilidade e os temas claro e escuro.
* **`js/`** — contém a lógica principal da aplicação.
* **`js/modulos/`** — organiza as funcionalidades JavaScript em módulos independentes, facilitando a manutenção e a separação de responsabilidades.
* **`dist/`** — diretório gerado automaticamente pelo Vite durante o build de produção. Não é versionado no Git.
* **`node_modules/`** — contém as dependências instaladas pelo npm e também não é versionado no Git.


### 🧩 Organização dos principais diretórios

* **`public/`** — reúne os arquivos estáticos disponibilizados diretamente pela aplicação, como páginas HTML, imagens, ícones e fontes.
* **`css/`** — concentra os estilos visuais da aplicação, incluindo layout, responsividade, acessibilidade e os temas claro e escuro.
* **`js/`** — contém a lógica principal da aplicação.
* **`js/modulos/`** — organiza as funcionalidades JavaScript em módulos independentes, facilitando a manutenção e a separação de responsabilidades.
* **`dist/`** — diretório gerado automaticamente pelo Vite durante o build de produção. Não é versionado no Git.
* **`node_modules/`** — contém as dependências instaladas pelo npm e também não é versionado no Git.



✅ Pré-requisitos
Node.js compatível com o Vite 8
Git
Navegador moderno, como Chrome, Firefox, Edge ou Safari

🚀 Instalação
1. Clonar o repositório
git clone https://github.com/usuario/ong-terceiro-setor.git
cd ong-terceiro-setor

2. Instalar as dependências
npm install

3. Iniciar o servidor de desenvolvimento
npm run dev

O Vite disponibilizará o projeto em:
http://localhost:5173

O index.html não deve ser aberto diretamente pelo protocolo file://.
O roteador utiliza fetch() para carregar as views da aplicação, portanto
é necessário utilizar um servidor local.

4. Gerar o build de produção

npm run build

O comando gera a versão otimizada na pasta dist/.

5. Visualizar o build
npm run preview

🧪 Testes e validação

Durante o desenvolvimento, podem ser utilizados:

Lighthouse (Chrome DevTools)
axe DevTools
W3C Validator
WebAIM Contrast Checker

Também devem ser realizados testes manuais de:

Navegação por teclado
Menu responsivo
Alternância de tema
Validação do formulário
Persistência no localStorage
Navegação entre as views
Responsividade em diferentes tamanhos de tela

### Testes de movimento reduzido

Para verificar o suporte à preferência `prefers-reduced-motion`, compare o comportamento da aplicação com a preferência desativada e ativada.

1. Inicie a aplicação com `npm run dev`.
2. Abra as ferramentas de desenvolvedor do navegador e acesse a opção de emulação de recursos de renderização (`Rendering`).
3. Emule a preferência `prefers-reduced-motion: no-preference` e navegue entre as views. A rolagem deve ocorrer suavemente.
4. Emule `prefers-reduced-motion: reduce` e repita a navegação. A rolagem deve ocorrer sem animação suave.
5. Com a preferência reduzida ativada, envie o formulário com um campo obrigatório inválido. A página deve direcionar o usuário ao primeiro erro sem rolagem animada.
6. Repita o teste com a preferência desativada e confirme que a rolagem suave permanece disponível.

Compare os resultados nos dois cenários e verifique se os erros do formulário continuam identificados corretamente.

♿ Acessibilidade

O projeto foi desenvolvido adotando práticas de acessibilidade alinhadas
às recomendações das WCAG 2.1, incluindo:

Estrutura semântica com header, nav, main e footer
Skip-link para acesso direto ao conteúdo
Navegação por teclado
Indicadores de foco visíveis
Uso de atributos ARIA nos controles dinâmicos
Textos alternativos e identificação de conteúdo decorativo
Descrições textuais para os gráficos
Contraste adequado entre texto e fundo
Suporte à preferência prefers-reduced-motion
Layout responsivo
🌱 Sustentabilidade

O projeto também considera princípios de TI Verde, buscando reduzir
recursos desnecessários e priorizar soluções acessíveis e eficientes.

Entre as estratégias utilizadas estão:

Interface responsiva
Uso de arquivos SVG para ícones e elementos gráficos
Redução de animações quando solicitado pelo usuário
Estrutura modular de JavaScript
Otimização realizada pelo processo de build do Vite
📄 Licença

Este projeto está licenciado sob a licença MIT.

Consulte o arquivo LICENCE para obter o texto completo da licença.

👤 Autoria

Projeto desenvolvido por PinchiSZ(André) para a disciplina de
Desenvolvimento Front-End para Web, do curso de
Sistemas de Informação — Cruzeiro do Sul, 2026.

EN

# Instituto TEIAS — Web Platform

[![Licence: MIT](https://img.shields.io/badge/licence-MIT-blue)](LICENCE)

The **Instituto TEIAS** web platform is an academic project for a third-sector organisation focused on technology, education, inclusion, accessibility and sustainability.

## 📋 About the Project

Instituto TEIAS aims to broaden access to education and technology by promoting inclusion, accessibility, equal opportunities and environmental awareness.

The platform presents institutional information, projects and organisational initiatives. It also provides a participation form for volunteers and donors, as well as a dashboard displaying simulated impact data.

> **Note:** This is an academic project. Registration data is stored locally in the browser using `localStorage` and is not sent to a server or a real database.

## ✨ Features

- Single-page application (SPA) with hash-based routing
- Three views: Home, Projects and Get Involved
- Form validation
- Input masks for Brazilian CPF numbers, telephone numbers and postcodes (CEP)
- Local persistence of registrations and form drafts
- Persistent theme preferences
- Light and dark themes
- Interactive dashboard powered by Chart.js
- Keyboard navigation
- Skip link for direct access to the main content
- Responsive mobile navigation menu
- Toast notifications
- Support for the `prefers-reduced-motion` preference

## 🛠️ Technologies

- **HTML5** — semantic structure and landmarks
- **CSS3** — Custom Properties, Grid, Flexbox and Media Queries
- **JavaScript ES Modules** — modular code organisation
- **Chart.js 4.x** — dashboard charts
- **Vite 8.x** — development server and production build
- **Git** — version control

## 📁 Project Structure

```text
ong-terceiro-setor/
├── index.html                  # Main application page
│
├── public/
│   ├── html/                   # Views loaded by the router
│   │   ├── home.html
│   │   ├── projetos.html
│   │   └── cadastro.html
│   │
│   ├── imagens/                # Application logo, images and icons
│   │   ├── logo-teias.svg
│   │   ├── icone-acessibilidade.svg
│   │   ├── icone-contato.svg
│   │   ├── icone-doacoes.svg
│   │   ├── icone-educacao.svg
│   │   ├── icone-meio-ambiente.svg
│   │   ├── icone-palestras.svg
│   │   ├── icone-sustentabilidade.svg
│   │   ├── icone-tecnologia.svg
│   │   └── icone-voluntariado.svg
│   │
│   └── fontes/                 # Fonts used by the interface
│       ├── AtkinsonHyperlegible-Regular.ttf
│       └── AtkinsonHyperlegible-Bold.ttf
│
├── css/
│   └── style.css               # Styling, themes and responsiveness
│
├── js/
│   ├── main.js                 # Application initialisation
│   ├── dados.js                # Project and chart data
│   │
│   └── modulos/
│       ├── graficos.js         # Chart.js chart creation
│       ├── menu.js             # Navigation and mobile menu
│       ├── router.js           # Application routing
│       ├── storage.js          # localStorage data persistence
│       ├── templates.js        # Project card rendering
│       ├── tema.js             # Light and dark theme management
│       ├── toast.js            # Temporary notifications
│       └── validacao.js        # Form validation and processing
│
├── package.json                # Project configuration and npm scripts
├── package-lock.json           # Exact dependency versions
├── vite.config.js              # Vite configuration
├── .gitignore                  # Files and directories ignored by Git
├── LICENCE                     # Project licence
└── README.md                   # Project documentation
```

### 🧩 Main Directory Organisation

- **`public/`** — contains static assets served directly by the application, including HTML pages, images, icons and fonts.
- **`public/html/`** — contains the views dynamically loaded by the application router.
- **`public/imagens/`** — stores the logo and SVG icons used throughout the interface.
- **`public/fontes/`** — contains the fonts used by the project.
- **`css/`** — contains the application's visual styles, including layout, responsiveness, accessibility and light and dark themes.
- **`js/`** — contains the main application logic.
- **`js/modulos/`** — organises JavaScript functionality into independent modules, improving maintainability and separation of concerns.
- **`dist/`** — directory automatically generated by Vite during the production build. It is not tracked by Git.
- **`node_modules/`** — contains npm-installed dependencies and is also not tracked by Git.

## ✅ Prerequisites

- Node.js compatible with Vite 8
- Git
- A modern web browser, such as Chrome, Firefox, Edge or Safari

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/PinchiSZ/ong-terceiro-setor.git
cd ong-terceiro-setor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will make the application available at:

[http://localhost:5173](http://localhost:5173)

Do not open `index.html` directly using the `file://` protocol. The router uses `fetch()` to load the application's views, so a local development server is required.

### 4. Generate the production build

```bash
npm run build
```

This command generates the optimised production version in the `dist/` directory.

### 5. Preview the production build

```bash
npm run preview
```

## 🧪 Testing and Validation

The following tools can be used during development:

- Lighthouse (Chrome DevTools)
- axe DevTools
- W3C Validator
- WebAIM Contrast Checker

Manual testing should also cover:

- Keyboard navigation
- Responsive navigation menu
- Theme switching
- Form validation
- `localStorage` persistence
- Navigation between views
- Responsiveness across different screen sizes

### Reduced Motion Testing

To verify support for the `prefers-reduced-motion` preference, compare the application's behaviour with the preference both enabled and disabled.

1. Start the application using `npm run dev`.
2. Open the browser's developer tools and navigate to the rendering options under **Rendering**.
3. Emulate `prefers-reduced-motion: no-preference` and navigate between views. Scrolling should be smooth.
4. Emulate `prefers-reduced-motion: reduce` and repeat the navigation. Scrolling should occur without smooth-scroll animation.
5. With reduced motion enabled, submit the form with an invalid required field. The page should direct the user to the first error without animated scrolling.
6. Repeat the test with reduced motion disabled and confirm that smooth scrolling remains available.

Compare the results in both scenarios and verify that form errors continue to be identified correctly.

## ♿ Accessibility

The project has been developed with accessibility practices aligned with the **Web Content Accessibility Guidelines (WCAG) 2.1**, including:

- Semantic HTML structure using `header`, `nav`, `main` and `footer`
- Skip link for direct access to the main content
- Keyboard navigation
- Visible focus indicators
- ARIA attributes for dynamic controls
- Alternative text and identification of decorative content
- Text descriptions for charts
- Appropriate text-to-background contrast
- Support for the `prefers-reduced-motion` preference
- Responsive layout

## 🌱 Sustainability

The project also considers Green IT principles, aiming to reduce unnecessary resource usage and prioritise accessible, efficient solutions.

Strategies include:

- Responsive interface design
- SVG files for icons and graphical elements
- Reduced animations when requested by the user
- Modular JavaScript architecture
- Optimisation through Vite's production build process

## 📄 Licence

This project is licensed under the MIT Licence.

Please refer to the `LICENCE` file for the full licence text.

## 👤 Author

Developed by **PinchiSZ(André)** as part of the *Front-End Web Development* module in the Information Systems degree programme at Cruzeiro do Sul, Brazil, in 2026.

