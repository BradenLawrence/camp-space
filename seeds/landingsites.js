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
        name:        "Acidalia Planitia",
        location:    "Mars",
        img:         "http://i.imgur.com/3bHNXyl.png",
        description: "The Acidalia Planitia is where the Viking I spacecraft made the first successful landing on Mars.",
        distance:    54600000
    },
    {
        name:        "Planitia Descensus",
        location:    "Moon",
        img:         "http://i.imgur.com/aBGSfv1.jpg",
        description: "Location of the first successful landing on the Moon by the Luna 9 spacecraft in 1966. Upon landing, four petals which covered the top half of the spacecraft opened outward for increased stability. The television camera system began a photographic survey of the lunar environment. The pictures from Luna 9 were not released immediately by the Soviet authorities, but scientists at Jodrell Bank Observatory in England, which was monitoring the craft, noticed that the signal format used was identical to the internationally agreed Radiofax system used by newspapers for transmitting pictures. The Daily Express rushed a suitable receiver to the Observatory and the pictures from Luna 9 were decoded and published worldwide.",
        distance:    384400
    },
    {
        name:        "Shoemaker Point",
        location:    "Eros",
        img:         "http://i.imgur.com/LQXzPCF.jpg",
        description: "This is the spot where the NEAR-Shoemaker spacecraft touched down on Eros. It was only designed to be an orbiter, but following a series of passes near the surface, the spacecraft made a slow controlled descent to the surface of Eros ending with a touchdown just to the south of the saddle-shaped feature Himeros on February 12, 2001 at approximately 20:01 UT (3:01 p.m. EST). To the surprise of the controllers, the spacecraft was undamaged and operational after the landing at an estimated speed of 1.5 to 1.8 meters per second (thus becoming the first spacecraft to soft-land on an asteroid). After receiving an extension of antenna time on the Deep Space Network, the spacecraft's gamma-ray spectrometer was reprogrammed to collect data on Eros' composition from a vantage point about 4 inches (100 mm) from the surface where it was ten times more sensitive than when it was used in orbit.",
        distance:    218000000
    },
    {
        name:        "Hayabusa's Capture",
        location:    "Asteroid Itokawa",
        img:         "http://i.imgur.com/Prvf00R.jpg",
        description: "The vaguely peanut-shaped asteroid 25143 Itokawa is the smallest celestial object that has ever been landed on. The Hayabusa probe arrived in the vicinity of Itokawa on 12 September 2005 and initially \"parked\" in an asteroid–Sun line at 20 km (12 mi), and later 7 km (4.3 mi), from the asteroid (Itokawa's gravity was too weak to provide an orbit, so the spacecraft adjusted its orbit around the Sun until it matched the asteroid's). Hayabusa landed on 20 November for thirty minutes, but it failed to operate a device designed to collect soil samples. On 25 November, a second landing and sampling sequence was attempted. The sample capsule was returned to Earth and landed at Woomera, South Australia on 13 June 2010. The image above shows a shadow cast by the craft high above the asteroid.",
        distance:    10561600
    },
    {
        name:        "Huygens Landing",
        location:    "Titan",
        img:         "http://i.imgur.com/rNZZ1Kx.jpg",
        description: "The Huygens probe marks the furthest landing from Earth a spacecraft has ever made, as well as the only one on Saturn's moon Titan. The surface was initially reported to be a clay-like \"material which might have a thin crust followed by a region of relative uniform consistency.\" One ESA scientist compared the texture and colour of Titan's surface to a crème brûlée (that is, a hard surface covering a sticky mud like subsurface). Subsequent analysis of the data suggests that surface consistency readings were likely caused by Huygens pushing a large pebble into the ground as it landed, and that the surface is better described as a \"sand\" made of ice grains[8] or snow that has been frozen on top.[6] The images taken after the probe's landing show a flat plain covered in pebbles. The pebbles, which may be made of hydrocarbon-coated water ice, are somewhat rounded, which may indicate the action of fluids on them.[9] The rocks appear to be rounded, size-selected and size-layered as though located in the bed of a stream within a dark lakebed, which consists of finer-grained material. No pebbles larger than 15 centimeters across were spotted, while rocks smaller than 5 cm are rare on the Huygens landing site. This implies large pebbles cannot be transported to the lakebed, while small rocks are quickly removed from the surface.",
        distance:    1278688000
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