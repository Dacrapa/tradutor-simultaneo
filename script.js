function startRecording() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.start();

    recognition.onresult = function(event) {
        const texto = event.results[0][0].transcript;
        document.getElementById("original").innerText = "Você disse: " + texto;
        traduzirTexto(texto);
    }
}

function traduzirTexto(texto) {
    fetch("https://api.mymemory.translated.net/get?q=" + texto + "&langpair=pt|en")
    .then(response => response.json())
    .then(data => {
        document.getElementById("traducao").innerText =
        "Tradução: " + data.responseData.translatedText;

        falarTraducao(data.responseData.translatedText);
    });
}

function falarTraducao(texto) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "en-US";
    speechSynthesis.speak(fala);
}
