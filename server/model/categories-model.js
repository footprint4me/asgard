// Generated by CoffeeScript 1.3.3
(function() {
  var CategoriesModel, events, exports, services, vo;

  services = require('mongoose');

  vo = require('./vo/categories');

  events = require('events');

  exports = module.exports = new events.EventEmitter();

  exports.CategoriesModel = CategoriesModel = services.model('c-categories', vo.CategoriesSchema);

  exports.findAll = function(obj, radom) {
    var query;
    query = obj.find({});
    query.sort('cdate', 1);
    return query.exec(function(err, categories) {
      if (!err) {
        return exports.emit(radom + '_categories_findall_success', categories);
      } else {
        return exports.emit(radom + '_categories_findall_error', err);
      }
    });
  };

  exports.findCatename = function(obj, catename, radom) {
    return obj.findOne({
      'catename': catename.toLowerCase()
    }, function(err, categories) {
      if (!err) {
        return exports.emit(radom + '_categories_findcatename_success', categories);
      } else {
        return exports.emit(radom + '_categories_findcatename_error', err);
      }
    });
  };

  exports.add = function(obj, radom) {
    return obj.save(function(err) {
      if (!err) {
        return exports.emit(radom + '_categories_add_success', null);
      } else {
        return exports.emit(radom + '_categories_add_error', err);
      }
    });
  };

  exports.save = function(obj, catename, updates, random) {
    var conditions, options;
    conditions = {
      catename: catename
    };
    updates = {
      $set: updates
    };
    options = {
      multi: true
    };
    return obj.update(conditions, updates, options, function(err) {
      if (!err) {
        return exports.emit(random + '_categories_save_success', 'succeess');
      } else {
        return exports.emit(random + '_categories_save_error', err);
      }
    });
  };

  exports["delete"] = function(obj, catename, random) {
    return obj.findOne({
      'catename': catename
    }, function(err, category) {
      if (!err) {
        category.remove();
        return category.save(function(err) {
          if (!err) {
            return exports.emit(random + '_categories_delete_success', 'succeess');
          } else {
            return exports.emit(random + '_categories_deletee_error', err);
          }
        });
      } else {
        return exports.emit(random + '_categories_delete_error', err);
      }
    });
  };

}).call(this);
