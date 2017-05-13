var mongoose = require("mongoose")

var siteSchema = new mongoose.Schema({
    name:        String,
    location:    String,
    img:         String,
    description: String,
    comments:    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
})

module.exports = mongoose.model("Site", siteSchema)