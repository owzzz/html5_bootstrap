# HTML5 Bootstrap

####Introduction

Setting up Grunt tooling at the start of projects can be tedious and time consuming. After doing it for the millionth time I decided to create a base HTML5 bootstrap to roll projects.


#### Features

* Auto Prefixer
* SASS Compilation
* Bower
* JS Browserify
* JS Uglify
* Source Maps
* Newer
* Responsive Images
* Image Minification
* HTML Minification
* Watch / Live reload

#### Libraries

* [Normalize](http://necolas.github.io/normalize.css/)
* [Modernizr](http://modernizr.com/)
* [Bourbon](http://bourbon.io/docs/)
* [Neat Grids](http://neat.bourbon.io)

####Installation

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

##### Installing Tooling dependencies (Grunt tasks, Bower)

```
npm install
```

##### Library dependencies (Client Libraries)

```
bower install
```

##### Image optimisation dependencies

To run optimisations over images we use imagemagik, to install we need to use brew. If you do not have brew installed you;ll need to get that

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

Now we can install imagemagick

```
brew install imagemagick
```

##### Starting grunt

We have two targets we can run, the first applies the following:


* Linting of JS
* Concatenation of JS
* Minification of JS
* SASS compilation
* Watches for changes

This task can be run by using:

```
grunt dev
```

The second does all the above but does not run the watch and adds more optimisation:

* Image Optimisations

```
grunt prod
```



#### Change log

Bacon ipsum dolor sit amet salami ham venison bacon chicken. Filet mignon hamburger capicola ball tip swine pork belly. Shoulder strip steak chuck spare ribs kevin sirloin.

* Updated item **(DATE)**