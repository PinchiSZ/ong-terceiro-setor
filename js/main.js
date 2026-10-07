/* ============================================================
   ARQUIVO: js/main.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Ponto de entrada da SPA. Orquestra os módulos:
              roteador, menu, validação, tema, gráficos e toast.
   ============================================================ */

import { iniciarRouter } from "./modulos/router.js";
import { inicializarMenu, fecharMenuMobile } from "./modulos/menu.js";
import { inicializarValidacao } from "./modulos/validacao.js";
import { aplicarTemaSalvo, inicializarBotaoTema } from "./modulos/tema.js";
import { renderizarCartoes } from "./modulos/templates.js";
import { renderizarGraficos } from "./modulos/graficos.js";
import { mostrarToast, inicializarToast } from "./modulos/toast.js";
import { projetos } from "./dados.js";

document.addEventListener("DOMContentLoaded", () => {

    const ano = document.getElementById("ano-atual");
    if (ano) ano.textContent = new Date().getFullYear();

    aplicarTemaSalvo();
    inicializarBotaoTema();
    inicializarMenu();
    inicializarToast();

    const app = document.getElementById("app");
    iniciarRouter(app, {
        aoRenderizar(rota) {
            fecharMenuMobile();

            if (rota === "projetos") {
                renderizarCartoes(projetos, "lista-projetos");
            }
            if (rota === "home") {
                renderizarGraficos();
            }
            if (rota === "cadastro") {
                inicializarValidacao(() => {
                    mostrarToast("Cadastro enviado com sucesso!");
                });
            }
        }
    });
});