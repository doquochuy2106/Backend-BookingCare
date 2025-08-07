let getHomePage = (req, res) => {
    return res.render("homepage.ejs")
}

let getAbout = (req, res) => {
    return res.render("test/about.ejs")
}

module.exports = { getHomePage, getAbout }