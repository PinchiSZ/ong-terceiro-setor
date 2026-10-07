/* ============================================================
   ARQUIVO: js/dados.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Dados mockados usados pela SPA. Ficam isolados
              para que, no futuro, sejam trocados por chamadas
              a uma API real sem impacto no resto do código.
   ============================================================ */

export const projetos = [
    {
        id: "educacao",
        titulo: "Educação e Tecnologia",
        descricao: "Cursos, materiais educativos e atividades de formação sobre tecnologia, cidadania e idiomas.",
        icone: "icone-educacao.svg"
},
    {
        id: "acessibilidade",
        titulo: "Inclusão e Acessibilidade",
        descricao: "Iniciativas voltadas à inclusão social e digital, reduzindo barreiras de acesso.",
        icone: "icone-acessibilidade.svg",
    },
    {
        id: "tecnologia",
        titulo: "Tecnologia Sustentável",
        descricao: "Desenvolvimento e uso responsável da tecnologia com foco em acessibilidade e sustentabilidade.",
        icone: "icone-tecnologia.svg",
    },
    {
        id: "sustentabilidade",
        titulo: "Meio Ambiente",
        descricao: "Campanhas, cursos e ações educativas sobre mudanças climáticas e Agenda 2030.",
        icone: "icone-meio-ambiente.svg",
    }
];

export const dadosDoacoes = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    valores: [1200, 1900, 2400, 2100, 3200, 3800]
};

export const dadosVoluntarios = {
    labels: ["Educação", "Inclusão", "Tecnologia", "Meio Ambiente"],
    valores: [12, 8, 15, 6]
};