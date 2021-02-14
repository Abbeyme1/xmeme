import express from "express";
import Meme from "../models/meme.js";
const router = express.Router();
import mongoose from "mongoose";
mongoose.set("useFindAndModify", false);

// DESCRIPTION  GET FIRST 100 MEMES
// ROUTE        GET /memes/

// sort will sort memes and using a '-' inside it will sort it in reverse order of specified field
router.get("/", (req, res) => {
  Meme.find()
    .limit(100)
    .sort("-createdAt")
    .then((memes) => {
      res.json({ memes });
    })
    .catch((err) => res.status(422).json({ error: "Error finding Memes" }));
});

// DESCRIPTION  FIND MEME BY ID
// ROUTE        GET /memes/:id
router.get("/:id", (req, res) => {
  Meme.findById(req.params.id)
    .then((meme) => res.status(201).json({ meme }))
    .catch((err) => res.status(422).json({ error: "Meme Not Found" }));
});

// DESCRIPTION  EDIT MEME
// ROUTE        PUT /memes/:id
router.put("/:id", (req, res) => {
  const { url, caption } = req.body;
  const { id } = req.params;

  Meme.findByIdAndUpdate(
    id,
    { $set: { caption: caption, url: url } },
    { new: true },
  )
    .then((meme) => res.status(202).json({ message: "Meme updated" }))
    .catch((err) => res.status(422).json({ error: "Failed to Update" }));
});

// DESCRIPTION  POST MEMES
// ROUTE        POST /memes/
router.post("/", (req, res) => {
  const { name, caption, url } = req.body;

  // if meme with same name/caption/url already exists
  Meme.findOne({
    $or: [{ name: name }, { caption: caption }, { url: url }],
  }).then((meme) => {
    if (meme) {
      res
        .status(409)
        .json({ error: "Payload with Name/caption/url already exits" });
    } else {
      const create = Meme.create({
        name,
        caption,
        url,
      });

      if (create) {
        res.status(201).json({ message: "Meme Created!" });
      } else {
        res.status(422).json({ error: "Error Occoured! Please Try Again" });
      }
    }
  });
});

// ADDITIONAL ROUTE
// DESCRIPTION  DELETE MEMES
// ROUTE        DELETE /memes/:id

router.delete("/:id", (req, res) => {
  Meme.findByIdAndDelete(req.params.id)
    .then((meme) => res.status(202).json({ message: "Meme Deleted" }))
    .catch((err) => res.status(422).json({ error: "Failed to Delete" }));
});

export default router;
