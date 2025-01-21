import { useState } from "react";
import "./App.css";

function App() {
  const [usuario, setUsuario] = useState("");
  const [numeroClicks, setNumeroClicks] = useState(0);

  const reqApi = async () => {
    const usuarioInfo = {
      usuario: usuario,
      numeroClicks: numeroClicks,
    };
    console.log(usuarioInfo);
    const api = await fetch("http://devopsdummycontador.apps.preprodalcaldia.medellin.gov.co", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioInfo),
    });
    console.log(api);
  };

  const reiniciarContador = () => {
    setNumeroClicks((numeroClicks) => 0);
    document.getElementById("nombre").value = ``;
  };

  const fuctions = () => {
    reqApi();
    reiniciarContador();
  };

  
  return (
    <>
      <h1>Hola Mundo</h1>
      <div className="card">
        <input
          name="nombre"
          id="nombre"
          type="text"
          onChange={(event) => setUsuario(event.target.value)}
        />
      </div>
      <div className="card">
        <button
          onClick={() => setNumeroClicks((numeroClicks) => numeroClicks + 1)}
        >
          count is {numeroClicks}
        </button>
        <button onClick={fuctions}>Guardar</button>
      </div>
    </>
  );
}

export default App;
