// PACKAGES
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    expressSession  = require("express-session"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flashmsg        = require("connect-flash")
    
// MODELS
var User    = require("./models/user"),
    Site    = require("./models/landingsite"),
    Comment = require("./models/comment")
    
// SEEDS
var seedUsers   = require("./seeds/users"),
    seedSites   = require("./seeds/landingsites")
    
// ROUTES
var indexRoutes         = require("./routes/index"),
    landingsiteRoutes   = require("./routes/landingsites"),
    commentsRoutes      = require("./routes/comments"),
    authRoutes          = require("./routes/auth")
    
// MIDDLEWARE
var middleware  = require("./middleware")

// GENERAL APP SETTINGS
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/assets"))
app.use(methodOverride("_method"))
app.use(flashmsg())

// DATABASE SETTINGS
// seedUsers()
// seedSites()
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASEURL)

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

app.use(function(request, response, next){
    // Make the current user's data available to all views
    response.locals.currentUser = request.user 
    // Pass a message variable to all views,
    // where we will store our flash messages
    response.locals.error = request.flash("error")
    response.locals.success = request.flash("success")
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