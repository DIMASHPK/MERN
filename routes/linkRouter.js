const { Router } = require("express");
const config = require("config");
const shortId = require("shortid");
const Link = require("../models/Link");
const router = Router();
const auth = require("../middleware/authMiddleware");
const { serverError } = require("../utils/utils");

router.use(auth);

router.post("/generate", async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const code = shortId.generate();
    const existing = await Link.findOne({ from });

    if (existing) {
      return res.send({ link: existing });
    }

    const to = baseUrl + "/t/" + code;

    const link = new Link({ code, to, from, owner: req.user.userId });

    await link.save();

    res.status(201).send(link);
  } catch (e) {
    serverError(res);
  }
});

router.get("/", async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });

    res.send(links);
  } catch (e) {
    serverError(res);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const links = await Link.findById(req.params.id);

    res.send(links);
  } catch (e) {
    serverError(res);
  }
});


module.exports = router;
