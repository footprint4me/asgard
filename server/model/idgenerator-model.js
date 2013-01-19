// Generated by CoffeeScript 1.3.3
(function() {
  var IdGeneratorModel, events, exports, services, vo;

  services = require('mongoose');

  vo = require('./vo/idgenerator');

  events = require('events');

  exports = module.exports = new events.EventEmitter();

  exports.IdGeneratorModel = IdGeneratorModel = services.model('c-idgenerator', vo.IdGeneratorSchema);

  exports.getNewID = function(obj, modelName, callback) {
    return obj.findOne({
      modelname: modelName
    }, function(err, doc) {
      if (doc) {
        doc.currentid += 1;
      } else {
        doc = new IdGeneratorModel();
        doc.modelname = modelName;
      }
      return doc.save(function(err) {
        if (err) {
          throw err('IdGenerator.getNewID.save() error');
        } else {
          return callback(parseInt(doc.currentid.toString()));
        }
      });
    });
  };

}).call(this);
