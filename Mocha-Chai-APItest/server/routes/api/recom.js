const express = require("express");
const router = express.Router();
const Itemcb = require("../../models/Itemcb");

// // @route   POST api/recom/itemcb
// // @desc    Post itemcb
// // @access  Public
//----- RETRIEVE ITEM CB INFO -------
router.post("/itemcb", (req, res) => {
  const movieId = req.body.movieId;
  Itemcb.findOne({ movieId: movieId })
    .then(itemcb => res.json(itemcb))
    .catch(err =>
      res
        .status(404)
        .json({ noItemcbFound: "This item has no itemCB info in DB" })
    );
});

module.exports = router;
