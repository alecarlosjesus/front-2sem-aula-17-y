import { Link } from "react-router";

export default function Menu() {
    return (
        <nav>
            <Link to="/">Home</Link>{" | "}
            <Link to="/produtos">Produtos</Link>{" | "}
            <Link to="/cad-produto/">Cadastrar Produto</Link>{" | "}
            {/* <Link to="/editar-produtos">Editar Produtos</Link> */}
        </nav>
    );
}