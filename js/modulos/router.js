/* ============================================================
   ARQUIVO: js/modulos/router.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Roteador da Single Page Application. Intercepta
              cliques em links com [data-link], atualiza o hash
              da URL e carrega a view parcial via fetch.

   SEGURANÇA:
   - Whitelist de rotas evita fetch com valores arbitrários.
   - Token de requisição evita race condition em cliques rápidos.
   - View de erro criada com createElement.
   - Views carregadas são arquivos HTML estáticos do próprio
     projeto.
   ============================================================ */

const ROTAS_VALIDAS = ["home", "projetos", "cadastro"];

export function iniciarRouter(container, callbacks = {}) {
    const { aoRenderizar } = callbacks;

    let tokenAtual = 0;

    async function carregarView() {
        const meuToken = ++tokenAtual;

        const rota =
            window.location.hash.replace("#/", "") || "home";

        /* Redireciona rotas desconhecidas para o início */
        if (!ROTAS_VALIDAS.includes(rota)) {
            window.location.hash = "#/home";
            return;
        }

        container.setAttribute("aria-busy", "true");

        try {
            const resposta = await fetch(`html/${rota}.html`);

            /*
             * Ignora resposta de uma navegação anterior caso o
             * usuário tenha clicado rapidamente em outra rota.
             */
            if (meuToken !== tokenAtual) return;

            if (!resposta.ok) {
                throw new Error("View não encontrada");
            }

            const html = await resposta.text();

            /* Verifica novamente após o fetch do conteúdo */
            if (meuToken !== tokenAtual) return;

            /*
             * As views são arquivos HTML estáticos do próprio
             * projeto. Não há entrada do usuário sendo inserida.
             */
            container.innerHTML = html;

            /* Atualiza aria-current da navegação */
            document.querySelectorAll("[data-link]").forEach(link => {
                const href = link.getAttribute("href");

                if (!href) return;

                const destino = href.replace("#/", "");

                if (destino === rota) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });

            /*
             * Move o foco para a área principal após a troca
             * de conteúdo.
             */
            container.focus();

            const prefereMovimentoReduzido =
                window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            container.scrollIntoView({
                behavior: prefereMovimentoReduzido ? "auto" : "smooth",
                block: "start"
            });

            if (typeof aoRenderizar === "function") {
                aoRenderizar(rota);
            }

        } catch (e) {
            console.error("Erro ao carregar view:", e);

            /*
             * Evita substituir o conteúdo por uma resposta antiga
             * caso outra navegação já tenha começado.
             */
            if (meuToken !== tokenAtual) return;

            /* Cria a view de erro sem inserir dados via innerHTML */
            const secao = document.createElement("section");
            secao.className = "secao";

            const h2 = document.createElement("h2");
            h2.textContent = "Página não encontrada";

            const p = document.createElement("p");

            const code = document.createElement("code");
            code.textContent = rota;

            p.append(
                "A rota ",
                code,
                " não existe."
            );

            const link = document.createElement("a");
            link.href = "#/home";
            link.dataset.link = "";
            link.className = "botao botao--primario";
            link.textContent = "Voltar ao início";

            secao.append(h2, p, link);

            container.replaceChildren(secao);

        } finally {
            if (meuToken === tokenAtual) {
                container.removeAttribute("aria-busy");
            }
        }
    }

    document.addEventListener("click", evento => {
        const link = evento.target.closest("[data-link]");

        if (!link) return;

        const href = link.getAttribute("href");

        /* Ignora links sem destino válido */
        if (!href) return;

        const rota = href.replace("#/", "");

        /* Só intercepta rotas conhecidas */
        if (!ROTAS_VALIDAS.includes(rota)) {
            return;
        }

        evento.preventDefault();

        if (window.location.hash === `#/${rota}`) {
            carregarView();
        } else {
            window.location.hash = `#/${rota}`;
        }
    });

    window.addEventListener("hashchange", carregarView);

    carregarView();
}