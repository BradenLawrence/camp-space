var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Site    = require("../models/landingsite"),
    Comment = require("../models/comment")

// MIDDLEWARE
// Check if the user is logged in
function isLoggedIn(request, response, next){
    if(request.isAuthenticated()){
        return next()
    } else {
        response.redirect("/login")
    }
}

// COMMENT NEW
router.get("/new", isLoggedIn, function(request, response){
    Site.findById(request.params.id, function(error, foundSite){
        if(error){
            console.log(error)
        } else {
            response.render("comments/new", {site: foundSite})
        }
    })
})

// COMMENT CREATE
router.post("/", isLoggedIn,function(request, response){
    Site.findById(request.params.id, function(error, foundSite){
        if(error){
            console.log(error)
            request.redirect("/landingsites")
        } else {
            Comment.create(request.body.comment, function(error, newComment){
                if(error){
                    console.log("Something went wrong, could not add comment.")
                    console.log(error)
                } else {
                    newComment.author.id = request.user._id
                    newComment.author.username = request.user.username
                    newComment.save()
                    foundSite.comments.push(newComment)
                    foundSite.save()
                    response.redirect("/landingsites/" + foundSite._id)
                }
            })
        }
    })
})

module.exports = router