let Config = {}
const env = process.env.node_env;

console.log("Config env: ",env);

switch(process.env.node_env){
  case "test":
    Config.Database = {
      "name": "travelhive_test_db",
      "user": "root",
      "password": "root",
      "options": {
        "host": "localhost",
        "port": "3306",
        "dialect": "mysql",
        "logging" : false,
      },
      "environment": env
    }
    break;

    case "production":
      Config.Database = {
        "name": process.env.MYSQL_DBNAME,
        "user": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "options": {
          "host": process.env.MYSQL_HOST,
          "port": process.env.MYSQL_PORT,
          "dialect": "mysql"
        },
        "environment": env
      }
      break;

      default: /* node_env = development | null*/
      Config.Database = {
        "name": "travelhive_development_db",
        "user": "root",
        "password": "root",
        "options": {
          "host": "localhost",
          "port": "3306",
          "dialect": "mysql"
        },
        "environment": env
      }
      

}

export {Config};