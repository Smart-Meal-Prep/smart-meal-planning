require('dotenv').config();

module.exports = {
    development: {
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: "postgresql",
        port: process.env.PORT
    },
    test: {
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: "postgresql",
        port: process.env.PORT
    },
    production: {
        username: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: "postgresql",
        port: process.env.PORT
    }
};