/* ============================================================
   ARQUIVO: js/modulos/validacao.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Validação customizada do formulário de cadastro.
              Aplica máscaras, valida no blur e no submit,
              injeta mensagens de erro e persiste cadastros.

   MELHORIAS APLICADAS:
   - Validação de data rejeita valores inválidos e futuros.
   - Debounce ao salvar rascunho evita gravação a cada tecla.
   - Bloqueio de duplo submit evita cadastros duplicados.
   - aria-describedby associa mensagem de erro ao campo.
   - role="status" evita múltiplos anúncios interrompidos.
   - Alerta consolidado informa o total de erros de uma vez.
   - Cadastro só é considerado enviado após confirmação
     de sucesso no localStorage.
   - Rascunho pendente é cancelado durante o envio.
   - Cidade e estado incluídos na validação e persistência.
   ============================================================ */

import { salvar, carregar, remover } from "./storage.js";

/* ---------- Máscaras ---------- */
function mascararCPF(v) {
    return v.replace(/\D/g, "").slice(0, 11)
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function mascararTelefone(v) {
    const n = v.replace(/\D/g, "").slice(0, 11);

    if (!n) return "";

    if (n.length <= 2) {
        return `(${n}`;
    }

    if (n.length <= 6) {
        return `(${n.slice(0, 2)}) ${n.slice(2)}`;
    }

    if (n.length <= 10) {
        return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
    }

    return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

function mascararCEP(v) {
    return v.replace(/\D/g, "")
        .slice(0, 8)
        .replace(/^(\d{5})(\d)/, "$1-$2");
}

/* ---------- Validações ---------- */
function validarCPF(cpf) {
    const n = cpf.replace(/\D/g, "");

    if (n.length !== 11 || /^(\d)\1+$/.test(n)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma += parseInt(n[i - 1]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    if (resto !== parseInt(n[9])) {
        return false;
    }

    soma = 0;

    for (let i = 1; i <= 10; i++) {
        soma += parseInt(n[i - 1]) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
        resto = 0;
    }

    return resto === parseInt(n[10]);
}

const REGRAS = {
    nome: v =>
        v.trim().length >= 3 ||
        "Informe ao menos 3 caracteres.",

    cpf: v =>
        validarCPF(v) ||
        "CPF inválido.",

    dataNascimento: v => {
        if (!v) {
            return "Informe sua data de nascimento.";
        }

        const nasc = new Date(v);

        if (isNaN(nasc.getTime())) {
            return "Data inválida.";
        }

        const hoje = new Date();

        if (nasc > hoje) {
            return "A data não pode ser futura.";
        }

        const idade = Math.floor(
            (hoje - nasc) /
            (1000 * 60 * 60 * 24 * 365.25)
        );

        return idade >= 16 ||
            "É necessário ter ao menos 16 anos.";
    },

    email: v =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ||
        "E-mail inválido.",

    telefone: v =>
        /^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) ||
        "Telefone inválido.",

    cep: v =>
        /^\d{5}-\d{3}$/.test(v) ||
        "CEP inválido.",

    logradouro: v =>
        v.trim().length >= 3 ||
        "Informe seu endereço.",

    cidade: v =>
        v.trim().length >= 2 ||
        "Informe sua cidade.",

    estado: v =>
        v !== "" ||
        "Selecione seu estado."
};

/* ---------- Manipulação visual dos erros ---------- */
function limparErro(campo) {
    campo.classList.remove("campo-erro");
    campo.removeAttribute("aria-invalid");
    campo.removeAttribute("aria-describedby");

    const proximo = campo.nextElementSibling;

    if (proximo?.classList.contains("mensagem-erro")) {
        proximo.remove();
    }
}

function marcarErro(campo, mensagem) {
    campo.classList.add("campo-erro");
    campo.setAttribute("aria-invalid", "true");

    const proximo = campo.nextElementSibling;

    if (proximo?.classList.contains("mensagem-erro")) {
        proximo.textContent = mensagem;
        return;
    }

    const idMensagem =
        `erro-${campo.id || Math.random().toString(36).slice(2, 8)}`;

    const span = document.createElement("span");

    span.className = "mensagem-erro";
    span.id = idMensagem;
    span.setAttribute("role", "status");
    span.textContent = mensagem;

    campo.insertAdjacentElement("afterend", span);
    campo.setAttribute("aria-describedby", idMensagem);
}

/* ---------- Alerta consolidado de erros ---------- */
function mostrarResumoErros(form) {
    const antigo = form.querySelector(".alerta--erro");

    if (antigo) {
        antigo.remove();
    }

    const resumo = document.createElement("div");

    resumo.className = "alerta alerta--erro";
    resumo.setAttribute("role", "alert");

    const strong = document.createElement("strong");
    strong.textContent = "Verifique os campos destacados";

    const span = document.createElement("span");
    span.textContent = "Há informações a corrigir antes do envio.";

    resumo.append(strong, span);

    form.insertAdjacentElement("beforebegin", resumo);
}

/* ---------- Inicialização ---------- */
export function inicializarValidacao(aoEnviar) {
    const form = document.getElementById("form-cadastro");

    if (!form) {
        return;
    }

    const campos = form.querySelectorAll("input, select");
    let temporizadorRascunho;

    /* Restaura rascunho salvo */
    const rascunho = carregar("rascunho", {});

    Object.entries(rascunho).forEach(([id, valor]) => {
        const campo = document.getElementById(id);

        if (campo && campo.type !== "checkbox") {
            campo.value = valor;
        }
    });

    /* Máscaras: aplicadas durante a digitação */
    form.querySelectorAll("#cpf, #telefone, #cep").forEach(campo => {
        campo.addEventListener("input", () => {
            if (campo.id === "cpf") {
                campo.value = mascararCPF(campo.value);
            }

            if (campo.id === "telefone") {
                campo.value = mascararTelefone(campo.value);
            }

            if (campo.id === "cep") {
                campo.value = mascararCEP(campo.value);
            }
        });
    });

    /* Salva alterações do campo como rascunho com debounce */
    function salvarRascunho(campo) {
        limparErro(campo);

        clearTimeout(temporizadorRascunho);

        temporizadorRascunho = setTimeout(() => {
            const dados = carregar("rascunho", {});

            dados[campo.id] = campo.value;

            salvar("rascunho", dados);
        }, 300);
    }

    /* Comportamentos de todos os campos */
    campos.forEach(campo => {
        if (campo.type === "checkbox") {
            return;
        }

        /* Ao digitar */
        campo.addEventListener("input", () => {
            salvarRascunho(campo);
        });

        /* Ao selecionar ou alterar um campo */
        campo.addEventListener("change", () => {
            salvarRascunho(campo);
        });

        /* Ao sair do campo: valida individualmente */
        campo.addEventListener("blur", () => {
            const regra = REGRAS[campo.id];

            if (!regra) {
                return;
            }

            const resultado = regra(campo.value);

            if (resultado !== true) {
                marcarErro(campo, resultado);
            } else {
                limparErro(campo);
            }
        });
    });

    /* Checkboxes de participação: limpa erro ao marcar */
    form.querySelectorAll('input[name="participacao"]').forEach(cb => {
        cb.addEventListener("change", () => {
            const algumMarcado =
                form.querySelector(
                    'input[name="participacao"]:checked'
                );

            if (algumMarcado) {
                form.querySelectorAll(
                    'input[name="participacao"]'
                ).forEach(c => limparErro(c));
            }
        });
    });

    /* Submit */
    form.addEventListener("submit", (evento) => {
        evento.preventDefault();

        const botao = form.querySelector('button[type="submit"]');
        let primeiroErro = null;

        /* Valida todos os campos */
        campos.forEach(campo => {
            if (campo.type === "checkbox") {
                return;
            }

            const regra = REGRAS[campo.id];

            if (!regra) {
                return;
            }

            limparErro(campo);

            const resultado = regra(campo.value);

            if (resultado !== true) {
                marcarErro(campo, resultado);

                if (!primeiroErro) {
                    primeiroErro = campo;
                }
            }
        });

        /* Valida checkboxes de participação */
        const marcados =
            form.querySelectorAll(
                'input[name="participacao"]:checked'
            );

        if (marcados.length === 0) {
            const grupo =
                form.querySelector('input[name="participacao"]');

            marcarErro(
                grupo,
                "Escolha ao menos uma forma de participação."
            );

            if (!primeiroErro) {
                primeiroErro = grupo;
            }
        }

        /* Interrompe envio se houver erros */
        if (primeiroErro) {
            mostrarResumoErros(form);

            primeiroErro.focus();

            primeiroErro.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        /* Cancela eventual salvamento de rascunho pendente */
        clearTimeout(temporizadorRascunho);

        /* Bloqueia duplo clique */
        if (botao) {
            botao.disabled = true;
        }

        /* Monta o objeto de dados */
        const dados = {};

        campos.forEach(campo => {
            if (campo.type === "checkbox") {
                if (campo.checked) {
                    dados.participacao =
                        dados.participacao || [];

                    dados.participacao.push(campo.value);
                }
            } else {
                dados[campo.id] = campo.value;
            }
        });

        dados.dataEnvio = new Date().toISOString();

        /* Recupera cadastros existentes */
        let lista = carregar("cadastros", []);

        if (!Array.isArray(lista)) {
            console.warn(
                'storage: valor de "cadastros" não é um array. ' +
                "O armazenamento será reiniciado."
            );

            lista = [];
        }

        lista.push(dados);

        /* Persiste e verifica se realmente foi salvo */
        const cadastroSalvo = salvar("cadastros", lista);

        if (!cadastroSalvo) {
            /*
             * O cadastro não foi salvo.
             * Mantemos os dados no formulário para que o usuário
             * não precise preenchê-lo novamente.
             */
            if (botao) {
                botao.disabled = false;
            }

            const alertaExistente =
                form.querySelector(".alerta--erro");

            if (alertaExistente) {
                alertaExistente.remove();
            }

            const alerta = document.createElement("div");

            alerta.className = "alerta alerta--erro";
            alerta.setAttribute("role", "alert");

            const strong = document.createElement("strong");
            strong.textContent =
                "Não foi possível enviar o cadastro.";

            const span = document.createElement("span");
            span.textContent =
                "O armazenamento do navegador está indisponível ou cheio. " +
                "Seus dados continuam preenchidos no formulário.";

            alerta.append(strong, span);

            form.insertAdjacentElement(
                "beforebegin",
                alerta
            );

            return;
        }

        /* Cadastro salvo com sucesso: remove o rascunho */
        remover("rascunho");

        const resumoAntigo =
            form.querySelector(".alerta--erro");

        if (resumoAntigo) {
            resumoAntigo.remove();
        }

        form.reset();

        if (typeof aoEnviar === "function") {
            aoEnviar(dados);
        }

        /* Libera o botão após o período de proteção contra duplo clique */
        setTimeout(() => {
            if (botao) {
                botao.disabled = false;
            }
        }, 1500);
    });
}