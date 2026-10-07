/* ============================================================
   ARQUIVO: js/modulos/templates.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Geração dinâmica de componentes a partir de
              <template> HTML5 e cloneNode(). Preenche textos
              com textContent (evita XSS) e imagens com src.

   MELHORIAS APLICADAS:
   - Substitui alert() por toast da própria aplicação.
   - aria-label descritivo no botão "Ver detalhes".
   - Indentação padronizada.
   - Proteção contra elementos ausentes no template.
   ============================================================ */

import { mostrarToast } from "./toast.js";

export function renderizarCartoes(projetos, containerId) {
    const container = document.getElementById(containerId);
    const template = document.getElementById("tpl-cartao-projeto");

    if (!container || !template) return;

    container.replaceChildren();

    projetos.forEach(projeto => {
        const clone = template.content.cloneNode(true);

        /* Título e descrição */
        const titulo = clone.querySelector(".cartao__titulo");
        const descricao = clone.querySelector(".cartao__descricao");

        if (titulo) {
            titulo.textContent = projeto.titulo;
        }

        if (descricao) {
            descricao.textContent = projeto.descricao;
        }

        /* Ícone */
        const icone = clone.querySelector(".cartao__icone");

        if (icone && projeto.icone) {
            icone.src = `imagens/${projeto.icone}`;
            icone.alt = "";
        }

        /* Badges — só renderiza se o projeto tiver */
        const badges = clone.querySelector(".cartao__badges");

        if (badges) {
            if (Array.isArray(projeto.badges) && projeto.badges.length > 0) {
                projeto.badges.forEach(b => {
                    const span = document.createElement("span");

                    span.className = `badge badge--${b.cor}`;
                    span.textContent = b.texto;

                    badges.appendChild(span);
                });
            } else {
                badges.remove();
            }
        }

        /* Botão "Ver detalhes" */
        const botao = clone.querySelector("[data-detalhe]");

        if (botao) {
            botao.dataset.id = projeto.id;

            botao.setAttribute(
                "aria-label",
                `Ver detalhes do projeto ${projeto.titulo}`
            );

            botao.addEventListener("click", () => {
                mostrarToast(
                    `Em breve: detalhes de "${projeto.titulo}"`,
                    "📋"
                );
            });
        }

        container.appendChild(clone);
    });
}