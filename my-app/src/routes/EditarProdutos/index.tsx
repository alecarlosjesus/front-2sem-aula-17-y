import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { TipoProduto } from "../../types/types";

  const API_URL: string = import.meta.env.VITE_API_URL;

export default function EditarProdutos() {

  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const [produto, setProduto] = useState<TipoProduto>({id: "", nome: "",preco: 0,estoque: 0,avatar: ""});

  useEffect(() => {
    const carregarProduto = async () => {
      try {
        const response = await fetch(`${API_URL}?id=${id}`);

        if (!response.ok) {
          throw new Error("Produto não encontrado!");
        }

        const {data,status} = await response.json();

        if (status === "error") {
          throw new Error(`Erro na busca do produto: ${status}`);
        }

        setProduto(data);

      } catch (error) {
        console.error(error);
      }
    };
    carregarProduto();
  }, []);

  const alteraDadosCampo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  }

  const onSubmit = async () => {
    try {

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify({action:"PUT", ...produto})
      });

      if (!response.ok) {
        throw new Error(`Erro ao atualizar o produto: ${response.status} - ${response.statusText}`);
      }

        const {status} = await response.json();
      
        if (status === "error") {
          throw new Error(`Erro na busca do produto: ${status}`);
        }

        alert("Produto atualizado com sucesso!");
      //Redirect
      navigate("/produtos");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h2>Editar Produtos</h2>
      <div>
        <form>
          <fieldset>
            <legend>Produto:{produto.nome}</legend>
            <div>
              <label htmlFor="nome">Nome produto:</label>
              <input type="text" name="nome" id="nome" value={produto.nome} onChange={(e) => alteraDadosCampo(e)} />
            </div>
            <div>
              <label htmlFor="estoque">Estoque:</label>
              <input type="number" name="estoque" id="estoque" value={produto.estoque} onChange={(e) => alteraDadosCampo(e)} />
            </div>
            <div>
              <label htmlFor="preco">Preço:</label>
              <input type="number" name="preco" id="preco" value={produto.preco} onChange={(e) => alteraDadosCampo(e)} />
            </div>
            <div>
              <button type="button" onClick={onSubmit}>Atualizar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
