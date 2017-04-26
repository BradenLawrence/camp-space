var express = require("express")
var app = express()
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static('assets'))
var mongoose = require("mongoose")
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/camp-space")

var siteSchema = new mongoose.Schema({
    name: String,
    location: String,
    img: String
})

var Site = mongoose.model("Site", siteSchema)

app.get("/", function(request, response) {
    response.render("home")
})

app.get("/landingSites", function(request, response) {
    Site.find({}, function(error, dbResponse){
        if(error){
            console.log("Something went wrong, could not find sites.")
            console.log(error)
        } else {
            response.render("landingSites", {sites: dbResponse})
            console.log(dbResponse)
        }
    })
})

app.post("/landingSites", function(request, response) {
    Site.create({
        name: request.body.name,
        location: request.body.loc,
        img: request.body.img
    }), function(error, newSite){
        if(error){
            console.log("Something went wrong, could not add site.")
            console.log(error)
        } else {
            console.log("Added new entry to Site")
            console.log(newSite)
            response.redirect("/landingSites")
        }
    }
    
})

app.get("/landingSites/new", function(request, response) {
    response.render("new.ejs")
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("CampSpace server is running...")
})