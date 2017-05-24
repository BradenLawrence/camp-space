var express         = require("express"),
    router          = express.Router(),
    methodOverride  = require("method-override"),
    Site            = require("../models/landingsite")




// MIDDLEWARE
// Check if the user is logged in
function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next()
    } else {
        response.redirect("back")
    }
}

// Check if the user posted a certain campground
function isSiteAuthor(request, response, next){
    if(request.isAuthenticated()){
        Site.findById(request.params.id, function(error, foundSite){
            if(error){
                console.log(error)
                response.redirect("/landingsites/" + request.params.id)
            } else {
                if(foundSite.author.id.equals(request.user._id)){
                    next()
                } else {
                    response.redirect("back")
                }
            }
        })
    } else {
        response.redirect("back")
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

// EDIT
router.get("/:id/edit", isSiteAuthor, function(request, response) {
        Site.findById(request.params.id, function(error, foundSite){
            if(error){
                response.redirect("/landingsites/" + request.params.id)
            } else {
                response.render("landingsites/edit", {site: foundSite})
            }
        })
})


// UPDATE
router.put("/:id", isSiteAuthor, function(request, response){
    Site.findByIdAndUpdate(
        request.params.id, 
        request.body.editSite, 
        function(error, updatedSite){
            if(error){
                console.log(error)
                response.redirect("/landingsites/")
            } else {
                response.redirect("/landingsites/" + request.params.id)
            }
        }
    )
})

// DESTROY
router.delete("/:id", isSiteAuthor, function(request, response){
    Site.findByIdAndRemove(request.params.id, function(error){
        if(error){
            console.log(error)
        }
        response.redirect("/landingsites")
    })
})

module.exports = router