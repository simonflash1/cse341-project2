const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Rockband - Movie API",
    description: "Project 2 API with GitHub OAuth",
  },
  host: "cse341-project2-n78x.onrender.com",
  schemes: ["https", "http"],
  securityDefinitions: {
    oAuthSample: {
      type: "oauth2",
      authorizationUrl: "https://github.com/login/oauth/authorize",
      flow: "implicit",
      scopes: {
        "user:email": "Read access to user email",
      },
    },
  },
};

const outputFile = "./routes/swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
