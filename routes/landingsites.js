var express = require("express"),
    router  = express.Router(),
    Site    = require("../models/landingsite")


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
router.get("/new", function(request, response) {
    response.render("landingsites/new")
})

// CREATE
router.post("/", function(request, response) {
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