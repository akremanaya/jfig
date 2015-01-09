var path = require('path');

var test = require('tape');

var fs = require('fs-extra');

var jfig = require('./index');

test('filename string', function (t) {
  
  fs.outputFileSync('.config.json', '{"key":"value"}');
  
  var config =  jfig(path.join(process.cwd(), '.config.json'));
  
  t.deepEqual(config, {key: 'value'}, 'config');
  
  fs.removeSync('.config.json');
  t.end();
});

test('object', function (t) {
  
  var config = jfig({
    type: 'object'
  });
  
  t.deepEqual(config, {type: 'object'}, 'object config')
  t.end();
});

test('empty object for missing file', function (t) {
  
  var config =  jfig(path.join(process.cwd(), '.nope.json'));
  
  t.deepEqual(config, {}, 'empty');
  t.end();
});

test('with root', function (t) {
  
  fs.outputFileSync('.config.json', '{"key":"value"}');
    
  var config =  jfig('.config.json', {
    root: process.cwd()
  });
  
  t.deepEqual(config, {key: 'value'}, 'config');
  
  fs.removeSync('.config.json');
  t.end();
});
