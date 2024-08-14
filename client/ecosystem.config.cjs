module.exports = {
  apps: [
    {
      name: "meal-maven-frontend",
      script: "npm run production-start",
      error_file: "./pm2-error.log",
      out_file: "./pm2-out.log",
    },
  ],
};
