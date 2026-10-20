import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link } from "react-router";
import { FaRegEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

export default function Produtos() {

    // const API_URL: string = import.meta.env.VITE_API_URL;
    const API_URL: string = import.meta.env.VITE_API_URL;


    const [produtos, setProdutos] = useState<TipoProduto[]>([]);

    useEffect(() => {

        //Realizando o GetAllProdutos
        async function carregarProdutos() {
            try {

                // const response = await fetch("http://localhost:3001/produtos");
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("A listagem dos produtos falhou!");
                }
                const resultado: {
                    status: string;
                     data:TipoProduto[];
                } = await response.json();
            
                setProdutos(resultado.data);

            } catch (error) {
                console.error(error);
            }

        }

        carregarProdutos();

    }, []);

    const handleDelete = async (id: string) => {

        const confirmacao = window.confirm("Deseja realmente excluir o produto?");
        if (!confirmacao) {
            return;
        }
        
        try {
            // const response = await fetch(`http://localhost:3001/produtos/${id}`, {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=utf-8",
                },
                body: JSON.stringify({
                    action: "DELETE", 
                     id:id,
                    }),
            });

            if (!response.ok) {
                throw new Error(`Erro ao excluir o produto : ${response.status} - ${response.statusText}`);
            }


            const resultado = await response.json();

            if(resultado.status === "error") {
                throw new Error(`Erro ao excluir o produto : ${resultado.status} - ${resultado.statusText}`);
            }
            //Filtrando o produto excluído da lista de produtos
            alert("Produto excluído!");
            setProdutos(produtos.filter((p) => p.id !== id));
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main className="pagina produtos">
            <div className="titulo-pagina">
                <p>Gerenciamento</p>
                <h2>Produtos cadastrados</h2>
            </div>

            <div className="painel tabela-responsiva">
                <table className="tbProduto">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NOME</th>
                            <th>PREÇO</th>
                            <th>ESTOQUE</th>
                            <th>AVATAR</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {produtos.map((p, i) => (
                            <tr key={i}>
                                <td>{p.id}</td>
                                <td>{p.nome}</td>
                                <td>{Number(p.preco).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                <td><span className="estoque">{p.estoque}</span></td>
                                <td><img className="avatar-produto" src={p.avatar} alt={p.nome} /></td>
                                <td className="acoes">
                                    <Link className="editar" to={`/editar-produtos/${p.id}`} aria-label={`Editar ${p.nome}`}><Editar /></Link>
                                    <button className="excluir" type="button" onClick={() => handleDelete(p.id)} aria-label={`Excluir ${p.nome}`}><Excluir /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={6}>Quantidade de produtos: {produtos?.length}</td>
                        </tr>
                    </tfoot>

                </table>
            </div>

        </main>
    );
}
