"use strict";

require('dotenv').config;
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": null,
    "database": process.env.DB_DATABASE_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
    "logging": false,
    "timezone": "+07:00",
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};