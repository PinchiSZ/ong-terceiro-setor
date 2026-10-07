/* ============================================================
   ARQUIVO: js/modulos/menu.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Controla o menu hambúrguer (mobile) e o
              fechamento por tecla Esc.
   ============================================================ */

export function inicializarMenu() {
    const botao = document.getElementById("menu-hamburger");
    const menu = document.getElementById("menu-principal");

    if (!botao || !menu) return;

    function fechar() {
        botao.setAttribute("aria-expanded", "false");
        menu.classList.remove("menu-aberto");
        botao.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
        );
    }

    botao.addEventListener("click", () => {
        const aberto =
            botao.getAttribute("aria-expanded") === "true";

        if (aberto) {
            fechar();
            return;
        }

        botao.setAttribute("aria-expanded", "true");
        menu.classList.add("menu-aberto");
        botao.setAttribute(
            "aria-label",
            "Fechar menu de navegação"
        );
    });

    document.addEventListener("keydown", evento => {
        if (
            evento.key === "Escape" &&
            botao.getAttribute("aria-expanded") === "true"
        ) {
            fechar();
            botao.focus();
        }
    });
}

export function fecharMenuMobile() {
    const botao = document.getElementById("menu-hamburger");
    const menu = document.getElementById("menu-principal");

    if (!botao || !menu) return;

    botao.setAttribute("aria-expanded", "false");
    menu.classList.remove("menu-aberto");
    botao.setAttribute(
        "aria-label",
        "Abrir menu de navegação"
    );
}