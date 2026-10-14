import quadrado from "../../img/placeholder.png";

export default function Conteudo() {
    return (
        <main>
            <h2>Conteúdo Principal</h2>
            <p>Este é o conteúdo da página.</p>
            <figure>
                <img src="https://placehold.co/600x400/1c1c1c/FFFFFF/png" alt="Exemplo de imagem" />
                <figcaption>Legenda da imagem</figcaption>
            </figure>
            <figure>
                <img src={quadrado} alt="Exemplo de imagem" />
                <figcaption>Legenda da imagem</figcaption>
            </figure>
        </main>
    );
}