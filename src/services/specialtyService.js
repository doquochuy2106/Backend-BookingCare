const { reject } = require("lodash")
const db = require("../model")
const { where } = require("sequelize")


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

let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Specialty.findAll()

            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item
                })
            }

            resolve({
                errCode: 0,
                errMessage: "OK!",
                data: data
            })

        } catch (e) {
            reject(e)
        }
    })
}

let getDetailById = (inputId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing require Parameter!"
                })
            }
            else {
                let data = await db.Specialty.findOne({
                    where: { id: inputId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if (data) {
                    let doctorSpecialty = []
                    if (location === "ALL") {
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: { specialtyId: inputId },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    else {
                        //find by location
                        doctorSpecialty = await db.Doctor_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty
                }
                else {
                    data = {}
                }

                resolve({
                    errCode: 0,
                    errMessage: "ok!",
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewSpecialty, getAllSpecialty, getDetailById
}