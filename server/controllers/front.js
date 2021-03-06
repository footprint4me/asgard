// Generated by CoffeeScript 1.3.3
(function() {
  var ContentsModel, category, catename, contents_model, getCategoiesHandler, getpagination, operator, pagesize, pagination, search, state;

  pagination = require('node-pagination');

  contents_model = require('../model/contents-model');

  ContentsModel = contents_model.ContentsModel;

  category = require('./category');

  pagesize = 5;

  catename = null;

  operator = null;

  search = null;

  state = null;

  exports.articles = function(req, res) {
    var pageno, random;
    random = require('../libs/random').random;
    console.log('req.params.page = ' + req.params.page);
    pageno = req.params.page != undefined ? req.params.page : 1;
    state = 'index';
    contents_model.once(random + '_contents_count_success', function(result) {
      console.log('-- _contents_count_success --');
      if (result === 0) {
        return res.redirect('/setup');
      } else {
        return getpagination(req, res, result, pageno);
      }
    });
    contents_model.once(random + '_contents_count_error', function(err) {
      return console.log('_contents_count_error = ' + err);
    });
    return contents_model.count(ContentsModel, {}, random);
  };

  exports.category = function(req, res) {
    var pageno, random;
    random = require('../libs/random').random;
    state = 'category';
    catename = req.params.catename != undefined ? req.params.catename : res.redirect('/');
    console.log('catename =========== ' + catename);
    pageno = req.params.page != undefined ? req.params.page : 1;
    console.log('pageno ============= ' + pageno);
    contents_model.once(random + '_contents_countcatename_success', function(result) {
      console.log('_contents_countcatename_success =' + result + '|');
      return getpagination(req, res, result, pageno);
    });
    contents_model.once(random + '_contents_countcatename_error', function(err) {
      return console.log('_contents_countcatename_error = ' + err);
    });
    return contents_model.countCatename(ContentsModel, catename, random);
  };

  exports.operator = function(req, res) {
    var pageno, random;
    random = require('../libs/random').random;
    state = 'operator';
    operator = req.params.operator != undefined ? req.params.operator : res.redirect('/');
    console.log('operator =========== ' + operator);
    pageno = req.params.page != undefined ? req.params.page : 1;
    console.log('pageno ============= ' + pageno);
    contents_model.once(random + '_contents_countoperator_success', function(result) {
      console.log('_contents_countoperator_success =' + result + '|');
      return getpagination(req, res, result, pageno);
    });
    contents_model.once(random + '_contents_countoperator_error', function(err) {
      return console.log('_contents_countoperator_error = ' + err);
    });
    return contents_model.countOperator(ContentsModel, operator, random);
  };

  getpagination = function(req, res, total, pageno) {
    var pv, query, random, re;
    random = require('../libs/random').random;
    pv = pagination.build(total, pageno, pagesize, 0, pagesize);
    contents_model.once(random + '_contents_findall_success', function(result) {
      var obj;
      obj = {
        contents: result,
        pv: pv
      };
      return category.getcategoies(req, res, obj, getCategoiesHandler);
    });
    contents_model.once(random + '_contents_findall_error', function(err) {
      return console.log('_contents_findall_error = ' + err);
    });
    if (state === 'index') {
      query = {};
    } else if (state === 'category') {
      query = {
        catename: catename
      };
    } else if (state === 'operator') {
      query = {
        username: operator
      };
    } else if (state === 'search') {
      re = new RegExp(search, 'i');
      query = {
        '$or': [
          {
            'title': re
          }, {
            'content': re
          }
        ]
      };
    }
    return contents_model.findAll(ContentsModel, query, pageno, pagesize, random);
  };

  exports.search = function(req, res) {
    var pageno, query, random, re;
    random = require('../libs/random').random;
    state = 'search';
    console.log('req.body.key = ' + req.body.key);
    if (req.body.key == undefined && search == null) {
      res.redirect('/');
    }
    search = req.body.key    != undefined ? req.body.key : search;
    console.log('search ============= ' + search);
    pageno = req.params.page != undefined ? req.params.page : 1;
    console.log('pageno ============= ' + pageno);
    contents_model.once(random + '_contents_searchcount_success', function(result) {
      console.log('-- _contents_searchcount_success --' + result);
      if (result > 0) {
        return getpagination(req, res, result, pageno);
      } else {
        return res.redirect('/');
      }
    });
    contents_model.once(random + '_contents_searchcount_error', function(err) {
      return console.log('_contents_searchcount_error = ' + err);
    });
    re = new RegExp(search, 'i');
    query = {
      '$or': [
        {
          'title': re
        }, {
          'content': re
        }
      ]
    };
    return contents_model.searchCount(ContentsModel, query, random);
  };

  exports.detail = function(req, res) {
    var random, url;
    random = require('../libs/random').random;
    state = 'detail';
    url = req.params.url != undefined ? req.params.url : res.redirect('/');
    contents_model.once(random + '_contents_findurl_success', function(result) {
      var obj;
      console.log('_contents_findurl_success =' + result + '|');
      obj = {
        contents: result,
        pv: null
      };
      return category.getcategoies(req, res, obj, getCategoiesHandler);
    });
    contents_model.once(random + '_contents_findurl_error', function(err) {
      return console.log('_contents_findurl_error = ' + err);
    });
    return contents_model.findURL(ContentsModel, url, random);
  };

  getCategoiesHandler = function(req, res, obj, result) {
    var prefix, ua;
    console.log('-- req.headers -- ' + req.headers['user-agent']);
    ua = req.headers['user-agent'];
    if (ua.search(/iPod/) === -1 && ua.search(/iPhone/) === -1 && ua.search(/iPad/) === -1 && ua.search(/Kindle/) === -1 && ua.search(/Android/) === -1 && ua.search(/Opera Mini/) === -1 && ua.search(/BlackBerry/) === -1 && ua.search(/webOS/) === -1 && ua.search(/UCWEB/) === -1 && ua.search(/Blazer/) === -1 && ua.search(/PSP/) === -1 && ua.search(/IEMobile/) === -1) {
      prefix = 'front-end/desktop';
    } else {
      prefix = 'front-end/mobile';
    }
    console.log('prefix = ' + prefix);
    if (state !== 'detail') {
      return res.render(prefix + '/index', {
        contents: obj.contents,
        pv: obj.pv,
        categories: result,
        state: state
      });
    } else {
      return res.render(prefix + '/detail', {
        content: obj.contents,
        categories: result
      });
    }
  };

}).call(this);
