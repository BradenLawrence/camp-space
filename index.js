var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static('assets'))

var sites = [
        {name: "Yellowknife Bay", location: "Mars", img: "img/yellowknifeBay.jpg"},
        {name: "Cupola Module", location: "International Space Station", img: "img/cupola.jpg"}, 
        {name: "Bonneville Crater", location: "Mars", img: "img/bonnevilleCrater.jpg"}, 
        {name: "Double Crater", location: "Moon", img: "img/apollo11Flag.jpg"}, 
        {name: "Huygen's Landing", location: "Titan", img: "img/huygens.jpg"},
        {name: "Yellowknife Bay", location: "Mars", img: "img/yellowknifeBay.jpg"},
        {name: "Cupola Module", location: "International Space Station", img: "img/cupola.jpg"}, 
        {name: "Bonneville Crater", location: "Mars", img: "img/bonnevilleCrater.jpg"}, 
        {name: "Double Crater", location: "Moon", img: "img/apollo11Flag.jpg"}, 
        {name: "Huygen's Landing", location: "Titan", img: "img/huygens.jpg"},
        {name: "Yellowknife Bay", location: "Mars", img: "img/yellowknifeBay.jpg"},
        {name: "Cupola Module", location: "International Space Station", img: "img/cupola.jpg"}, 
        {name: "Bonneville Crater", location: "Mars", img: "img/bonnevilleCrater.jpg"}, 
        {name: "Double Crater", location: "Moon", img: "img/apollo11Flag.jpg"}, 
        {name: "Huygen's Landing", location: "Titan", img: "img/huygens.jpg"}
    ]

app.get("/", function(request, response) {
    response.render("home")
})

app.get("/landingSites", function(request, response) {
    
    response.render("landingSites", {sites: sites})
})

app.post("/landingSites", function(request, response) {
    var name = request.body.name
    var loc = request.body.loc
    var img = request.body.img
    sites.push({name: name, location: loc, img: img})
    response.redirect("/landingSites")
})

app.get("/landingSites/new", function(request, response) {
    response.render("new.ejs")
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("CampSpace server is running...")
})