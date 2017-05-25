var Site    = require("../models/landingsite"),
    Comment = require("../models/comment")

var middleware = {
    
    
isLoggedIn: function(request, response, next){
                if(request.isAuthenticated()){
                    return next()
                } else {
                    response.redirect("back")
                }
            },
                
isSiteAuthor:   function(request, response, next){
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
                },
                
isCommentAuthor:    function(request, response, next){
                        if(request.isAuthenticated()){
                            Comment.findById(request.params.commentID, function(error, foundComment){
                                if(error){
                                    console.log(error)
                                    response.redirect("back")
                                } else {
                                    if(foundComment.author.id.equals(request.user._id)){
                                        next()
                                    } else {
                                        response.redirect("back")
                                    }
                                }
                            })
                        } else {
                            response.send("back")
                        }
                    }
                    
                    
}

module.exports = middleware