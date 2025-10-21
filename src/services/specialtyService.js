const db = require("../model")


let createNewSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 || !data.descriptionMarkdown || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing require Parameter!"
                })
            }
            else {
                let specialty = await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: "Ok"
                })
            }
        } catch (e) {
            reject(e)
        }
    })

}

module.exports = {
    createNewSpecialty
}