import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  function success(response) {
    console.log("success", response);
  }
  function error(error) {
    console.log("error", error);
  }

  const config = {
    width: 720, // largura de exibição da câmera
    isDebug: false,
    token: "",
    faceapiPath:
      "https://cdn.jsdelivr.net/gh/nextcodebr/liveness-sdk-web-sample/libs/", // caminho para a faceapi e os modelos
    livenessUrlBase: "https://api-homolog.nxcd.app", // endpoint da api liveness
    livenessConfirmEndpoint: "/liveness/v3", // opcional - default: /liveness
    isShowPreview: false, // exibir um preview da foto que será enviada
    errorCallback: error, // metodo de callback em caso de erro (status !== 200)
    successCallback: success, // metodo de callback em caso de sucesso (status: 200 com isAlive = true ou false)
    brightnessControl: 0, // padrão 108 - controla a tolerancia do brilho para submeter a selfie (quanto menor o valor, maior a tolerancia e possibilidade de isAlive=false)
    luminanceControl: 0, // padrão 23 - controla a tolerancia da luminância para submeter a selfie (quanto menor o valor, maior a tolerancia e possibilidade de isAlive=false)
    ellipseStrokeStyle: "#D02780", // padrão '#D02780' - cor da elipse que encaixa o rosto - pode ser o nome da cor ou hexadecimal
    activatedEllipseStrokeStyle: "#46E3C3", // padrão '#46E3C3' - cor da elipse ao detectar o rosto - pode ser o nome da cor ou hexadecimal
    boxMessageBackgroundColor: "#D02780", // padrão '#D02780' - cor de fundo da caixa de mensagem - pode ser o nome da cor ou hexadecimal
    boxMessageTextColor: "#f3f3f5", // padrão '#f3f3f5' - cor a fonte da caixa de mensagem - pode ser o nome da cor ou hexadecimal
    configEyesBoxHeight: 100, // padrão 100 - setar a altura da caixa dos olhos em pixels (soma ou subtrai da altura padrão)
  };

  return (
    <>
      <div>
        <div id="video-wrapper"></div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            const videoWrapper = document.getElementById("video-wrapper"); // obter elemento na tela onde o liveness será injetado
            window.liveness = new Liveness(videoWrapper, config); // instancia o liveness
            window.liveness.start();
          }}
        >
          count is 123
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
