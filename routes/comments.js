var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    methodOverride  = require("method-override"),
    middleware      = require("../middleware"),
    Site            = require("../models/landingsite"),
    Comment         = require("../models/comment")

// COMMENT NEW
router.get("/new", middleware.isLoggedIn, function(request, response){
    Site.findById(request.params.id, function(error, foundSite){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. Unable to load Landing Site.")
        } else {
            response.render("comments/new", {site: foundSite})
        }
    })
})

// COMMENT CREATE
router.post("/", middleware.isLoggedIn,function(request, response){
    Site.findById(request.params.id, function(error, foundSite){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. Unable to load Landing Site.")
            request.redirect("/landingsites/" + request.params.id)
        } else {
            Comment.create(request.body.comment, function(error, newComment){
                if(error){
                    request.flash("error", "Something went wrong. Could not add comment.")
                    console.log(error)
                    request.redirect("back")
                } else {
                    newComment.author.id = request.user._id
                    newComment.author.username = request.user.username
                    newComment.save()
                    foundSite.comments.push(newComment)
                    foundSite.save()
                    request.flash("success", "Successfully posted a new comment!")
                    response.redirect("/landingsites/" + foundSite._id)
                }
            })
        }
    })
})

// COMMENT EDIT
router.get("/:commentID/edit", middleware.isCommentAuthor, function(request, response){
    var siteID = request.params.id
    var commentID = request.params.commentID
    Comment.findById(commentID, function(error, foundComment) {
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. Unable to load comment.")
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
router.put("/:commentID", middleware.isCommentAuthor, function(request, response){
    var commentID = request.params.commentID
    var editComment = request.body.editComment
    Comment.findByIdAndUpdate(commentID, editComment, function(error, foundComment){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. Unable to update comment.")
            response.redirect("/landingsite/" + request.params.id)
        } else {
            request.flash("success", "Successfully updated comment!")
            response.redirect("/landingsites/" + request.params.id)
        }
    })
})

// COMMENT DESTROY
router.delete("/:commentID", middleware.isCommentAuthor, function(request, response){
    Comment.findByIdAndRemove(request.params.commentID, function(error){
        if(error){
            console.log(error)
            request.flash("error", "Something went wrong. Unable to delete comment.")
            response.redirect("/landingsites/" + request.params.id)
        } else {
            request.flash("success", "Successfully deleted comment!")
            response.redirect("/landingsites/" + request.params.id)
        }
    })
})

module.exports = router