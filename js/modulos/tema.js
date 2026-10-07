/* ============================================================
   ARQUIVO: js/modulos/tema.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Alternância entre tema claro e escuro, com
              persistência em localStorage.
   ============================================================ */

import { salvar, carregar } from "./storage.js";

export function aplicarTemaSalvo() {
    const tema = carregar("tema");

    if (tema === "escuro" || tema === "claro") {
        document.documentElement.setAttribute(
            "data-theme",
            tema === "escuro" ? "dark" : "light"
        );
        return;
    }

    const prefereEscuro =
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    document.documentElement.setAttribute(
        "data-theme",
        prefereEscuro ? "dark" : "light"
    );
}

export function inicializarBotaoTema() {
    const botao = document.getElementById("botao-tema");

    if (!botao) return;

    function atualizarAcessibilidade(tema) {
        const escuro = tema === "dark";

        botao.setAttribute(
            "aria-label",
            escuro
                ? "Ativar tema claro"
                : "Ativar tema escuro"
        );

        botao.setAttribute(
            "aria-pressed",
            String(escuro)
        );
    }

    const temaInicial =
        document.documentElement.getAttribute("data-theme") || "light";

    atualizarAcessibilidade(temaInicial);

    botao.addEventListener("click", () => {
        const atual =
            document.documentElement.getAttribute("data-theme");

        const proximo =
            atual === "dark" ? "light" : "dark";

        document.documentElement.setAttribute(
            "data-theme",
            proximo
        );

        atualizarAcessibilidade(proximo);

        salvar(
            "tema",
            proximo === "dark" ? "escuro" : "claro"
        );
    });
}