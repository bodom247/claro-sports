# Nativo Digital Boilerplate FrontEnd

Basic structure to start web project layout

## Tech/framework used
### Preprocessors
  - CoffeeScript
  - Sass
  - Pug
### Compiled
  - JavaScript ES5
  - CSS
  - HTML5
### Environment
  - Node JS 8.11.1
  - Gulp
  - Compass

## Installation

#### nodefront
  ```sh
$ npm -g nodefront
```

#### Pug
  ```sh
$ npm install pug
```
#### SASS
  ```sh
$ gem install -g sass
```
#### COMPASS
  ```sh
$ gem install compass
$ gem update --system
```
#### Gulp
  ```sh
$ npm install --global gulp-cli
```

#### Install dependencies
  ```sh
 $ cd project
$ npm install
```

#### Init server
  ```sh
 $ gulp compile
```
Verify the deployment by navigating to your server address in your browser.

  ```sh
 127.0.0.1:3000
```

## Directory map

    dist
    src
    config.rb
    .gitignore
    gulpfile.js
    package.json
    screenshot.png

### Compiled task
The compilation process starts in the "src" directorycand minifying final files in the directory "dist"
  - CoffeeScript -> JavaScript
  - Pug -> HTML5
  - Sass -> CSS