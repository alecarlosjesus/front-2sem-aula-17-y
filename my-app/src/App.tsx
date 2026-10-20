import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/Rodape";
import { useContext } from "react";
import { Outlet } from "react-router";
import { TemaContext } from "./contexts/TemaContext";

export default function App() {
  const { tema } = useContext(TemaContext);

  return (
    <div className={`aplicacao ${tema}`}>
      <Cabecalho />

      <Outlet />

      <Rodape />
    </div>
  );
}
