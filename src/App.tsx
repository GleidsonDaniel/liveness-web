import { useEffect, useState } from "react";
import Liveness from "./liveness/sdk/liveness";
import "./App.css";

function App() {
  const token = "648afd65f364782af271c48d:TX-fFqYj7QJeIk_cJSh_P_9-";

  const config = {
    width: 720, // largura de exibição da câmera
    isDebug: false,
    faceapiPath:
      "https://cdn.jsdelivr.net/gh/nextcodebr/liveness-sdk-web-sample/libs/", // caminho para a faceapi e os modelos
    livenessUrlBase: "https://api-homolog.nxcd.app", // endpoint da api liveness
    livenessConfirmEndpoint: "/liveness/v3", // opcional - default: /liveness
    isShowPreview: true, // exibir um preview da foto que será enviada
    errorCallback: () => {}, // metodo de callback em caso de erro (status !== 200)
    successCallback: ({ base64 }) => {
      window?.ReactNativeWebView?.postMessage(
        JSON.stringify({
          message: "image",
          data: base64,
        })
      );
    }, // metodo de callback em caso de sucesso (status: 200 com isAlive = true ou false)
    brightnessControl: 0, // padrão 108 - controla a tolerancia do brilho para submeter a selfie (quanto menor o valor, maior a tolerancia e possibilidade de isAlive=false)
    luminanceControl: 0, // padrão 23 - controla a tolerancia da luminância para submeter a selfie (quanto menor o valor, maior a tolerancia e possibilidade de isAlive=false)
    ellipseStrokeStyle: "#D02780", // padrão '#D02780' - cor da elipse que encaixa o rosto - pode ser o nome da cor ou hexadecimal
    activatedEllipseStrokeStyle: "#46E3C3", // padrão '#46E3C3' - cor da elipse ao detectar o rosto - pode ser o nome da cor ou hexadecimal
    boxMessageBackgroundColor: "#D02780", // padrão '#D02780' - cor de fundo da caixa de mensagem - pode ser o nome da cor ou hexadecimal
    boxMessageTextColor: "#f3f3f5", // padrão '#f3f3f5' - cor a fonte da caixa de mensagem - pode ser o nome da cor ou hexadecimal
    configEyesBoxHeight: 100, // padrão 100 - setar a altura da caixa dos olhos em pixels (soma ou subtrai da altura padrão)
  };

  async function getJWT(apiKey) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${apiKey}`,
      },
    };
    const endpoint = "https://api-homolog.nxcd.app/auth-jwt";
    const response = await fetch(endpoint, requestOptions);
    const token = await response.json();
    return token.accessToken;
  }

  useEffect(() => {
    (async () => {
      navigator.getUserMedia(
        { video: true },
        function (stream) {},
        (err) => console.log(err)
      );
      const jwt = await getJWT(token);
      const videoWrapper = document.getElementById("video-wrapper"); // obter elemento na tela onde o liveness será injetado
      window.liveness = new Liveness(videoWrapper, { ...config, token: jwt }); // instancia o liveness
      window.liveness.start(); // inicia o liveness
    })();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "rgb(36,36,36)",
      }}
    >
      <div id="video-wrapper"></div>
    </div>
  );
}

export default App;
