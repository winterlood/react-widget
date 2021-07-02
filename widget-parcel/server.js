const express = require("express");
const app = express();
const PORT = 3456;
app.use(express.static("dist/index.js"));
app.get("/index.js", (req, res) => {
    res.sendFile("./docs/index.js", { root: __dirname });
});
app.get("/index.css", (req, res) => {
    res.sendFile("./docs/index.css", { root: __dirname });
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
