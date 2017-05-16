var mongoose    = require("mongoose"),
    Site        = require("./models/landingsite"),
    Comment     = require("./models/comment")

var data = [
        {
            name:        "Cupola Module",
            location:    "ISS",
            img:         "http://i.imgur.com/0eT3fB5.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae dui metus. Etiam auctor facilisis elementum. Aenean in nisi ut neque ullamcorper feugiat vel quis magna. Donec lacinia fringilla ipsum, in aliquet quam accumsan nec. Donec viverra vitae diam nec interdum. Sed ut lacus at mi accumsan convallis. Nam viverra turpis ultricies mauris iaculis sollicitudin. Integer porta malesuada leo, ut tempus augue blandit dignissim. Cras auctor massa nec porta molestie. Praesent hendrerit vitae turpis eget scelerisque. Nam lacus nisi, gravida a ligula quis, vestibulum tempor risus."
        },
        {
            name:        "Yellowknife Bay",
            location:    "Mars",
            img:         "https://upload.wikimedia.org/wikipedia/commons/e/ee/Martian-outcrop_in_Yellowknife_Bay.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae dui metus. Etiam auctor facilisis elementum. Aenean in nisi ut neque ullamcorper feugiat vel quis magna. Donec lacinia fringilla ipsum, in aliquet quam accumsan nec. Donec viverra vitae diam nec interdum. Sed ut lacus at mi accumsan convallis. Nam viverra turpis ultricies mauris iaculis sollicitudin. Integer porta malesuada leo, ut tempus augue blandit dignissim. Cras auctor massa nec porta molestie. Praesent hendrerit vitae turpis eget scelerisque. Nam lacus nisi, gravida a ligula quis, vestibulum tempor risus."
        },
        {
            name:        "Tranquility Base",
            location:    "Moon",
            img:         "http://i.imgur.com/ZU9nv0l.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae dui metus. Etiam auctor facilisis elementum. Aenean in nisi ut neque ullamcorper feugiat vel quis magna. Donec lacinia fringilla ipsum, in aliquet quam accumsan nec. Donec viverra vitae diam nec interdum. Sed ut lacus at mi accumsan convallis. Nam viverra turpis ultricies mauris iaculis sollicitudin. Integer porta malesuada leo, ut tempus augue blandit dignissim. Cras auctor massa nec porta molestie. Praesent hendrerit vitae turpis eget scelerisque. Nam lacus nisi, gravida a ligula quis, vestibulum tempor risus."
        }
    ]

const seedDB = function(){
    // Remove all sites
    Site.remove({}, function(error){
        if(error){
            console.log(error)
        } else {
            console.log("Removed all landing sites.")
            // Add a few sites
            data.forEach(function(seed){
                Site.create(seed, function(error, dbSite){
                    if(error){
                        console.log(error)
                    } else {
                        console.log("Added " + seed.name)
                        // Add a comment
                        Comment.create({
                            author: "Chris",
                            text: "Five stars! Would recommend to a friend"
                        }, function(error, dbComment){
                            if(error){
                                console.log(error)
                            } else {
                                dbSite.comments.push(dbComment)
                                dbSite.save()
                                console.log(dbSite.comments)
                            }
                        })
                    }
                })
            })
        }
    })
}

module.exports = seedDB