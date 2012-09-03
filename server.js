
AWSSum = {
  load: function(moduleName, className) {

    var awssum = NodeModules.require('awssum');
    var module = awssum.load(moduleName)

    if (!className)
      return module;
    
    // Get a reference to the original interface
    var interface = awssum.load(moduleName)[className];

    _.each(interface.prototype, function(fn, name) {

      // Make sure it's a method and it conforms to the
      // awssum naming scheme
      if (!_.isFunction(fn) || (name !== _.classify(name)))
        return;

      // Wrap it!
      interface.prototype[name] = function() {

        var fut = new Future();

        // Make a copy of the arguments that's easier to work with
        var args = _.toArray(arguments);

        // If called without a callback add Future-ized callback
        if (!_.isFunction(_.last(args)))

          // Build up a callback backed by Future
          args.push(function(error, data) {

            // If there's an error set it as an attribute
            // and return it.
            // TODO can's we throw an error?
            if (error)
              data = { error: error };

            // Return the data through Future
            fut.return(data);
          });

        // Run the method with our Future-ized callback
        fn.apply(this, args);

        return fut.wait();
      };
    });

    return interface;
  }
};
