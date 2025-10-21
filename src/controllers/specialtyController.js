import specialtyService from "../services/specialtyService"

let createNewSpecialty = async (req, res) => {
    try {
        let response = await specialtyService.createNewSpecialty(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        })
    }
}

module.exports = {
    createNewSpecialty
}