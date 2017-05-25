var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    methodOverride  = require("method-override"),
    Site            = require("../models/landingsite"),
    Comment         = require("../models/comment")

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

// COMMENT EDIT
router.get("/:commentID/edit", function(request, response){
    var siteID = request.params.id
    var commentID = request.params.commentID
    Comment.findById(commentID, function(error, foundComment) {
        if(error){
            console.log(error)
            response.redirect("/landingSites/" + siteID)
        } else {
            response.render("comments/edit", {
                siteID: siteID, 
                comment: foundComment
            })
        }
    })
})


// COMMENT UPDATE
router.put("/:commentID", function(request, response){
    var commentID = request.params.commentID
    var editComment = request.body.editComment
    Comment.findByIdAndUpdate(commentID, editComment, function(error, foundComment){
        if(error){
            console.log(error)
            response.redirect("/landingsite/" + request.params.id)
        } else {
            response.redirect("/landingsites/" + request.params.id)
        }
    })
})

module.exports = router