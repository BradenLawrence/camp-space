var mongoose    = require("mongoose"),
    User        = require("../models/user"),
    Site        = require("../models/landingsite"),
    Comment     = require("../models/comment")

var mySites = [
    {
        name:        "Tranquility Base",
        location:    "Moon",
        img:         "http://i.imgur.com/ZU9nv0l.jpg",
        description: "Haven't got a passport? No problem! If you subscribe to the age old tradition of \"sticking flags on things to claim them\", this site is technically America! This is the site on the Moon where, in 1969, humans landed and walked on another celestial body for the first time. On July 20, 1969, Apollo 11 crewmembers Neil Armstrong and Buzz Aldrin landed their Apollo Lunar Module Eagle at approximately 20:17:40 UTC. Six hours later, the two astronauts exited the spacecraft and spent 2 hours 31 minutes on the lunar surface, examining and photographing it, setting up some scientific experiment packages, and collecting 47.5 pounds (21.5 kg) of dirt and rock samples for return to Earth. They lifted off the surface on July 21 at 17:54 UTC. Tranquility Base has remained unvisited since then.",
        distance:    384400
    },
    {
        name:        "Cupola Module",
        location:    "ISS",
        img:         "http://i.imgur.com/kEFE9UF.jpg",
        description: "Having trouble picking the perfect view? This beautiful loft features a rotating vista of locations all over the world! The Cupola is an ESA-built observatory module of the International Space Station (ISS). Its seven windows are used to conduct experiments, dockings and observations of Earth. It was launched aboard Space Shuttle mission STS-130 on 8 February 2010 and attached to the Tranquility (Node 3) module. With the Cupola attached, ISS assembly reached 85 percent completion. The Cupola's 80 cm (31 in) window is the largest ever used in space.",
        distance:    400
    },
    {
        name:        "Philae's Bounce",
        location:    "Comet Churyumov–Gerasimenko",
        img:         "http://i.imgur.com/4qfOKG8.jpg",
        description: "Old Faithful has nothing on this comet! This duck-shaped snowball streams a geyser of gas and dust tall enough to be seen on Earth! How tall? It's hard to say. The dusty tail never comes back down and simply spreads out as it gets further and further away. The comet loses 60kg of mass per second while the tail is active, and cracks along the \"neck\" suggest it will one day break in two. So don't wait! Churyumov–Gerasimenko was the first comet to be landed on by a spacecraft. The Rosetta spacecraft's lander, Philae, was intended to use a \"harpoon\" to secure itself against the surface of the comet. However, the harpoon failed to fire and Philae bounced awkwardly a total of three times before finally coming to rest.",
        distance:    510000000
    },
    {
        name:        "Acidalia Planitia",
        location:    "Mars",
        img:         "http://i.imgur.com/3bHNXyl.png",
        description: "Come visit the fictional home of Matt Damon in \"The Martian\", and the real home of the Viking I lander! The Acidalia Planitia is where the Viking I spacecraft made the first successful landing on Mars. The landing rockets used an 18-nozzle design to spread the hydrogen and nitrogen exhaust over a large area. NASA calculated that this approach would mean that the surface would not be heated by more than one 1°C (1.8°F), and that it would move no more than 1 millimetre (0.039 inches) of surface material. Since most of Viking's experiments focused on the surface material a more straightforward design would not have served.",
        distance:    54600000
    },
    {
        name:        "Planitia Descensus",
        location:    "Moon",
        img:         "http://i.imgur.com/aBGSfv1.jpg",
        description: "The landing site that started it all! Planitia Descensus is the location of the first successful landing on the Moon by the Luna 9 spacecraft in 1966. Upon landing, four petals which covered the top half of the spacecraft opened outward for increased stability. The television camera system began a photographic survey of the lunar environment. The pictures from Luna 9 were not released immediately by the Soviet authorities, but scientists at Jodrell Bank Observatory in England, which was monitoring the craft, noticed that the signal format used was identical to the internationally agreed Radiofax system used by newspapers for transmitting pictures. The Daily Express rushed a suitable receiver to the Observatory and the pictures from Luna 9 were decoded and published worldwide.",
        distance:    384400
    },
    {
        name:        "Shoemaker Point",
        location:    "Asteroid Eros",
        img:         "http://i.imgur.com/LQXzPCF.jpg",
        description: "Avoid the crowds on Ceres during your next trip to the asteroid belt. You'll just LOVE this quaint, out of the way campground on Eros! Watch out for speed traps though, the escape velocity is 7mph! This is the spot where the NEAR-Shoemaker spacecraft touched down on Eros. It was only designed to be an orbiter, but following a series of passes near the surface, the spacecraft made a slow controlled descent to the surface of Eros ending with a touchdown just to the south of the saddle-shaped feature Himeros on February 12, 2001 at approximately 20:01 UT (3:01 p.m. EST). To the surprise of the controllers, the spacecraft was undamaged and operational after the landing at an estimated speed of 1.5 to 1.8 meters per second (thus becoming the first spacecraft to soft-land on an asteroid). After receiving an extension of antenna time on the Deep Space Network, the spacecraft's gamma-ray spectrometer was reprogrammed to collect data on Eros' composition from a vantage point about 4 inches (100 mm) from the surface where it was ten times more sensitive than when it was used in orbit.",
        distance:    218000000
    },
    {
        name:        "Hayabusa's Capture",
        location:    "Asteroid Itokawa",
        img:         "http://i.imgur.com/Prvf00R.jpg",
        description: "Great for souvenirs! Take a piece of this space rock home with you, just like Hayabusa! The vaguely peanut-shaped asteroid Itokawa is the smallest celestial object that has ever been landed on. The Hayabusa probe arrived in the vicinity of Itokawa on 12 September 2005 and initially \"parked\" in an asteroid–Sun line at 20 km (12 mi), and later 7 km (4.3 mi), from the asteroid (Itokawa's gravity was too weak to provide an orbit, so the spacecraft adjusted its orbit around the Sun until it matched the asteroid's). Hayabusa landed on 20 November for thirty minutes, but it failed to operate a device designed to collect soil samples. On 25 November, a second landing and sampling sequence was attempted. The sample capsule was returned to Earth and landed at Woomera, South Australia on 13 June 2010. The image above shows a shadow cast by the craft high above the asteroid.",
        distance:    10561600
    },
    {
        name:        "Huygens Landing",
        location:    "Titan",
        img:         "http://i.imgur.com/rNZZ1Kx.jpg",
        description: "Leaving Earth, but still want to surf? Saturn's moon Titan has you covered with its vast ocean of liquid methane! The Huygens probe marks the furthest landing from Earth a spacecraft has ever made, as well as the only one on Titan. The surface was initially reported to be a clay-like \"material which might have a thin crust followed by a region of relative uniform consistency.\" One ESA scientist compared the texture and colour of Titan's surface to a crème brûlée (that is, a hard surface covering a sticky mud like subsurface).",
        distance:    1278688000
    }
]

const seedSites = function(){
    // Remove all sites
    Site.remove({}, function(error){
        if(error){
            console.log(error)
        } else {
            console.log("Removed all landing sites.")
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
                                console.log(randomUser + " added " + site.name)
                            }
                        })
                    })
                }
            })
        }
    })
}

module.exports = seedSites