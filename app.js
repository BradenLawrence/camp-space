var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Site        = require("./models/landingsite"),
    seedDB      = require("./seeds")
    
seedDB()    

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static('assets'))
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/camp-space")


// INDEX
app.get("/", function(request, response) {
    response.render("home")
})

app.get("/landingSites", function(request, response) {
    Site.find({}, function(error, dbResponse){
        if(error){
            console.log("Something went wrong, could not find sites.")
            console.log(error)
        } else {
            response.render("index", {sites: dbResponse})
        }
    })
})

// NEW
app.get("/landingSites/new", function(request, response) {
    response.render("new.ejs")
})

// CREATE
app.post("/landingSites", function(request, response) {
    var newSite = {
        name:        request.body.name,
        location:    request.body.loc,
        img:         request.body.img,
        description: request.body.desc
    }
    Site.create(newSite, function(error, newSite){
        if(error){
            console.log("Something went wrong, could not add site.")
            console.log(error)
        } else {
            response.redirect("/landingSites")
        }
    })
    
})

// SHOW
app.get("/landingSites/:id", function(request, response){
    Site.findById(request.params.id).populate("comments").exec(function(error, dbSiteFound){
        if(error){
            console.log(error)
        } else {
            console.log(dbSiteFound.comments)
            response.render("show", {site: dbSiteFound})
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("CampSpace server is running...")
})