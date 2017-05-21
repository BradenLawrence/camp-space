// PACKAGES
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    expressSession      = require("express-session"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local")
    
// MODELS
var User                = require("./models/user"),
    Site                = require("./models/landingsite"),
    Comment             = require("./models/comment"),
    seedDB              = require("./seeds")
    
// ROUTES
var indexRoutes         = require("./routes/index"),
    landingsiteRoutes   = require("./routes/landingsites"),
    commentsRoutes      = require("./routes/comments"),
    authRoutes          = require("./routes/auth")
    
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

// MIDDLEWARE
// Make the current user's data available to all views
app.use(function(request, response, next){
    response.locals.currentUser = request.user
    next()
})

// ROUTE SETTINGS
app.use("/", indexRoutes)
app.use("/landingsites", landingsiteRoutes)
app.use("/landingsites/:id/comments", commentsRoutes)
app.use("/", authRoutes)









// LISTEN
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("CampSpace server is running...")
})