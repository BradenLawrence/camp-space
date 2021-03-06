var express     = require("express"),
    router      = express.Router(),
    passport    = require("passport"),
    User        = require("../models/user")

// USER NEW
router.get("/register", function(request, response) {
    response.render("auth/register")
})

// USER CREATE
router.post("/register", function(request, response) {
    var newUser = new User({username: request.body.username})
    User.register(newUser, request.body.password, function(error, registeredUser){
        if(error){
            console.log(error)
            request.flash("error", error.message)
            response.redirect("/register")
        } else {
            passport.authenticate("local")(request, response, function(){
                var message = "Nice to meet you, " + registeredUser.username + "!"
                request.flash("success", message)
                response.redirect("/landingsites")
            })
        }
    })
})

// USER LOGIN
router.get("/login", function(request, response) {
    response.render("auth/login")
})

router.post("/login", passport.authenticate("local", 
        {
            successRedirect: "/landingsites",
            failureRedirect: "/login",
            failureFlash: true
        }), 
        function(request, response) {})

// USER LOGOUT
router.get("/logout", function(request, response) {
    request.logout()
    request.flash("success", "You have successfully logged out.")
    response.redirect("/landingsites")
})

module.exports = router