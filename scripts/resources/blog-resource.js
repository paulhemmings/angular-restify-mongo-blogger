
// example of using a service to retrieve data from MongoDB

exports.initialize = function(server, services) {

  console.log('initializing BlogResource');

  // grab the services we need

  var blogService = services["BlogService"];

  // route:: add a single blog

  server.post('/blog', function(req, res, next) {
    blogService.persist(req.body).then(function(data) {
        res.send(data);
        next();
    });
  });

  // route:: get a single blog

  server.get('/blog/:id', function(req, res, next) {
    blogService.get(req.params.id).then(function(data) {
      res.send(data);
      next();
    });

  });

  // route:: get all blogs

  server.get('/blogs', function(req, res, next) {
    blogService.all().then(function(data) {
      console.log(JSON.stringify(data));
      if (data.success && data.content.length == 0) {
          blogService.persist({ title: 'test-data', content: 'test-content' });
      }
      res.send(data);
      next();
    });
  });

};
