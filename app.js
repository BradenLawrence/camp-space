var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    expressSession  = require("express-session"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    // MODELS
    User            = require("./models/user"),
    Site            = require("./models/landingsite"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds")
    
seedDB()    

// GENERAL APP SETTINGS
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/assets"))

// MONGOOSE DATABASE SETTINGS
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/camp-space")

// PASSPORT AUTHORIZATION SETTINGS
app.use(expressSession({
    secret: "Jebediah",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


// --------------------------------- //
// ============= ROUTES ============ //
// --------------------------------- //

// INDEX
app.get("/", function(request, response) {
    response.render("home")
})

app.get("/landingSites", function(request, response) {
    Site.find({}, function(error, dbResponse){
        if(error){
            console.log("Something went wrong, could not find sites.")
            console.log(error)
        } else {
            response.render("landingsites/index", {sites: dbResponse})
        }
    })
})

// NEW
app.get("/landingSites/new", function(request, response) {
    response.render("landingsites/new")
})

// CREATE
app.post("/landingSites", function(request, response) {
    var newSite = {
        name:        request.body.name,
        location:    request.body.loc,
        img:         request.body.img,
        description: request.body.desc
    }
    Site.create(newSite, function(error, newSite){
        if(error){
            console.log("Something went wrong, could not add site.")
            console.log(error)
        } else {
            response.redirect("/landingSites")
        }
    })
    
})

// SHOW
app.get("/landingSites/:id", function(request, response){
    Site.findById(request.params.id).populate("comments").exec(function(error, dbSiteFound){
        if(error){
            console.log(error)
        } else {
            console.log(dbSiteFound.comments)
            response.render("landingsites/show", {site: dbSiteFound})
        }
    })
})


// COMMENT ROUTES
// ================================//

// COMMENT NEW
app.get("/landingSites/:id/comments/new", function(request, response){
    Site.findById(request.params.id, function(error, foundSite){
        if(error){
            console.log(error)
        } else {
            response.render("comments/new", {site: foundSite})
        }
    })
})

app.post("/landingsites/:id/comments", function(request, response){
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
                    foundSite.comments.push(newComment)
                    foundSite.save()
                    response.redirect("/landingsites/" + foundSite._id)
                }
            })
        }
    })
})

// AUTHENTICATION ROUTES
// ================================//

// USER NEW
app.get("/register", function(request, response) {
    response.render("auth/register")
})

// USER CREATE
app.post("/register", function(request, response) {
    var newUser = new User({username: request.body.username})
    User.register(newUser, request.body.password, function(error, registeredUser){
        if(error){
            console.log(error)
            response.redirect("/register")
        } else {
            passport.authenticate("local")(request, response, function(){
                response.redirect("/landingsites")
            })
        }
    })
})

// USER LOGIN
app.get("/login", function(request, response) {
    response.render("auth/login")
})

app.post("/login", passport.authenticate("local", 
        {
            successRedirect: "/landingsites",
            failureRedirect: "/login"
        }), 
        function(request, response) {})


// LISTEN
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("CampSpace server is running...")
})