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
    const idioma = document.getElementById("idioma").value;

    fetch("https://api.mymemory.translated.net/get?q=" + texto + "&langpair=pt|" + idioma)
    .then(response => response.json())
    .then(data => {
        const traducao = data.responseData.translatedText;

        document.getElementById("traducao").innerText =
        "Tradução: " + traducao;

        falarTraducao(traducao, idioma);
    });
}

function falarTraducao(texto, idioma) {
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = idioma;
    speechSynthesis.speak(fala);
}
