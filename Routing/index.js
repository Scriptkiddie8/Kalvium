const express = require("express");
const authRoute = require("./src/routes/authRoute");
const app = express();

app.use(express.json());

app.use("/api", authRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
