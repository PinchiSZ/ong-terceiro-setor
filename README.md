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

Projeto desenvolvido por André Zrzebiela para a disciplina de
Desenvolvimento Front-End para Web, do curso de
Sistemas de Informação — Cruzeiro do Sul, 2026.