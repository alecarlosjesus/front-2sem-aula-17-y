import { useEffect, useState } from "react";

export default function Home() {
  type TipoUserGit = {
    login: string;
    id: number;
    avatar_url: string;
  };

  const [usuarios, setUsuarios] = useState<TipoUserGit[]>([]);

  useEffect(() => {
    async function loadingData() {
      try {
        const response = await fetch("https://api.github.com/users");
        if (!response.ok) {
          throw new Error("O carregamento da lista de usuários falhou!");
        }

        const data: TipoUserGit[] = await response.json();

        setUsuarios(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadingData();
  }, []);

  const [user, setUser] = useState<string>("");
  const [digitado, setDigitado] = useState<string>("");

  const buscador = async () => {
    
    const response = await fetch(`https://api.github.com/users/${digitado}`);

    try{
    if (!response.ok) {
      throw new Error("O carregamento da lista de usuários falhou!");
    }

    const data: TipoUserGit = await response.json();

    setUser(data.login);

      } catch (error) {
        console.error(error);
      }
    
  };

  return (
    <main className="pagina home">
      <div className="titulo-pagina">
        <p>Consulta de usuários</p>
        <h2>GitHub Users</h2>
      </div>

      <section className="painel pesquisa" aria-labelledby="titulo-pesquisa">
        <div>
          <h3 id="titulo-pesquisa">Pesquisar usuário do GitHub</h3>
          <p>Informe um nome de usuário para realizar a consulta.</p>
        </div>

        <div className="campo-pesquisa">
          <label htmlFor="nomeUser">Nome do usuário</label>
          <input
            id="nomeUser"
            type="text"
            placeholder="Ex.: octocat"
            onChange={(e)=> setDigitado(e.target.value)}
          />
          <button type="button" onClick={buscador}>Pesquisar</button>
        </div>
      </section>

      {user && (
        <p className="resultado-pesquisa">
          Usuário encontrado: <strong>{user}</strong>
        </p>
      )}

      <ul className="grade-usuarios">
        {usuarios.map((u) => (
          <li className="card-usuario" key={u.id}>
            <img src={u.avatar_url} alt={`Avatar de ${u.login}`} />
            <div>
              <strong>{u.login}</strong>
              <span>ID: {u.id}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
