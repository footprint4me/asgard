// Generated by CoffeeScript 1.3.3
(function() {
  var env, mongo;

  exports.port = process.env.VMC_APP_PORT || 10080;

  exports.host = process.env.VCAP_APP_HOST || 'localhost';

  console.log('process.env.VCAP_SERVICES = ' + process.env.VCAP_SERVICES);

  if (process.env.VCAP_SERVICES) {
    env = JSON.parse(process.env.VCAP_SERVICES);
    mongo = env['mongodb-1.8'][0]['credentials'];
  } else {
    mongo = {
      'hostname': 'localhost',
      'port': 27017,
      'username': '',
      'password': '',
      'db': 'asdb'
    };
  }

  exports.mongo = mongo;

  exports.get_monog_url = function(obj) {
    if (process.env.VCAP_SERVICES) {
      return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    } else {
      return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
  };

}).call(this);
