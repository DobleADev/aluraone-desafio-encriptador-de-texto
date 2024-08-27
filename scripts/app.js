let inputElement = document.querySelector("#input");
let outputElement = document.querySelector("#output");

checkOutput();

function encrypt() {
    outputElement.innerHTML = encryptElementText(inputElement);
    checkOutput();
    // console.log("Texto encriptado");
}

function decrypt() {
    outputElement.innerHTML = DecryptElementText(inputElement);
    checkOutput();
    // console.log("Texto Desencriptado");
}

function encryptElementText(inputElement) {
    const formattedInputText = formatText(inputElement.value);
    inputElement.value = formattedInputText;
    let encryptedText = formattedInputText
        .replace(/e/gi, "enter")
        .replace(/i/gi, "imes")
        .replace(/a/gi, "ai")
        .replace(/o/gi, "ober")
        .replace(/u/gi, "ufat");
    return encryptedText;
}

function DecryptElementText(inputElement) {
    const formattedInputText = formatText(inputElement.value);
    inputElement.value = formattedInputText;
    let decryptedText = formattedInputText
        .replace(/ufat/gi, "u")
        .replace(/ober/gi, "o")
        .replace(/imes/gi, "i")
        .replace(/enter/gi, "e")
        .replace(/ai/gi, "a");
    return decryptedText;
}

function checkOutput() {
    document.querySelector('#when-empty-output').style.display = outputElement.textContent !== "" ? 'none' : 'block';
    document.querySelector('#when-theres-output').style.display = outputElement.textContent === "" ? 'none' : 'block';
}

function formatText(text) {
    // Expresión regular para eliminar caracteres que no sean letras o números
    const regex = /[^a-zA-Z0-9\s]/g;

    // Convertir a minúsculas y eliminar caracteres especiales
    return text.toLowerCase().replace(regex, '');
}

async function copyOutput() {
    try {
        await navigator.clipboard.writeText(outputElement.innerHTML);
        selectText("output");
        // console.log('Texto copiado al portapapeles');
    } catch (err) {
        console.error('Error al copiar al portapapeles: ', err);
    }
}

function selectText(nodeId) {
    const node = document.getElementById(nodeId);

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}

