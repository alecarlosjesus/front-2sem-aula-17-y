import { Link } from "react-router";

export default function Menu() {
    return (
        <nav className="menu" aria-label="Navegação principal">
            <Link to="/">Home</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/cad-produto/">Cadastrar</Link>
        </nav>
    );
}
