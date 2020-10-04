const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = config.get("port") || 5000;
const mongoUri = config.get("mongoUri");

(async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
})();

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/link", require("./routes/linkRouter"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.listen(PORT, () => console.log(`app has been started on port ${PORT}`));
