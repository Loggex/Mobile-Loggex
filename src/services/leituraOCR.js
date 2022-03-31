import axios from "axios";

export const LerConteudoImagem = async (formData) => {

    let resultado

    await axios({
        method: 'POST',
        url: "https://ocr-loggex.cognitiveservices.azure.com/vision/v3.2/ocr?language=pt&detectOrientation=true&model-version=latest",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": "65679d72ba0245bbacadf9420515503d"
        }
    })

        .then(response => {
            console.debug("foi")
            resultado = FiltrarOCR(response.data)
        })

        .catch(erro =>
            console.debug(erro))

    return resultado
}

export const FiltrarOCR = (obj) => {
    let resultado

    obj.regions.forEach(region => {
        region.lines.forEach(line => {
            line.words.forEach(word => {
                if (word.text.length === 9) {
                    resultado = word.text
                }
            })
        })
    })

    return resultado;
}