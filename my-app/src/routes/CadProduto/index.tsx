import { useState, type ChangeEvent } from "react";
import type { TipoProduto } from "../../types/types";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
const API_URL: string = import.meta.env.VITE_API_URL;

export default function CadProduto() {


    const navigate = useNavigate();

    const[lendoImagem,setLendoImagem] = useState<boolean>(false);


    const{register,handleSubmit,setValue,watch, formState:{errors, isSubmitting}} = useForm<TipoProduto>({defaultValues:{id:"",nome:"",preco:0,estoque:0, avatar:""},mode:"onChange"})

    const imagem = watch("avatar");

    const selecionarImagem = (event:ChangeEvent<HTMLInputElement>)=>{
        //Recuperando a lista de arquivos selecionados
        const arquivo =  event.target.files?.[0];

        //Verificando se algum arquivo foi selecionado
        if(!arquivo) return;

        //Verificando se o arquivo selecionado é uma imagem
        if(!arquivo.type.startsWith("image/")){
            alert("Selecione um arquivo de imagem válido (PNG, JPG, JPEG, WEBP)!");
            event.target.value = "";
            return;
        }

        //Verificando o tamanho do arquivo (limite 35KB)
        if(arquivo.size > 35 * 1024){
            alert("O arquivo selecionado excede o tamanho máximo permitido (35KB)!");
            event.target.value = "";
            return;
        }

        //Lendo o arquivo selecionado como base64
        const leitor = new FileReader();
        setLendoImagem(true);
        leitor.onload = ()=>{
            if(typeof leitor.result === "string"){
                setValue("avatar",leitor.result,{shouldDirty:true,shouldValidate:true});
            }
            setLendoImagem(false);
        }

        leitor.onerror = ()=>{
            alert("Erro ao ler o arquivo de imagem!");
            setLendoImagem(false);
        }

        leitor.readAsDataURL(arquivo);
    }

    const onSubmit = async (data:TipoProduto)=>{
        try {
            if(lendoImagem){
                alert("Aguarde a leitura da imagem antes de enviar o formulário!");
                return;
            }

            if(!data.avatar){
                alert("Selecione uma imagem para o produto!");
                return;
            }

            //Monta o payload com a ação e POST para a Apps Script
            const payload = {
                action: "POST",
                id:"prod_" + Date.now().toString(),
                nome: data.nome,
                preco: Number(data.preco),
                estoque: Number(data.estoque),
                avatar: data.avatar
            };

            //Envia o payload JSON para a planilha do Google
            const response = await fetch(API_URL, {
                method: "POST",
                headers:{
                    //text/plain;charset=utf-8 evita OPTIONS preflight request CORS
                    "Content-Type":"text/plain;charset=utf-8"
                },
                body: JSON.stringify(payload),
                redirect: "follow", //Evita problemas de CORS com redirecionamento
            });

            if(!response.ok){
                throw Error(`Ocorreu um erro no cadastro do produto: ${response.status} - ${response.statusText}`);
            }

            const resultado = await response.json();

            if(resultado.status === "error"){
                throw Error(`Ocorreu um erro no cadastro do produto: ${resultado.status} - ${resultado.statusText}`);
            }

            //Mensagem de sucesso
            alert("Produto cadastrado com sucesso!");

            //Redirecionamento
            navigate("/produtos");

        } catch (error) {
            console.error(error);
        }
    }

    // const[produto,setProduto] = useState<TipoProduto>({id:"",nome:"",preco:0,estoque:0, avatar:""});

    // const handlePost = async ()=>{
    //     try {
             
    //         // const response = await fetch("http://localhost:3001/produtos/", {
    //         const response = await fetch(API_URL, {
    //             method: "POST",
    //             headers:{
    //                 "Content-Type":"text/plain;charset=utf-8",
    //             },
    //             body: JSON.stringify({...produto, action: "POST"})
    //         });

    //         if(!response.ok){
    //             throw Error(`Ocorreu um erro no cadastro do produto: ${response.status} - ${response.statusText}`);
    //         }

    //         const resultado = await response.json();

    //         if(resultado.status === "error"){
    //             throw Error(`Ocorreu um erro no cadastro do produto: ${resultado.status} - ${resultado.statusText}`);
    //         }

    //         //Mensagem de sucesso
    //         alert("Produto cadastrado com sucesso!");

    //         //Redirecionamento
    //         navigate("/produtos");

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    return (
        <main className="pagina pagina-formulario">
            <div className="titulo-pagina">
                <p>Novo registro</p>
                <h2>Cadastro de produto</h2>
            </div>
            <div className="forms">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <legend>Dados do produto</legend>
                        <div className="campo-formulario">
                            <label htmlFor="nome">Nome do Produto</label>
                            <input id="nome" type="text" {...register("nome", { required: "O nome do produto é obrigatório", minLength: { value: 2, message: "O nome do produto deve ter pelo menos 2 caracteres" } })} />
                            {errors.nome?.message && <span className="mensagem-erro">{errors.nome.message}</span>}
                        </div>
                        <div className="campo-formulario">
                            <label htmlFor="preco">Preço do Produto</label>
                            <input type="number" step={0.1} id="preco" {...register("preco", { valueAsNumber: true, required: "O preço é obrigatório", min:{ value: 1, message: "O preço do produto deve ser um número positivo" } })} />
                            {errors.preco?.message && <span className="mensagem-erro">{errors.preco.message}</span>}
                        </div>
                        <div className="campo-formulario">
                            <label htmlFor="estoque">Estoque do Produto</label>
                            <input type="number" step={1} id="estoque" {...register("estoque", { valueAsNumber: true, required: "O estoque é obrigatório", min: { value: 0, message: "O estoque do produto deve ser um número não negativo" } })} />
                            {errors.estoque?.message && <span className="mensagem-erro">{errors.estoque.message}</span>}
                        </div>
                        <div className="campo-formulario">
                            <div>
  <label htmlFor="arquivoImg">Avatar Produto: </label>
  <input
    type="file"
    id="arquivoImg"
    accept="image/*"
    onChange={selecionarImagem}
    disabled={lendoImagem}
  />
  <input type="hidden" {...register("avatar")} />
  {lendoImagem && (
    <p className="mensagem-leitura">
      Lendo e convertendo imagem...
    </p>
  )}

  {imagem && (
    <div className="preview">
      <p>
        Prévia da Imagem:
      </p>
      <img
        src={imagem}
        alt="Previa da imagem"
      />
    </div>
  )}
</div>
                        </div>
                        <div>
                            <button type="submit" disabled={isSubmitting || lendoImagem}>
                                {isSubmitting ? "CADASTRANDO..." : "CADASTRAR"}
                            </button>
                        </div>

                    </fieldset>
                </form>
            </div>
        </main>
    );

}
