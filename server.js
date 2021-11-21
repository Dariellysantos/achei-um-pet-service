const app = require("./src/app");

const serverPort = process.env.APP_PORT || 3000;

app.listen(serverPort, () => {
  console.log("port ", serverPort, " on, be glad!");
});
