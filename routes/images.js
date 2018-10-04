const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Image = require("../models/Image");
const fs = require("fs");

// route /api/images
router.get("/images", (req, res) => {
  Image.find()
    .then(images => {
      for (let i = 0; i < images.length; i++) {
        const element = images[i].imgPath;
        //console.log(element);
      }
      res.send({ images });
      // let img = fs.readFileSync(originalFile);
      // res.writeHead(200, { "Content-Type": "image/jpg" });
      // res.end(img, "binary");
    })
    .catch(err =>
      res.status(404).json({
        noimagesfound: "No images found"
      })
    );
});
// route /api/images/:id
router.get("/images/:id", (req, res) => {
  Image.findById(req.params.id)
    .then(image => res.json(image.toString("utf8")))
    .catch(err =>
      res.status(404).json({ noimagefound: " No image found with that ID" })
    );
});
// route /api/images/:id
router.delete("/images/:id", (req, res) => {
  //console.log(req.params);
  Image.findById(req.params.id).then(image => {
    image
      .remove()
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  });
});

module.exports = router;
