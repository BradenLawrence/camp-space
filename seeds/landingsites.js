var mongoose    = require("mongoose"),
    User        = require("../models/user"),
    Site        = require("../models/landingsite"),
    Comment     = require("../models/comment")

var mySites = [
    {
        name:        "Tranquility Base",
        location:    "Moon",
        img:         "http://i.imgur.com/ZU9nv0l.jpg",
        description: "This is the site on the Moon where, in 1969, humans landed and walked on another celestial body for the first time. On July 20, 1969, Apollo 11 crewmembers Neil Armstrong and Buzz Aldrin landed their Apollo Lunar Module Eagle at approximately 20:17:40 UTC. Six hours later, the two astronauts exited the spacecraft and spent 2 hours 31 minutes on the lunar surface, examining and photographing it, setting up some scientific experiment packages, and collecting 47.5 pounds (21.5 kg) of dirt and rock samples for return to Earth. They lifted off the surface on July 21 at 17:54 UTC. Tranquility Base has remained unvisited since then.",
        distance:    384400
    },
    {
        name:        "Cupola Module",
        location:    "ISS",
        img:         "http://i.imgur.com/0eT3fB5.jpg",
        description: "The Cupola is an ESA-built observatory module of the International Space Station (ISS). Its seven windows are used to conduct experiments, dockings and observations of Earth. It was launched aboard Space Shuttle mission STS-130 on 8 February 2010 and attached to the Tranquility (Node 3) module. With the Cupola attached, ISS assembly reached 85 percent completion. The Cupola's 80 cm (31 in) window is the largest ever used in space.",
        distance:    400
    },
    {
        name:        "Philae's Bounce",
        location:    "Comet Churyumov–Gerasimenko",
        img:         "http://i.imgur.com/4qfOKG8.jpg",
        description: "Churyumov–Gerasimenko was the first comet to be landed on by a spacecraft. The Rosetta spacecraft's lander, Philae, was intended to use a \"harpoon\" to secure itself against the surface of the comet. However, the harpoon failed to fire and Philae bounced awkwardly a total of three times before finally coming to rest.",
        distance:    510000000
    },
    {
        name:        "Philae's Bounce",
        location:    "Comet Churyumov–Gerasimenko",
        img:         "http://i.imgur.com/4qfOKG8.jpg",
        description: "Churyumov–Gerasimenko was the first comet to be landed on by a spacecraft. The Rosetta spacecraft's lander, Philae, was intended to use a \"harpoon\" to secure itself against the surface of the comet. However, the harpoon failed to fire and Philae bounced awkwardly a total of three times before finally coming to rest.",
        distance:    510000000
    }
]

const seedSites = function(){
    // Remove all sites
    Site.remove({}, function(error){
        if(error){
            console.log(error)
        } else {
            User.find({}, function(error, foundUsers){
                if(error){
                    console.log(error)
                } else {
                    mySites.forEach(function(site){
                        var randomUser = foundUsers[Math.floor(Math.random() * foundUsers.length)]
                        Site.create(site, function(error, newSite){
                            if(error){
                                console.log(error)
                            } else {
                                newSite.author.id = randomUser._id
                                newSite.author.username = randomUser.username
                                newSite.save()
                            }
                        })
                    })
                }
            })
        }
    })
}

module.exports = seedSites