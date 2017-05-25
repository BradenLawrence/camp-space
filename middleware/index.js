var Site    = require("../models/landingsite"),
    Comment = require("../models/comment")

var middleware = {
    
    
isLoggedIn: function(request, response, next){
                if(request.isAuthenticated()){
                    return next()
                } else {
                    request.flash("error", "You must be logged in to do that.")
                    response.redirect("/login")
                }
            },
                
isSiteAuthor:   function(request, response, next){
                    if(request.isAuthenticated()){
                        Site.findById(request.params.id, function(error, foundSite){
                            if(error){
                                console.log(error)
                                request.flash("error", "Error accessing landing site, please try again.")
                                response.redirect("back")
                            } else {
                                if(foundSite.author.id.equals(request.user._id)){
                                    next()
                                } else {
                                    request.flash("error", "Only the person who posted this Landing Site may do that.")
                                    response.redirect("/landingsites/" + request.params.id)
                                }
                            }
                        })
                    } else {
                        request.flash("error", "You must be logged in to do that.")
                        response.redirect("/login")
                    }
                },
                
isCommentAuthor:    function(request, response, next){
                        if(request.isAuthenticated()){
                            Comment.findById(request.params.commentID, function(error, foundComment){
                                if(error){
                                    console.log(error)
                                    request.flash("error", "There was an error accessing that comment, please try again.")
                                    response.redirect("/landingsites" + request.params.id)
                                } else {
                                    if(foundComment.author.id.equals(request.user._id)){
                                        next()
                                    } else {
                                        request.flash("error", "Only the comment's author may do that.")
                                        response.redirect("back")
                                    }
                                }
                            })
                        } else {
                            request.flash("error", "You must be logged in to do that.")
                            response.redirect("/login")
                        }
                    }
                    
                    
}

module.exports = middleware