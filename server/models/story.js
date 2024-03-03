const mongoose = require("mongoose");

//define a story schema for the database
const StorySchema = new mongoose.Schema({
  post_id: String,
  creator_id: String,
  creator_name: String,
  content: String,
  participants: Array,
  location: String,
  img:
    {
        data: Buffer,
        contentType: String
    },
  img_id: String,
});

// compile model from schema
module.exports = mongoose.model("story", StorySchema);