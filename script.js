let recognition;

function startRecording() {

    recognition = new webkitSpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.start();

    recognition.onresult = function(event) {
        const texto = event.results[event.results.length - 1][0].transcript;

        document.getElementById("original").innerText =
        "Você disse: " + texto;

        traduzirTexto(texto);
    };

    recognition.onerror = function() {
        recognition.start(); // reinicia automaticamente
    };
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
