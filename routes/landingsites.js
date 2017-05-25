var express         = require("express"),
    router          = express.Router(),
    methodOverride  = require("method-override"),
    middleware      = require("../middleware"),
    Site            = require("../models/landingsite")

// INDEX
router.get("/", function(request, response) {
    Site.find({}, function(error, dbResponse){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. Unable to load Landing Sites.")
        } else {
            response.render("landingsites/index", {sites: dbResponse})
        }
    })
})

// NEW
router.get("/new", middleware.isLoggedIn, function(request, response) {
    response.render("landingsites/new")
})

// CREATE
router.post("/", middleware.isLoggedIn, function(request, response) {
    Site.create(request.body.site, function(error, newSite){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. The Landing Site could not be created.")
        } else {
            newSite.author.id = request.user._id
            newSite.author.username = request.user.username
            newSite.save()
            request.flash("success", "Successfully created a new Landing Site!")
            response.redirect("/landingSites/" + newSite._id)
        }
    })
    
})

// SHOW
router.get("/:id", function(request, response){
    Site.findById(request.params.id).populate("comments").exec(function(error, dbSiteFound){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. The Landing Site could not be found.")
            response.redirect("/landingsites")
        } else {
            response.render("landingsites/show", {site: dbSiteFound})
        }
    })
})

// EDIT
router.get("/:id/edit", middleware.isSiteAuthor, function(request, response) {
        Site.findById(request.params.id, function(error, foundSite){
            if(error){
                console.log(error)
                request.flash("error", "Something went wrong. The Landing Site could not be found.")
                response.redirect("/landingsites/" + request.params.id)
            } else {
                response.render("landingsites/edit", {site: foundSite})
            }
        })
})


// UPDATE
router.put("/:id", middleware.isSiteAuthor, function(request, response){
    Site.findByIdAndUpdate(
        request.params.id, 
        request.body.editSite, 
        function(error, updatedSite){
            if(error){
                console.log(error)
                request.flash("error", "Something went wrong. Comment has not been updated.")
                response.redirect("/landingsites/" + request.params.id)
            } else {
                request.flash("success", "Successfully updated " + updatedSite.name + "!")
                response.redirect("/landingsites/" + request.params.id)
            }
        }
    )
})

// DESTROY
router.delete("/:id", middleware.isSiteAuthor, function(request, response){
    Site.findByIdAndRemove(request.params.id, function(error){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. The Landing Site was not deleted.")
        }
        request.flash("success", "Landing Site has been deleted.")
        response.redirect("/landingsites")
    })
})

module.exports = router