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

#### Library dependencies (Client Libraries)

```
bower install
```

#### Image optimisation dependencies

To run optimisations over images we use imagemagik, to install we need to use brew. If you do not have brew installed you;ll need to get that

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

Now we can install imagemagick

```
brew install imagemagick
```

#### Starting grunt

We have three targets we can run ```dev```, ```dist```, ```server```.

Dev is pretty optimised but gives you source maps and does not optimise images as much as Dist. Dirstribution target is highly optimised and is production ready. Use this when building to a production server. Spinning up a simple http server you'll use the server target. It comes with live reload turned on.


This task are pretty self explanatory but for the purpose of this documentation I've listed them below:

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


#### Change log

I've got nothing.

* Updated item **(DATE)**