if (Meteor.is_client) {

  Meteor.startup(function() {
    Meteor.call('describeInstances', function(error, instances) {
      var instances = instances.Body.DescribeInstancesResponse.reservationSet.item;
      if (!_.isArray(instances)) instances = [instances];
      Session.set('instances', instances);
    });
  });
  
  Template.instances.helpers({
    instances: function() {
      return Session.get('instances');
    }
  });
}

if (Meteor.is_server) {

  var amazon = AWSSum.load('amazon/amazon');
  var Ec2 = AWSSum.load('amazon/ec2', 'Ec2');

  // TODO This is kinda gross, need to fix DeployConfig
  DeployConfig.get('accessKeyId', function(accessKeyId) {
    DeployConfig.get('secretAccessKey', function(secretAccessKey) {

      var ec2 = new Ec2({
        'accessKeyId' : accessKeyId, 
        'secretAccessKey' : secretAccessKey,
        'region' : amazon.US_EAST_1
      });
  
      Meteor.methods({
        describeInstances: function() {
          var data = ec2.DescribeInstances();
      
          if (data.error)
            throw new Meteor.Error(500, data.error.Body.Response.Errors.Error.Message, data.error);
      
          return data;
        }
      });

    });
  });
  
}
