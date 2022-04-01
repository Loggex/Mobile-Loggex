import * as FileSystem from 'expo-file-system';

export const LerConteudoImagem = async (foto) => {
    const options = {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'file',
        headers: {
            "Content-Type": "multipart/form-data",
            "Ocp-Apim-Subscription-Key": "65679d72ba0245bbacadf9420515503d"
        }
    }

    // let resultado 

    const response = await FileSystem.uploadAsync("https://ocr-loggex.cognitiveservices.azure.com/vision/v3.2/ocr?language=pt&detectOrientation=true&model-version=latest", foto.uri, options)
    return response.json()
     
    
    // return resultado
}

export const FiltrarOCR = (obj) => {
    let result

    obj.regions.forEach(region => {
        region.lines.forEach(line => {
            line.words.forEach(word => {
                if (word.text.length === 7) {
                    result = word.text
                }
            })
        })
    })

    return result;
}