require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");

const router = require("./routes/index");
const errorHandler = require("./error/errorHandler");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(fileUpload({}));
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
