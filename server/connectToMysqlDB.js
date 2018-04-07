/* Required for build process to handle async functions */
require('babel-polyfill');

const env = process.env.node_env;

const Sequelize = require('sequelize');
let mysql = require('mysql');
import {Config} from '../config/config'


/* Database Connection Setup */
const mysqlURL = process.env.MYSQL_URL;
let mysqlConnection ="";
if(env === "production" && mysqlURL){
  mysqlConnection = mysql.createConnection(mysqlURL);
} else {
  mysqlConnection = mysql.createConnection({user:Config.Database.user,password:Config.Database.password,port:Config.Database.options.port});
}

export let connectToMysqlDB = async function(){
  return new Promise(function(resolve, reject) {
    mysqlConnection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack);
        reject();
      }
      mysqlConnection.query(`CREATE DATABASE IF NOT EXISTS ${Config.Database.name}`, function (error, results, fields) {
        if(error && env !== "production" ){
          throw 'cant create db name'
        }
        mysqlConnection.changeUser({database:Config.Database.name}, function(err) {
          if (err && env !== "production") throw err;
        });

        if(!error){
          console.log("Sequelize authenticating");
          //db should exist now, initialize Sequelize
          let sequalizeDB = new Sequelize(
            Config.Database.name,
            Config.Database.user,
            Config.Database.password,
            Config.Database.options
          );

          sequalizeDB
          .authenticate()
          .then(() => {
            console.log('Connection has been established successfully.');
            resolve({sequalizeDB,mysqlConnection})
          })
          .catch(err => {
            console.error('Unable to connect to the database:', err);
          });
        } 
      })
    });
  });
};
