var fs = require('fs');

var clearRequire = require('clear-require');
var find = require('lodash.find');
var isObject = require('amp-is-object');
var isString = require('amp-is-string');
var join = require('join-path');

module.exports = function (data, options) {
  
  options = options || {};
  var config = {};
  
  // Return object passed in
  if (isObject(data) && !Array.isArray(data)) {
    
    return pluckFirst(data, options.pluck);
  }
  
  var config = file(data, options);
  
  return pluckFirst(config, options.pluck);
};

function file (filename, options) {
  
  var config = {};
  
  // Load file
  try {
    
    // Handle config file name
    if (isString(filename)) {
      config = load(join(options.root, filename));
    }
    
    // Handle array of config file names as strings
    if (Array.isArray(filename)) {
      
      filename = find(filename, function (name) {
        
        return isString(name) && fs.existsSync(join(options.root, name));
      });
      
      
      if (filename) {
        config = load(join(options.root, filename));
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

function pluckFirst (obj, key) {
  
  if (!key) {
    return obj;
  }
  
  
  if (Array.isArray(key)) {
    key = find(key, function (k) {
      
      return obj[k];
    });
  }
  
  return (key) ? obj[key] : {};
}