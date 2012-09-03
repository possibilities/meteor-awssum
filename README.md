# awssum

*[AwsSum](http://awssum.io/) (Amazon Web Services API lib) repackaged for Meteor*

## Example usage

    var amazon = AWSSum.load('amazon/amazon');
    var Ec2 = AWSSum.load('amazon/ec2', 'Ec2');

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

## Working example(s)

### Amazon

https://github.com/possibilities/meteor-awssum/tree/master/examples/amazon
