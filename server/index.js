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
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(cors({ origin: "localhost://3000" }));
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
