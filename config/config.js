module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "codeconnect_db",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    port: 3306,
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql",
  },
};
