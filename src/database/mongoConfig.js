const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://" +
  process.env.DB_USER +
  ":" +
  process.env.DB_PASSWORD +
  "@" +
  process.env.DB_HOST +
  "/" +
  process.env.DB_NAME +
  "?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Banco conectado (:");
  } catch (error) {
    console.log("Erro: ", error.message);
  }
};

console.log(MONGODB_URI);

module.exports = {
  connect,
};
