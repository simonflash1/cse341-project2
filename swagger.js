const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Rockband API",
    description: "Project 2 API",
  },
  host: "localhost:8080",
  schemes: ["http", "https"],
};

const outputFile = "./routes/swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
