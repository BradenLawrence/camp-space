var mongoose = require("mongoose")

var siteSchema = new mongoose.Schema({
    name:        String,
    location:    String,
    img:         String,
    description: String,
    distance:    Number,
    comments:    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})

module.exports = mongoose.model("Site", siteSchema)