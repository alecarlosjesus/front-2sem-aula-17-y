
import type { TipoProduto } from "../../types/types";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const API_URL:string = import.meta.env.VITE_API_URL;

export default function CadProduto() {

    const navigate = useNavigate();

    const {register,handleSubmit,formState:{errors}} = useForm<TipoProduto>({defaultValues:{id:"",nome:"",preco:0,estoque:0, avatar:""},mode:"onChange"});

    const onSubmit = async (data: TipoProduto)=>{

        try {

            const payload = {
                action: "POST",
                id:"prod_" + Date.now().toString(),
                nome: data.nome,
                preco: data.preco,
                estoque: data.estoque,
                avatar: data.avatar
            }
            
            const response = await fetch(API_URL, {
                method: "POST",
                headers:{
                    "Content-Type":"text/plain;charset=UTF-8"
                },
                body: JSON.stringify(payload), redirect: "follow"
            });

            if(!response.ok){
                throw Error(`Ocorreu um erro no cadastro do produto: ${response.status} - ${response.statusText}`);
            }

            const resultado = await response.json();

            
            if(resultado.status === "error") {
                throw new Error(`Erro ao cadastrar o produto : ${resultado.message}`);
            }

            //Mensagem de sucesso
            alert("Produto cadastrado com sucesso!");

            //Redirecionamento
            navigate("/produtos");

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <h2>Cadastro de Produtos</h2>
            <div className="forms">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>Dados do Produto</legend>
                        <div>
                            <label htmlFor="nome">Nome do Produto</label>
                            <input type="text" {...register("nome", { required: "O nome do produto é obrigatório", minLength: { value: 2, message: "O nome do produto deve ter pelo menos 2 caracteres" } })} />
                            {errors.nome && <span className="error">{errors.nome.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="preco">Preço do Produto</label>
                            <input type="number" {...register("preco", { required: "O preço do produto é obrigatório", min: { value: 0, message: "O preço do produto deve ser um valor positivo" } })} />
                            {errors.preco && <span className="error">{errors.preco.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="estoque">Estoque do Produto</label>
                            <input type="number" {...register("estoque", { required: "O estoque do produto é obrigatório", min: { value: 0, message: "O estoque do produto deve ser um valor positivo" } })} />
                            {errors.estoque && <span className="error">{errors.estoque.message}</span>}
                        </div>
                           <div>
                            <label htmlFor="avatar">Avatar do Produto</label>
                            <input type="url" {...register("avatar", { required: "O avatar do produto é obrigatório" })} />
                            {errors.avatar && <span className="error">{errors.avatar.message}</span>}
                        </div>
                        <div>
                            <button type="submit">CADASTRAR</button>
                        </div>

                    </fieldset>
                </form>
            </div>
        </main>
    );

}