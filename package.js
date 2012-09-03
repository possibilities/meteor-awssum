Package.describe({
  summary: "AwsSum (Amazon Web Services API lib) repackaged for Meteor"
});

Package.on_use(function (api) {
  api.use('node-modules', 'server');
  api.use('underscore-string', 'server');
  
  api.add_files('server.js', 'server');
});
