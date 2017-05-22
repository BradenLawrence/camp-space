var express     = require("express"),
    router      = express.Router(),
    Site        = require("../models/landingsite")

// MIDDLEWARE
// Check if the user is logged in
function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next()
    } else {
        response.redirect("/login")
    }
}


// INDEX
router.get("/", function(request, response) {
    Site.find({}, function(error, dbResponse){
        if(error){
            console.log("Something went wrong, could not find sites.")
            console.log(error)
        } else {
            response.render("landingsites/index", {sites: dbResponse})
        }
    })
})

// NEW
router.get("/new", isLoggedIn, function(request, response) {
    response.render("landingsites/new")
})

// CREATE
router.post("/", isLoggedIn, function(request, response) {
    Site.create(request.body.site, function(error, newSite){
        if(error){
            console.log("Something went wrong, could not add site.")
            console.log(error)
        } else {
            newSite.author.id = request.user._id
            newSite.author.username = request.user.username
            newSite.save()
            response.redirect("/landingSites")
        }
    })
    
})

// SHOW
router.get("/:id", function(request, response){
    Site.findById(request.params.id).populate("comments").exec(function(error, dbSiteFound){
        if(error){
            console.log(error)
        } else {
            response.render("landingsites/show", {site: dbSiteFound})
        }
    })
})

module.exports = router