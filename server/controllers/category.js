// Generated by CoffeeScript 1.3.3
(function() {
  var CategoriesModel, categories_model, content;

  categories_model = require('../model/categories-model');

  CategoriesModel = categories_model.CategoriesModel;

  content = require('./content');

  exports.getcategoies = function(req, res, obj, callback) {
    var random;
    random = require('../libs/random').random;
    categories_model.once(random + '_categories_findall_success', function(result) {
      console.log('_categories_findall_success = ' + result);
      return callback(req, res, obj, result);
    });
    categories_model.once(random + '_categories_findall_error', function(err) {
      return console.log('_categories_findall_error = ' + err);
    });
    return categories_model.findAll(CategoriesModel, random);
  };

  exports.add = function(req, res) {
    var obj, random;
    console.log('req.body.catename   = ' + req.body.catename);
    console.log('req.body.catealias  = ' + req.body.catealias);
    obj = new CategoriesModel();
    obj.catename = req.body.catename;
    obj.alias = req.body.catealias;
    random = require('../libs/random').random;
    categories_model.once(random + '_categories_add_success', function(result) {
      console.log('_categories_add_success = ' + result);
      return res.redirect('/dashboard');
    });
    categories_model.once(random + '_categories_add_error', function(err) {
      return console.log('_categories_add_error = ' + err);
    });
    return categories_model.add(obj, random);
  };

  exports.edit = function(req, res) {
    var random;
    console.log('req.params.catename = ' + req.params.catename);
    random = require('../libs/random').random;
    categories_model.once(random + '_categories_findcatename_success', function(result) {
      return res.partial('back-end/category-modal', {
        category: result
      });
    });
    categories_model.once(random + '_categories_findcatename_error', function(err) {
      return console.log('_categories_findcatename_error = ' + err);
    });
    return categories_model.findCatename(CategoriesModel, req.params.catename, random);
  };

  exports.save = function(req, res) {
    var random, updates;
    console.log('req.body.catename   = ' + req.body.catename);
    console.log('req.body.orgcatename= ' + req.body.orgcatename);
    console.log('req.body.catealias  = ' + req.body.catealias);
    random = require('../libs/random').random;
    updates = {
      catename: req.body.catename,
      alias: req.body.catealias
    };
    categories_model.once(random + '_categories_save_success', function(result) {
      var conditions;
      conditions = {
        catename: req.body.orgcatename
      };
      updates = {
        catename: req.body.catename,
        catealias: req.body.catealias,
        mdate: new Date()
      };
      return content.updateCate(req, res, conditions, updates);
    });
    categories_model.once(random + '_categories_save_error', function(err) {
      return console.log('_categories_save_error = ' + err);
    });
    return categories_model.save(CategoriesModel, req.body.orgcatename, updates, random);
  };

  exports["delete"] = function(req, res) {
    var random;
    random = require('../libs/random').random;
    categories_model.once(random + '_categories_delete_success', function(result) {
      console.log('_categories_delete_success = ' + result);
      return res.partial('back-end/success');
    });
    categories_model.once(random + '_categories_delete_error', function(err) {
      return console.log('_categories_delete_error = ' + err);
    });
    return categories_model["delete"](CategoriesModel, req.params.catename, random);
  };

  exports.checkunique = function(req, res) {
    var random;
    console.log('req.params.catename = ' + req.params.catename);
    random = require('../libs/random').random;
    categories_model.once(random + '_categories_findcatename_success', function(result) {
      console.log('_categories_findcatename_success =' + result + '|');
      if (result == '' || result == null) {
        return res.partial('back-end/success');
      } else {
        return res.partial('back-end/unsuccess');
      }
    });
    categories_model.once(random + '_categories_findcatename_error', function(err) {
      return console.log('_categories_findcatename_error = ' + err);
    });
    return categories_model.findCatename(CategoriesModel, req.params.catename, random);
  };

}).call(this);
