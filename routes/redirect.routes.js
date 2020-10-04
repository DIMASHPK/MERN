const { Router } = require("express");
const Link = require("../models/Link");
const router = Router();
const { serverError } = require("../utils/utils");

router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if(link){
        link.clicks++
        await link.save()
        return res.redirect(link.from)
    }

    res.status(404).send({message: "Ссылка не найдена"})

    res.send(links);
  } catch (e) {
    serverError(res);
  }
});

module.exports = router;
