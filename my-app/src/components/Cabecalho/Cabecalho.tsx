import Menu from "../Menu/Menu";


export default function Cabecalho() {
    return (
        <header className="cabecalho">
            <div className="marca">

            <h1>GERENCIADOR DE PRODUTOS</h1>

            <Menu />
            <button>TEMA</button>
            </div>
        </header>
    );
    
}