var _ = require('lodash');
var clearRequire = require('clear-require');

module.exports = function (data) {
  
  // Return object passed in
  if (_.isObject(data) && !Array.isArray(data)) {
    return data;
  }
  
  var config = file(data);
  
  return config;
};

function file (filename) {
  
  var config = {};
  
  // Load file
  try {
    
    // Handle config file name
    if (isString(filename))) {
      config = load(filename);
    }
    
    // Handle array of config file names as strings
    if (Array.isArray(filename)) {
      
      filename = _.find(filename, function (name) {
        
        return _.isString(name) && fs.existsSync(name);
      });
      
      if (filename) {
        config = load(filename);
      }
    }
  }
  catch (e) {}
  
  return config;
}

function load (filename) {
  
  clearRequire(filename);
  return require(filename);
}

function isString (str) {
  
  return typeof str === 'string';
}