import clinicService from "../services/clinicService"

let createClinic = async (req, res) => {
    try {
        console.log("check data: ", req.body)
        let response = await clinicService.createClinic(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    createClinic
}