const app = require("./src/app");

const serverPort = process.env.PORT || 3000;

app.listen(serverPort, () => {
  console.log("port ", serverPort, " on, be glad!");
});
