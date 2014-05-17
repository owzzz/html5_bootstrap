# HTML5 Bootstrap [![Build Status](https://travis-ci.org/owzzz/html5_bootstrap.svg)](https://travis-ci.org/owzzz/html5_bootstrap/)

####Introduction

Setting up Grunt tooling at the start of projects can be tedious and time consuming. After doing it for the millionth time I decided to create a base HTML5 bootstrap to roll projects.


#### Features

* [Auto Prefixer](https://github.com/nDmitry/grunt-autoprefixer‎)
* [SASS Compilation](https://github.com/gruntjs/grunt-contrib-sass)
* [Bower](http://bower.io/)
* [JS Browserify](http://browserify.org)
* [JS Uglify](https://github.com/gruntjs/grunt-contrib-uglify)
* [Source Maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
* [Newer](https://github.com/tschaub/grunt-newer)
* [Responsive Images](https://github.com/andismith/grunt-responsive-images)
* [Image Minification](https://github.com/gruntjs/grunt-contrib-imagemin)
* [HTML Minification](https://github.com/gruntjs/grunt-contrib-htmlmin‎)
* [Watch / Live reload](https://github.com/gruntjs/grunt-contrib-watch)
* [Jasmine](https://github.com/gruntjs/grunt-contrib-jasmine)
* [Istanbul Code Coverage](https://github.com/maenu/grunt-template-jasmine-istanbul)
* [PhantomJS](http://phantomjs.org/)
* [Assemble](http://assemble.io/)
* [YUIDocs](https://github.com/gruntjs/grunt-contrib-yuidoc)

#### Libraries

* [Normalize](http://necolas.github.io/normalize.css/)
* [Modernizr](http://modernizr.com/)

#### Requirements
Make sure your have the following installed with these versions or greater when running the bootstrap

* ```Node v0.10.26```

#### Installation

There are several hoops you may have to jump through to get all dependencies installed, but hopefully alot of this stuff will be on your machine anyway.

##### Installing Ruby dependencies

First we need to install bundler

```
gem install bundler
```

Then we need to get the rest of our ruby dependencies (Sass, Neat Bourbon)

```
bundle install
```

#### Installing Tooling dependencies (Grunt tasks, Bower)

```
npm install
```

To require libraries that are not in the commonjs format we are going to use napa to get them and wrap them for easy inclusion with browserify.

```
npm install -g napa
```

#### Library dependencies (Client Libraries)

```
bower install
```

#### Image optimisation dependencies

To run optimisations over images we use GraphicsMagick, to install we need to use brew. If you do not have brew installed you'll need to go ahead and get that setup.

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

Now we can install GraphicsMagick

```
brew install GraphicsMagick
```

#### Running Tests

To run tests we need PhantomJS and jasmine



Jasmine will come installed as part of the ```npm install``` task. PhantomJS, will need to be installed using brew, see previous step to install Brew if you don't already have it.

 ```
 brew install phantomjs
 ```

#### Starting grunt

We have four targets we can run ```dev```, ```dist```, ```server```, and ```docs```.

```dev``` is pretty optimised but gives you source maps and does not optimise images as much as ```dist```. The dist target is highly optimised and is production ready. Use this when building to a production server. Spinning up a simple http server you'll use the ```server``` target. It comes with live reload turned on. The final target ```docs``` produces a one time hit of the yui docs and places it in the dist folder. this same task will also run as part of the ```dist``` task mentioned previously.


The tasks are pretty self explanatory, but for the purpose of this documentation I've listed them below:

#### Development target

```
grunt dev
```

#### Production target

```
grunt prod
```

#### Server target

```
grunt server
```

#### Docs target

```
grunt docs
```

#### FAQ

#### Road Map

A list of upcoming features for consideration. Feel free to add feature requests.

* Sonar Integration
* Custom Yeoman Generator (AngularJS or HTML5)


#### Change log

Recent Updates to repo

* Swapped out Browserify-shim for napa (17/05/2014)
* Removed Neat and Bourbon (13/05/2014)
* Added Travis Build File (28/04/2014)
* Added Istanbul Code Coverage (28/04/2014)