const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Rockband - Movie API",
    description:
      "CSE 341 - Rockband & Movie API. Provides CRUD operations for two MongoDB collections (movies and rockbands), with GitHub OAuth authentication restricting POST, PUT, and DELETE endpoints.",
    version: "1.0.0",
  },
  host: "cse341-project2-n78x.onrender.com",
  schemes: ["https"],
  tags: [
    {
      name: "Movies",
      description:
        "Endpoints to create, read, update, and delete movies. Write operations require GitHub OAuth authentication.",
    },
    {
      name: "Rockbands",
      description:
        "Endpoints to create, read, update, and delete rockbands. Write operations require GitHub OAuth authentication.",
    },
    {
      name: "Auth",
      description:
        "GitHub OAuth authentication endpoints: login, OAuth callback, logout, and session status.",
    },
  ],
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
