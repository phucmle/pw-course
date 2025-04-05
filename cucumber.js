module.exports = {
  default: {
    require: ["steps/*.ts"],
    paths: ["features/"],
    formatOptions: { snippetInterface: "async-await" },
    requireModule: ["ts-node/register"],
    // publishQuiet: true,
  },
};
