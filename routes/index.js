var express = require("express"),
    router  = express.Router()

// INDEX
router.get("/", function(request, response) {
    response.render("home")
})

module.exports = router