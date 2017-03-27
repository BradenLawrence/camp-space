var express = require("express")
var app = express()
app.set("view engine", "ejs")
app.use(express.static('assets'))

app.get("/", function(request, response) {
    response.render("home")
})

app.get("/campgrounds", function(request, response) {
    var sites = [
        {name: "Yellowknife Bay", location: "Mars", img: "img/yellowknifeBay.jpg"},
        {name: "Cupola Module", location: "International Space Station", img: "img/cupola.jpg"}, 
        {name: "Bonneville Crater", location: "Mars", img: "img/bonnevilleCrater.jpg"}, 
        {name: "Double Crater", location: "Moon", img: "img/apollo11Flag.jpg"}, 
        {name: "Huygen's Landing", location: "Titan", img: "img/huygens.jpg"}, 
    ]
    response.render("campgrounds", {sites: sites})
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("CampSpace server is running...")
})