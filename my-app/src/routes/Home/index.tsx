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
    <main>
      <h2>Home</h2>

      <div>
        <div>
    
          <label htmlFor="">Nome User</label>
          <input
            type="text"
            placeholder="Digite o nome a ser pesquisado"  onChange={(e)=> setDigitado(e.target.value)} />
          <button onClick={buscador}>Pesquisar</button>
    
        </div>
      </div>

      <div>{user}</div>

      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.id} - {u.login} -{" "}
            <img src={u.avatar_url} alt={u.login} width={30} />
          </li>
        ))}
      </ul>
    </main>
  );
}
