var mongoose    = require("mongoose"),
    passport    = require("passport"),
    User        = require("../models/user")


var userlist = [
        {
            username: {username: "Neil"},
            password: "1234"
        },
        {
            username: {username: "Michael"},
            password: "1234"
        },
        {
            username: {username: "Buzz"},
            password: "1234"
        }
    ]


const seedUsers = function() {
    // Remove all users
    User.remove({}, function(error){
        if(error){
            console.log(error)
        }
        // Add new users
        userlist.forEach(function(user){
            User.register(user.username, user.password, function(error, registeredUser){
                if(error){
                    console.log(error)
                } else {
                    console.log("Added " + registeredUser.username)
                }
            })
        })
    })
}

module.exports = seedUsers