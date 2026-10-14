import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link } from "react-router";
import { FaRegEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

export default function Produtos() {

    const [produtos, setProdutos] = useState<TipoProduto[]>([]);

    useEffect(() => {

        //Realizando o GetAllProdutos
        async function carregarProdutos() {
            try {

                const response = await fetch("http://localhost:3001/produtos");

                if (!response.ok) {
                    throw new Error("A listagem dos produtos falhou!");
                }

                const data: TipoProduto[] = await response.json();
                setProdutos(data);

            } catch (error) {
                console.error(error);
            }

        }

        carregarProdutos();

    }, []);

    const handleDelete = async (id: string) => {

        try {

            const response = await fetch(`http://localhost:3001/produtos/${id}`, {
                method: "DELETE"
            });
            ;
            if (!response.ok) {
                throw new Error(`Erro ao excluir o produto : ${response.status} - ${response.statusText}`);
            }

            //Redirect
            alert("Produto excluído!");
            window.location.href = "/produtos";

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <h2>Produtos</h2>

            <div>
                <table className="tbProduto">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>PREÇO</th>
                            <th>ESTOQUE</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((p, i) => (
                            <tr key={i}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{p.preco}</td>
                                <td>{p.estoque}</td>
                                <td className="acoes">
                                    <Link to={`/editar-produtos/${p.id}`}> <Editar /> </Link> /
                                    <Link to="#" onClick={() => handleDelete(p.id)}><Excluir /></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={5}>Quantidade de produtos: {produtos?.length}</td>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </main>
    );
}