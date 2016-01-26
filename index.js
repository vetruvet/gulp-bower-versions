/*
 * grunt-bower-versions
 * https://github.com/vetruvet/grunt-bower-versions
 *
 * Copyright (c) 2015 Valeriy Trubachev
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (options) {

  // Consts
  var PLUGIN_NAME = 'gulp-bower-versions';

  // through2 is a thin wrapper around node transform streams
  var through = require('through2');
  var gutil = require('gulp-util');
  var fs = require('fs');
  var PluginError = gutil.PluginError;

  options = options || {};
  options.variable = options.variable || false;

  var versions = {}, stream;

  var readBowerJson = function (path) {
    var bower_json = require(path);
    versions[bower_json.name] = bower_json.version;
  };

  var readVersions = function (file, enc, cb) {
    var bower_dir = 'bower_components';
    if (fs.existsSync('.bowerrc')) bower_dir = JSON.parse(fs.readFileSync('./.bowerrc')).directory || bower_dir;

    // Return if null
    if (file.isNull()) {
      stream.push(file);
      return cb();
    }

    // No stream support (yet?)
    if (file.isStream()) {
      stream.emit("error", new gutil.PluginError({
        plugin: PLUGIN_NAME,
        message: "Streaming not supported"
      }));

      return cb();
    }

    readBowerJson(file.path);

    return cb();
  };

  var generateVersions = function (cb) {
    
    var output = '';

    if (options.variable) output += 'var ' + options.variable + ' = ';
    output += JSON.stringify(versions);
    if (options.variable) output += ';';

    var file = new gutil.File({
      path: '.',
      contents: new Buffer(output)
    });

    stream.push(file);

    return cb();
  };

  stream = through.obj(readVersions, generateVersions);

  return stream;
};