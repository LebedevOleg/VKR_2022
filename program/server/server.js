const express = require("express");
const config = require("config");
//#region module import
const signRouter = require("./routers/sign.route");
const userRouter = require("./routers/user.route");
const itemRouter = require("./routers/item.route");
//#endregion

const app = express();
const PORT = config.get("port") || 5000;
app.use(express.json({ extended: true }));
app.use("/api/sign", signRouter);
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
