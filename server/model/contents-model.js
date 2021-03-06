// Generated by CoffeeScript 1.3.3
(function() {
  var ContentsModel, events, exports, findAll, services, vo;

  services = require('mongoose');

  vo = require('./vo/contents');

  events = require('events');

  exports = module.exports = new events.EventEmitter();

  exports.ContentsModel = ContentsModel = services.model('c-contents', vo.ContentsSchema);

  exports.count = function(obj, query, random) {
    return obj.count(query, function(err, contents) {
      if (!err) {
        return exports.emit(random + '_contents_count_success', contents);
      } else {
        return exports.emit(random + '_contents_count_error', err);
      }
    });
  };

  exports.findAll = findAll = function(obj, query, page, pagesize, random) {
    query = obj.find(query);
    query.sort('uid', 1);
    query.skip(page * pagesize - pagesize);
    query.limit(pagesize);
    return query.exec(function(err, contents) {
      if (!err) {
        return exports.emit(random + '_contents_findall_success', contents);
      } else {
        return exports.emit(random + '_contents_findall_error', err);
      }
    });
  };

  exports.findURL = function(obj, url, random) {
    return obj.findOne({
      'url': url
    }, function(err, contents) {
      if (!err) {
        return exports.emit(random + '_contents_findurl_success', contents);
      } else {
        return exports.emit(random + '_contents_findurl_error', err);
      }
    });
  };

  exports.countCatename = function(obj, catename, random) {
    return obj.find({
      'catename': catename
    }, function(err, contents) {
      if (!err) {
        return exports.emit(random + '_contents_countcatename_success', contents.length);
      } else {
        return exports.emit(random + '_contents_countcatename_error', err);
      }
    });
  };

  exports.countOperator = function(obj, operator, random) {
    return obj.find({
      'username': operator
    }, function(err, contents) {
      if (!err) {
        console.log('operator = ' + operator);
        return exports.emit(random + '_contents_countoperator_success', contents.length);
      } else {
        return exports.emit(random + '_contents_countoperator_error', err);
      }
    });
  };

  exports.add = function(obj, random) {
    return obj.save(function(err) {
      if (!err) {
        return exports.emit(random + '_contents_save_success', 'succeess');
      } else {
        return exports.emit(random + '_contents_save_error', err);
      }
    });
  };

  exports.edit = function(obj, uid, random) {
    return obj.findOne({
      'uid': uid
    }, function(err, content) {
      if (!err) {
        return exports.emit(random + '_contents_edit_success', content);
      } else {
        return exports.emit(random + '_contents_edit_error', err);
      }
    });
  };

  exports.save = function(obj, conditions, updates, random) {
    var options;
    updates = {
      $set: updates
    };
    options = {
      multi: true
    };
    return obj.update(conditions, updates, options, function(err) {
      if (!err) {
        return exports.emit(random + '_contents_update_success', 'succeess');
      } else {
        return exports.emit(random + '_contents_update_error', err);
      }
    });
  };

  exports["delete"] = function(obj, uid, random) {
    return obj.findOne({
      'uid': uid
    }, function(err, content) {
      if (!err) {
        content.remove();
        return content.save(function(err) {
          if (!err) {
            return exports.emit(random + '_contents_delete_success', 'succeess');
          } else {
            return exports.emit(random + '_contents_delete_error', err);
          }
        });
      } else {
        return exports.emit(random + '_contents_delete_error', err);
      }
    });
  };

  exports.searchCount = function(obj, query, random) {
    return obj.find(query, function(err, contents) {
      if (!err) {
        return exports.emit(random + '_contents_searchcount_success', contents.length);
      } else {
        return exports.emit(random + '_contents_searchcount_error', err);
      }
    });
  };

}).call(this);
