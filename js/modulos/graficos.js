/* ============================================================
   ARQUIVO: js/modulos/graficos.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Integração com Chart.js (carregada via CDN) para
              gerar o dashboard de impacto da ONG.
   ============================================================ */

import { dadosDoacoes, dadosVoluntarios } from "../dados.js";

const COR_VERDE      = "#2E7D32";
const COR_VERDE_MED  = "#4CAF50";
const COR_AZUL       = "#1565C0";
const COR_AZUL_CLARO = "#42A5F5";

let graficoDoacoes = null;
let graficoVoluntarios = null;

export function renderizarGraficos() {
    /* Aborta silenciosamente se o Chart.js não carregou */
    if (typeof Chart === "undefined") {
        console.warn(
            "Chart.js não está disponível — gráficos ignorados."
        );
        return;
    }

    const canvasDoacoes =
        document.getElementById("grafico-doacoes");

    const canvasVoluntarios =
        document.getElementById("grafico-voluntarios");

    /* Evita instâncias duplicadas ao voltar para a página */
    if (graficoDoacoes) {
        graficoDoacoes.destroy();
        graficoDoacoes = null;
    }

    if (graficoVoluntarios) {
        graficoVoluntarios.destroy();
        graficoVoluntarios = null;
    }

    if (canvasDoacoes) {
        graficoDoacoes = new Chart(canvasDoacoes, {
            type: "line",
            data: {
                labels: dadosDoacoes.labels,
                datasets: [{
                    label: "Doações (R$)",
                    data: dadosDoacoes.valores,
                    borderColor: COR_VERDE,
                    backgroundColor: "rgba(46, 125, 50, 0.15)",
                    tension: 0.35,
                    fill: true,
                    pointBackgroundColor: COR_VERDE
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }

    if (canvasVoluntarios) {
        graficoVoluntarios = new Chart(canvasVoluntarios, {
            type: "doughnut",
            data: {
                labels: dadosVoluntarios.labels,
                datasets: [{
                    data: dadosVoluntarios.valores,
                    backgroundColor: [
                        COR_VERDE,
                        COR_AZUL,
                        COR_VERDE_MED,
                        COR_AZUL_CLARO
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        });
    }
}