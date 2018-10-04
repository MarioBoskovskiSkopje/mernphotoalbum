const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();
const db = require("./config/keys").mongoURI;
const Image = require("./models/Image");
const image = require("./routes/images");
const profile = require("./routes/profiles");
const cors = require("cors");
const passport = require("passport");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

function fileFilter(req, file, cb) {
  if (
    file.originalname.indexOf(".jpeg") > 0 ||
    file.originalname.indexOf(".png") > 0 ||
    file.originalname.indexOf(".jpg") > 0
  ) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.post("/api/photo", upload.single("photo"), (req, res) => {
  if (req.file) {
    const newImage = new Image();

    const pathFolder = `/uploads/${req.file.originalname}`;

    newImage.imgPath = pathFolder.toString();
    newImage.save();

    res.send("Success uploading");
  } else {
    res.send("You must choose file , or file with valid ext (png,jpeg or jpg)");
  }
});

app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/image", image);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
