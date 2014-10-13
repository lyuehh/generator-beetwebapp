'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var AsdfwebappGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
  },

  writing: {
    app: function () {
      this.dest.mkdir('src');
      this.dest.mkdir('src/bower_components');
      this.dest.mkdir('src/app');
      this.dest.mkdir('src/app/main');
      this.dest.mkdir('src/components');
      this.dest.mkdir('src/components/navbar');

      this.dest.mkdir('test');
      this.dest.mkdir('test/e2e');
      this.dest.mkdir('test/unit');

      this.dest.mkdir('gulp');

      this.src.copy('_package.json', 'package.json');
      this.src.copy('_bower.json', 'bower.json');

      this.src.copy('gulpfile.js', 'gulpfile.js');
      this.src.copy('gulp/build.js', 'gulp/build.js');
      this.src.copy('gulp/e2e-tests.js', 'gulp/e2e-tests.js');
      this.src.copy('gulp/proxy.js', 'gulp/proxy.js');
      this.src.copy('gulp/server.js', 'gulp/server.js');
      this.src.copy('gulp/unit-tests.js', 'gulp/unit-tests.js');
      this.src.copy('gulp/watch.js', 'gulp/watch.js');
      this.src.copy('gulp/wiredep.js', 'gulp/wiredep.js');

      this.src.copy('test/karma.conf.js', 'test/karma.conf.js');
      this.src.copy('test/protractor.conf.js', 'test/protractor.conf.js');
      this.src.copy('test/e2e/main.js', 'test/e2e/main.js');
      this.src.copy('test/unit/main.js', 'test/unit/main.js');

      this.src.copy('index.html', 'src/index.html');
      this.src.copy('404.html', 'src/404.html');

      this.src.copy('app.js', 'src/app/app.js');
      this.src.copy('main/main.ctrl.js', 'src/app/main/main.ctrl.js');
      this.src.copy('main/main.scss', 'src/app/main/main.scss');
      this.src.copy('main/main.html', 'src/app/main/main.html');
      this.src.copy('main/about.html', 'src/app/main/about.html');

      this.src.copy('assets/images/angular.png', 'src/assets/images/angular.png');

      this.src.copy('components/navbar/navbar.ctrl.js', 'src/components/navbar/navbar.ctrl.js');
      this.src.copy('components/navbar/navbar.html', 'src/components/navbar/navbar.html');

    },

    projectfiles: function () {
      this.src.copy('editorconfig', '.editorconfig');
      this.src.copy('jshintrc', '.jshintrc');
      this.src.copy('bowerrc', '.bowerrc');
      this.src.copy('gitignore', '.gitignore');
    }
  },

  end: function () {
    this.installDependencies();
  }
});

module.exports = AsdfwebappGenerator;
