import React, { useState } from "react";

import "./veia.css";

function JogoDaVeia() {
  const [matriz, setMatriz] = useState([
    [
      { id: 1, selecionado: 0 },
      { id: 2, selecionado: 0 },
      { id: 3, selecionado: 0 },
    ],
    [
      { id: 4, selecionado: 0 },
      { id: 5, selecionado: 0 },
      { id: 6, selecionado: 0 },
    ],
    [
      { id: 7, selecionado: 0 },
      { id: 8, selecionado: 0 },
      { id: 9, selecionado: 0 },
    ],
  ]);

  const [contador, setContador] = useState(1);

  const [win, setWin] = useState(0);

  function atualizaPlayer() {
    console.log("chamou o atualiza player: ", contador);
    switch (contador) {
      case 1:
        setContador(2);
        break;

      default:
        setContador(1);
        break;
    }
  }

  function atualizaClick(id) {
    console.log("chamou o atualiza click quadrado: ", id);

    setMatriz(
      matriz.map((linha) =>
        linha.map((quadrado) => {
          if (quadrado.id === id) {
            quadrado.selecionado = contador;
          }
          return quadrado;
        })
      )
    );
  }

  function verificaLinha() {
    matriz.forEach((l, idx) => {
      const selecao1 = l[0].selecionado;
      const selecao2 = l[1].selecionado;
      const selecao3 = l[2].selecionado;
      if (
        selecao1 !== 0 &&
        selecao2 !== 0 &&
        selecao3 !== 0 &&
        selecao1 === selecao2 &&
        selecao2 === selecao3
      ) {
        setWin(selecao1);
        console.log("Venceu em Linha o player: ", win);
      }
    });
  }

  function verificaVitoria(a, b, c) {
    return a !== 0 && b !== 0 && c !== 0 && a === b && b === c;
  }

  function verificaColuna() {
    matriz.forEach((l) => {
      l.forEach((el, i) => {
        const selecao1 = matriz[0][i].selecionado;
        const selecao2 = matriz[1][i].selecionado;
        const selecao3 = matriz[2][i].selecionado;
        return (
          verificaVitoria(selecao1, selecao2, selecao3) &&
          setWin(selecao1) &&
          console.log("Venceu em Linha o coluna: ", win)
        );
      });
    });
  }

  function verificaDiagEsq() {
    matriz.forEach((l) => {
      const selecao1 = matriz[0][0].selecionado;
      const selecao2 = matriz[1][1].selecionado;
      const selecao3 = matriz[2][2].selecionado;
      return (
        verificaVitoria(selecao1, selecao2, selecao3) &&
        setWin(selecao1) &&
        console.log("Venceu em Diagonal Esquerda: ", win)
      );
    });
  }

  function verificaDiagDir() {
    matriz.forEach((l, i) => {
      const selecao1 = matriz[0][2].selecionado;
      const selecao2 = matriz[1][1].selecionado;
      const selecao3 = matriz[2][0].selecionado;
      return (
        verificaVitoria(selecao1, selecao2, selecao3) &&
        setWin(selecao1) &&
        console.log("Venceu em Diagonal Direita: ", win)
      );
    });
  }

  function verificaClick(id) {
    console.log("chamou o verifica click");

    atualizaPlayer();
    atualizaClick(id);
    verificaLinha();
    verificaColuna();
    verificaDiagEsq();
    verificaDiagDir();
  }

  function Quadrado({ quadrado }) {
    const { selecionado, id } = quadrado;
    return (
      <button onClick={() => verificaClick(id)} className="quadrado">
        {selecionado === 0 ? "" : selecionado === 1 ? "❌" : "⭕"}
      </button>
    );
  }

  function Linha({ children }) {
    return <div className="linha">{children}</div>;
  }

  return (
    <div className="pagina">
      <h1>{win !== 0 ? `Player ${win} venceu!` : ""}</h1>
      <div className="tabuleiro">
        {matriz.map((linha, i) => (
          <Linha key={i}>
            {linha.map((quadrado) => (
              <Quadrado
                key={quadrado.id}
                quadrado={quadrado}
                player={{ contador, setContador }}
                jogo={{ matriz, setMatriz }}
              />
            ))}
          </Linha>
        ))}
      </div>
    </div>
  );
}

export default JogoDaVeia;
