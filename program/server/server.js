const express = require("express");
const config = require("config");
//#region module import
const signRouter = require("./routers/sign.route");
const userRouter = require("./routers/user.route");
const itemRouter = require("./routers/item.route");
const cartRouter = require("./routers/cart.route");
const parseRouter = require("./routers/parse.route");
const ordersRouter = require("./routers/orders.route");
//#endregion

const app = express();
const PORT = config.get("port") || 5000;
app.use(express.static("db"));
app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use("/api/sign", signRouter);
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
app.use("/api/cart", cartRouter);
app.use("/api/pars", parseRouter);
app.use("/api/orders", ordersRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
