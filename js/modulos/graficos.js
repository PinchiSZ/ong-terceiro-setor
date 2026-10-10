
/* ============================================================
   ARQUIVO: js/modulos/graficos.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Integração com Chart.js, com suporte aos temas
              claro e escuro e cores adaptadas à acessibilidade.
   ============================================================ */

import { dadosDoacoes, dadosVoluntarios } from "../dados.js";


let promessaChart = null;

function carregarChartJS() {
    if (typeof Chart !== "undefined") {
        return Promise.resolve();
    }

    if (promessaChart) {
        return promessaChart;
    }

    promessaChart = new Promise((resolve, reject) => {
        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js";

        script.onload = () => resolve();

        script.onerror = () => {
            promessaChart = null;
            reject(new Error("Não foi possível carregar o Chart.js."));
        };

        document.head.appendChild(script);
    });

    return promessaChart;
}


let graficoDoacoes = null;
let graficoVoluntarios = null;

function obterCores() {
    const estilo = getComputedStyle(document.documentElement);
    const temaEscuro =
        document.documentElement.getAttribute("data-theme") === "dark";

    return {
        texto: estilo.getPropertyValue("--texto").trim() || "#263238",
        borda: estilo.getPropertyValue("--borda").trim() || "#6B7280",
        grade: temaEscuro ? "#455A64" : "#CFD8DC",
        doacoes: temaEscuro ? "#81C784" : "#2E7D32",

        fatias: temaEscuro
            ? ["#81C784", "#90CAF9", "#FFCC80", "#CE93D8"]
            : ["#2E7D32", "#1565C0", "#8A4F00", "#6A1B9A"]
    };
}


export async function renderizarGraficos() {
    // Não carrega a biblioteca se a página não tiver gráficos.
    const possuiGraficos =
        document.getElementById("grafico-doacoes") ||
        document.getElementById("grafico-voluntarios");

    if (!possuiGraficos) {
        return;
    }

    // Carrega Chart.js somente quando os gráficos são necessários.
    try {
        await carregarChartJS();
    } catch (erro) {
        console.warn(
            "Chart.js não está disponível — gráficos ignorados.",
            erro
        );
        return;
    }

    // Consulta novamente o DOM após o carregamento assíncrono.
    // A rota pode ter mudado enquanto a biblioteca era carregada.
    const canvasDoacoes =
        document.getElementById("grafico-doacoes");

    const canvasVoluntarios =
        document.getElementById("grafico-voluntarios");

    if (!canvasDoacoes && !canvasVoluntarios) {
        return;
    }

    if (graficoDoacoes) {
        graficoDoacoes.destroy();
        graficoDoacoes = null;
    }

    if (graficoVoluntarios) {
        graficoVoluntarios.destroy();
        graficoVoluntarios = null;
}

    const cores = obterCores();

    const opcoesComuns = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    color: cores.texto,
                    padding: 16,
                    boxWidth: 14,
                    boxHeight: 14
                }
            }
        }
    };

    if (canvasDoacoes) {
        graficoDoacoes = new Chart(canvasDoacoes, {
            type: "line",
            data: {
                labels: dadosDoacoes.labels,
                datasets: [{
                    label: "Doações (R$)",
                    data: dadosDoacoes.valores,
                    borderColor: cores.doacoes,
                    backgroundColor: temaComTransparencia(cores.doacoes),
                    pointBackgroundColor: cores.doacoes,
                    pointBorderColor: cores.texto,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    borderWidth: 3,
                    tension: 0.2,
                    fill: true
                }]
            },
            options: {
                ...opcoesComuns,
                scales: {
                    x: {
                        ticks: { color: cores.texto },
                        grid: { color: cores.grade },
                        border: { color: cores.borda }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: cores.texto },
                        grid: { color: cores.grade },
                        border: { color: cores.borda }
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
                    backgroundColor: cores.fatias,
                    borderColor: cores.texto,
                    borderWidth: 2,
                    hoverOffset: 6
                }]
            },
            options: opcoesComuns
        });
    }
}

function temaComTransparencia(cor) {
    const canais = cor.match(/[a-f\d]{2}/gi);

    if (!canais || canais.length < 3) {
        return "rgba(46, 125, 50, 0.15)";
    }

    const [r, g, b] = canais.slice(0, 3).map(valor => parseInt(valor, 16));

    return `rgba(${r}, ${g}, ${b}, 0.15)`;
}