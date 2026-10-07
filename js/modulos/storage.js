/* ============================================================
   ARQUIVO: js/modulos/storage.js
   PROJETO: Instituto TEIAS
   DESCRIÇÃO: Encapsula o acesso ao localStorage. Todas as
              operações passam por aqui, protegidas por try/catch
              (localStorage pode estar indisponível em modo
              anônimo ou com cookies bloqueados).
   ============================================================ */

const PREFIXO = "teias:";

export function salvar(chave, valor) {
    /* Ignora gravações sem valor */
    if (valor === undefined) {
        console.warn(
            `storage: tentativa de salvar "${chave}" como undefined — ignorado.`
        );
        return false;
    }

    try {
        localStorage.setItem(
            PREFIXO + chave,
            JSON.stringify(valor)
        );

        /* Informa ao módulo que a gravação foi realizada */
        return true;

    } catch (e) {
        /* Armazenamento cheio */
        if (e.name === "QuotaExceededError") {
            console.error(
                "localStorage cheio. Não foi possível salvar os dados."
            );
        } else {
            console.warn(
                "Não foi possível salvar no localStorage:",
                e
            );
        }

        /* Informa ao módulo que a gravação falhou */
        return false;
    }
}

export function carregar(chave, padrao = null) {
    try {
        const bruto = localStorage.getItem(PREFIXO + chave);

        if (bruto === null) {
            return padrao;
        }

        /* Proteção extra contra valor inválido */
        if (bruto === "undefined") {
            return padrao;
        }

        return JSON.parse(bruto);

    } catch (e) {
        console.warn(
            "Não foi possível ler do localStorage:",
            e
        );

        return padrao;
    }
}

export function remover(chave) {
    try {
        localStorage.removeItem(PREFIXO + chave);

        /* Informa que a remoção foi realizada */
        return true;

    } catch (e) {
        console.warn(
            "Não foi possível remover do localStorage:",
            e
        );

        return false;
    }
}