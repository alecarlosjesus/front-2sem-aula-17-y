import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { TemaContext } from "../../contexts/TemaContext";
import Menu from "../Menu/Menu";

export default function Cabecalho() {
    const { tema, alternarTema } = useContext(TemaContext);

    return (
        <header className="cabecalho">
            <div className="cabecalho-conteudo">
                <div className="marca">
                    <h1>Gerenciador de Produtos</h1>
                    <p>React, TypeScript e Tailwind CSS</p>
                </div>

                <Menu />

                <button
                    type="button"
                    className="botao-tema"
                    onClick={alternarTema}
                    aria-label={tema === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
                >
                    {tema === "light" ? <FaMoon /> : <FaSun />}
                    {tema === "light" ? "Tema escuro" : "Tema claro"}
                </button>
            </div>
        </header>
    );
}
