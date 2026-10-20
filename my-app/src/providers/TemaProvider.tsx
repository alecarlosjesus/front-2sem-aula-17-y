import { useState } from "react";
import { TemaContext } from "../contexts/TemaContext";
import type { Tema, TipoTemaProviderProps } from "../types/types";

export function TemaProvider({ children }: TipoTemaProviderProps) {
  const [tema, setTema] = useState<Tema>("light");

  const alternarTema = () => {
    if (tema === "light") {
      setTema("dark");
    } else {
      setTema("light");
    }
  };

  return (
    <TemaContext.Provider value={{ tema, alternarTema }}>
      {children}
    </TemaContext.Provider>
  );
}
