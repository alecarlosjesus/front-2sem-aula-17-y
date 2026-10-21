import { useEffect, useState } from "react";
import type { TipoProduto } from "../../types/types";
import { Link } from "react-router";
import { FaRegEdit as Editar } from "react-icons/fa";
import { MdDeleteForever as Excluir } from "react-icons/md";

export default function Produtos() {

    const API_URL: string = import.meta.env.VITE_API_URL;

    const [produtos, setProdutos] = useState<TipoProduto[]>([]);
  
    useEffect(() => {

        //Realizando o GetAllProdutos
        async function carregarProdutos() {
            try {

                
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error("A listagem dos produtos falhou!");
                }
                const resultado: {
                    status: string;
                     data:TipoProduto[];
                } = await response.json();
                
                if(resultado.status === "error") {
                    throw new Error("A listagem dos produtos falhou!");
                }

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
           
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain;charset=UTF-8"
                },
                body: JSON.stringify({ id:id,action:"DELETE"})
            });

            if (!response.ok) {
                throw new Error(`Erro ao excluir o produto : ${response.status} - ${response.statusText}`);
            }

            const resultado = await response.json();

            if(resultado.status === "error") {
                throw new Error(`Erro ao excluir o produto : ${resultado.message}`);
            }

            //Redirect
            alert("Produto excluído!");
            
            //Atualizando a lista de produtos após a exclusão
            setProdutos((prevProdutos) => prevProdutos.filter((p) => p.id !== id));

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
                            <th>AVATAR</th>
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
                                <td><img src={p.avatar} alt={p.nome} /></td>
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