const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Rockband - Movie API",
    description: "Project 2 API",
  },
  host: "https://cse341-project2-n78x.onrender.com",
  schemes: ["https","http" ],
};

const outputFile = "./routes/swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
