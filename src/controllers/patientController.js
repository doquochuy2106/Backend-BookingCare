import patientService from "../services/patientService.js"

let postBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postBookAppointment(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error From Server!"
        })
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let response = await patientService.postVerifyBookAppointment(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server!"
        })
    }
}

module.exports = {
    postBookAppointment, postVerifyBookAppointment
}