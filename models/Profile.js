const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  images: [
    {
      data: Buffer,
      contentType: String
    }
  ],
  password: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
