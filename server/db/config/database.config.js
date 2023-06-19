module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "clothes_store",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "database_development",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_development",
    host: "localhost",
    dialect: "mysql",
  },
};
