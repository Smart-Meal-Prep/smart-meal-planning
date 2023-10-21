const env = require('./settings.js')

module.exports = {
    development: {
        username: env.USERNAME,
        password: env.PASSWORD,
        database: env.DATABASE,
        host: env.HOST,
        dialect: "postgresql",
        port: env.PORT
    },
    test: {
        username: env.USERNAME,
        password: env.PASSWORD,
        database: env.DATABASE,
        host: env.HOST,
        dialect: "postgresql",
        port: env.PORT
    },
    production: {
        username: env.USERNAME,
        password: env.PASSWORD,
        database: env.DATABASE,
        host: env.HOST,
        dialect: "postgresql",
        port: env.PORT
    }
};