import db from "../model/index"

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error)
    }

}

let getAbout = (req, res) => {
    return res.render("test/about.ejs")
}

module.exports = { getHomePage, getAbout }