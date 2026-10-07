/* ============================================================
   ARQUIVO: js/modulos/toast.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Notificação não-obstrutiva exibida após ações
              bem-sucedidas (ex.: cadastro enviado).
   ============================================================ */

let temporizador;

export function mostrarToast(mensagem, icone = "✅") {
    const toast = document.getElementById("toast");
    const texto = document.getElementById("toast-mensagem");
    const iconeEl = document.getElementById("toast-icone");

    if (!toast || !texto) return;

    texto.textContent = mensagem;

    if (iconeEl) {
        iconeEl.textContent = icone;
    }

    toast.hidden = false;

    /* Reinicia o temporizador caso outro toast seja exibido */
    clearTimeout(temporizador);

    temporizador = setTimeout(() => {
        toast.hidden = true;
    }, 5000);
}

export function inicializarToast() {
    const botaoFechar =
        document.querySelector("[data-toast-fechar]");

    if (!botaoFechar) return;

    botaoFechar.addEventListener("click", () => {
        const toast = document.getElementById("toast");

        if (!toast) return;

        /* Cancela o temporizador ao fechar manualmente */
        clearTimeout(temporizador);

        toast.hidden = true;
    });
}