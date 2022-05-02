const express = require("express");
const config = require("config");
//#region module import
const signRouter = require("./routers/sign.route");
const userRouter = require("./routers/user.route");
const itemRouter = require("./routers/item.route");
const cartRouter = require("./routers/cart.route");
const parseRouter = require("./routers/parse.route");
//#endregion

const app = express();
const PORT = config.get("port") || 5000;
app.use(express.json({ extended: true }));
app.use("/api/sign", signRouter);
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/cart", cartRouter);
app.use("/api/pars", parseRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
