var config = require('../config.json');
var superagent = require('superagent');

module.exports = function(app) {

  console.log("registering service");
  app.get('/search/shows', function(req,res){


    superagent
    .get(config.tv.url+'/search/shows')
    .query({q: req.query.sname})
    .query({limit: 5})
    .end(function(err, response){

        res.json(response.body);
        //console.log(response.body)
    });



  });

  app.get('/details', function(req,res){


    superagent
    .get(config.tv.url+'/shows/'+req.query.q)
    .query({embed : "cast"})
    .query({limit: 5})
    .end(function(err, response){

        res.json(response.body);
        //console.log(response.body)
    });



  });


};
