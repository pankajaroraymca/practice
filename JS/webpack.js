// -------------------------------------- why there was a need for webpac -------------------------------------------

// In Initial Days, there was a single script file and it was imported in html file. But there was a problem, debugging and managing code was a challenge
// Then one js file was divided into multiple mini js files, each with their logins like main.js, payment.js, admin.js etc. And then all these files were included in their respective html files.
// It was still harder to manage because the order of scripts should be correct unless application will break. Also browser will request multiple times for multiple scripts and other assets also.

// So webpack came. Now What is Webpack

// In Js, each file is treated as a module. 
// Webpack bundles these files into a single file or mutiple chunks which browser can understand because modern webapps are complex.
// Finally browser only load these chunks or a single bundle.js file.

// It not only bundles, but transform and optimized project files
// This bundle or chunks is optimized in many ways: 
// 1) Minify code → smaller bundles.
// 2) Tree-shaking → remove unused code.
// 3) Code splitting → load only what’s needed (faster initial load).
// 4) Lazy loading → load parts of app on demand.

// Webpack takes the entry point file, and will resolve the dependecies to form a single bundle.js or multiple chunks.

// Step:
// 1) Install webpack and webpack-cli
// 2) make a webpack config file

const path = require("path");

module.exports = {
  // 1. Entry point (where webpack starts building dependency graph)
  entry: "./src/index.js",

  // 2. Output (where bundled files go)
  output: {
    filename: "bundle.js",                 // final bundled file
    path: path.resolve(__dirname, "dist"), // absolute path required
    clean: true,                           // clears old files in dist/
  },

  // 3. Mode: 'development' | 'production'
  mode: "development",
};

// build: "webpack"
// npm run build

// This is a basic webpack config file, it will only bundle js files. if you try to include css or images, you will get error.
// To support images and css files, you need to configure loaders and plugins which we will discuss shortly.

// Now there will be bundle.js file in dist folder. INclude this script in your html file, now broser will request only single file.
// Afcourse you will be importing another files dependecies in your index.js with require or import. Webpack will take care of dependecies

// --------------------------------------------------Loaders ------------------------------------------------------------------

// Now to support images, we have to configure loaders. Loaders will basically transpile the images and also resolve the dependecy graph of assets like images
// loaders handle transformations of specific file types (like converting SCSS → CSS or JSX → JS)
// to do this we have to make some changes in config file

module.exports = {
    // 1. Entry point (where webpack starts building dependency graph)
    entry: "./src/index.js",
  
    // 2. Output (where bundled files go)
    output: {
      filename: "bundle.js",                 // final bundled file
      path: path.resolve(__dirname, "dist"), // absolute path required
      assetModuleFilename: "asset/[hash][ext]", // where the asset files will be stored
      clean: true,                           // clears old files in dist/
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i, // different formats of images to consider
                type: "asset/resource", // loader name
            }
        ]
       
      },

    // 3. Mode: 'development' | 'production'
    mode: "development",
  };

  // Now to support css files, we need configure more loaders, they are not included in the webpack. we have to install them separtely
  // npm i css-loader style-loader

  module.exports = {
    // 1. Entry point (where webpack starts building dependency graph)
    entry: "./src/index.js",
  
    // 2. Output (where bundled files go)
    output: {
      filename: "bundle.js",                 // final bundled file
      path: path.resolve(__dirname, "dist"), // absolute path required
      assetModuleFilename: "asset/[hash][ext]", // where the asset files will be stored
      clean: true,                           // clears old files in dist/
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i, // different formats of images to consider
                type: "asset/resource", // loader name
            },
            {
                test: /\.(css)$/, // css format files
                use: ["style-loader", "css-loader"], // loader name
            }

        ]
       
      },

    // 3. Mode: 'development' | 'production'
    mode: "development",
  };

  // Now to support scss files, we need configure more loaders, they are not included in the webpack. we have to install them separtely
  // npm i sass-loader sass
  // obviously you will be importing these css and scss files in entry point file to resolve the depenecy graph

  module.exports = {
    // 1. Entry point (where webpack starts building dependency graph)
    entry: "./src/index.js",
  
    // 2. Output (where bundled files go)
    output: {
      filename: "bundle.js",                 // final bundled file
      path: path.resolve(__dirname, "dist"), // absolute path required
      assetModuleFilename: "asset/[hash][ext]", // where the asset files will be stored
      clean: true,                           // clears old files in dist/
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i, // different formats of images to consider
                type: "asset/resource", // loader name
            },
            {
                test: /\.(css|scss)$/, // css and scss format files
                use: ["style-loader", "css-loader", "sass-loader"], // loader name
            }

        ]
       
      },

    // 3. Mode: 'development' | 'production'
    mode: "development",
  };

  // NOte: these scss and css loaders are injecting css file code in html style component directly. Good practice should be like js and images
  // separate request should be made to get the css files

  // ---------------------------------------------------------- Plugins ---------------------------------------------------------------

  // Plugins in webpacks helps to customize the build process. It has access to complete cycle of the app build process
  // It can do what loaders can't do. 

  // What plugins can do?
  // 1) We know the problem that when bundle.js is created, we have manually change the script file. But with plugins, we can also automate
  // this process.
  // 2) We know css is injected through js. but with plugins we can create a separate css file and it will automatically used in htmls. 
  // And browser will req separately for css files
  // 3) We can optimize images like compress it through plugins also.
  // 4) we can minify the css files
  // 5) Code splitting and chunk management

  // To generate the final html file with bundle.js, we need to install html-plugin. npm i html-webpack-plugin 
  // Note: Images still will not be referenced in html from dist folder. It will remain as original

  const HtmlPlugin = require('html-webpack-plugin')

  module.exports = {
    // 1. Entry point (where webpack starts building dependency graph)
    entry: "./src/index.js",
  
    // 2. Output (where bundled files go)
    output: {
      filename: "bundle.js",                 // final bundled file
      path: path.resolve(__dirname, "dist"), // absolute path required
      assetModuleFilename: "asset/[hash][ext]", // where the asset files will be stored
      clean: true,                           // clears old files in dist/
    },
    plugins: [
        new HtmlPlugin({
            template: "./index.html", // path of the html file
            chunks: ["index"], // if there are multiple entry points but in our case it is single file index.js. so only index.js will be included in the script tag of html file.
            filename: "my-index.html", // by default index.html will be generated. to provide your custom name , specify field here
            minify: true // by default this option is true in production mode.
        })
    ],


    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i, // different formats of images to consider
                type: "asset/resource", // loader name
            },
            {
                test: /\.(scss)$/, // scss format files
                use: ["style-loader", "css-loader", "sass-loader"], // loader name
            }

        ]
       
      },

    // 3. Mode: 'development' | 'production'
    mode: "development",
  };

  // I believe you got the another problem here i.e scripts are added automatically but about assets references in src or css files.
  // They are refereing to still ld path. But now new html is in dist foler. so asset should also be present in dist folder
  // to do this, we have to copy assets while building. install copy-webpack-plugin

  const copyPlugin = require('copy-webpack-plugin')

  module.exports = {
    // 1. Entry point (where webpack starts building dependency graph)
    entry: "./src/index.js",
  
    // 2. Output (where bundled files go)
    output: {
      filename: "bundle.js",                 // final bundled file
      path: path.resolve(__dirname, "dist"), // absolute path required
      assetModuleFilename: "asset/[hash][ext]", // where the asset files will be stored
      clean: true,                           // clears old files in dist/
    },
    plugins: [
        new HtmlPlugin({
            template: "./index.html", // path of the html file
            chunks: ["index"], // if there are multiple entry points but in our case it is single file index.js. so only index.js will be included in the script tag of html file.
            filename: "my-index.html", // by default index.html will be generated. to provide your custom name , specify field here
            minify: true // by default this option is true in production mode.
        }),
        new copyPlugin({
            patterns : [{
                from: path.resolve(__dirname, "src/assets"), // from where to copy files
                to: path.resolve(__dirname, "dist/assets") // destination path where assets are copied
            }]
        })
    ],


    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i, // different formats of images to consider
                type: "asset/resource", // loader name
            },
            {
                test: /\.(scss)$/, // scss format files
                use: ["style-loader", "css-loader", "sass-loader"], // loader name
            }

        ]
       
      },

    // 3. Mode: 'development' | 'production'
    mode: "development",
  };

  // Now we have to work on css too. Previously through loaders, css were injecting through JS in style tag. But its not a good practice
  // because it is loaded through html. even if only html is changing, whole process will work. Also we can see some flickering because
  // first html is rendered then css gets applied through style tag. To resolve this, we should have a separate file for css too which will
  // have reference in html file automaticaly though Link tag

  // install mini-css-extract-plugin

  const miniCssPlugin = require('mini-css-extract-plugin')

  module.exports = {
    // 1. Entry point (where webpack starts building dependency graph)
    entry: "./src/index.js",
  
    // 2. Output (where bundled files go)
    output: {
      filename: "bundle.js",                 // final bundled file
      path: path.resolve(__dirname, "dist"), // absolute path required
      assetModuleFilename: "asset/[hash][ext]", // where the asset files will be stored
      clean: true,                           // clears old files in dist/
    },
    plugins: [
        new miniCssPlugin(), // use mini css extract plugin

        new HtmlPlugin({
            template: "./index.html", // path of the html file
            chunks: ["index"], // if there are multiple entry points but in our case it is single file index.js. so only index.js will be included in the script tag of html file.
            filename: "my-index.html", // by default index.html will be generated. to provide your custom name , specify field here
            minify: true // by default this option is true in production mode.
        }),
        new copyPlugin({
            patterns : [{
                from: path.resolve(__dirname, "src/assets"), // from where to copy files
                to: path.resolve(__dirname, "dist/assets") // destination path where assets are copied
            }]
        })
    ],


    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i, // different formats of images to consider
                type: "asset/resource", // loader name
            },
            {
                test: /\.(css|scss)$/, // css and scss format files
                use: [miniCssPlugin.loader, "css-loader", "sass-loader"], // change mini css loader from style loader.
            }

        ]
       
      },

    // 3. Mode: 'development' | 'production'
    mode: "development",
  };

  // Now, my js is sorted, assets are sorted and css also. But there is one issue more. I need to run from the html file path.
  // There is nothing like localhost:3000. We are seeing file paths directly.
  // ALso eveytime i have to make the new build to see changes.
  // to resolve this, we have webpack dev server. It does 2 main things for us
  // Automatically creates a new build internally when there are new changes
  // serves the files from localhost.
  // Now you may ask, when in dev mode we dont serve from dist folder, then why internally webpack is making new build at run time
  // The ans is, the webpack makes build in dev mode also but stores in memory so that it can serve those files from localhost.
  // even if you delete the dist folder in dev mode, you can still access the content

// pm i webpack-dev-server
// npm run start: "webpack serve"

const miniCssPlugin = require('mini-css-extract-plugin')

  module.exports = {
    // 1. Entry point (where webpack starts building dependency graph)
    entry: "./src/index.js",
  
    // 2. Output (where bundled files go)
    output: {
      filename: "bundle.js",                 // final bundled file
      path: path.resolve(__dirname, "dist"), // absolute path required
      assetModuleFilename: "asset/[hash][ext]", // where the asset files will be stored
      clean: true,                           // clears old files in dist/
    },
    devServer: {
        port: 3000 // webpack will serve files at locahost at 3000 port
    },
    plugins: [
        new miniCssPlugin(), // use mini css extract plugin

        new HtmlPlugin({
            template: "./index.html", // path of the html file
            chunks: ["index"], // if there are multiple entry points but in our case it is single file index.js. so only index.js will be included in the script tag of html file.
            filename: "my-index.html", // by default index.html will be generated. to provide your custom name , specify field here
            minify: true // by default this option is true in production mode.
        }),
        new copyPlugin({
            patterns : [{
                from: path.resolve(__dirname, "src/assets"), // from where to copy files
                to: path.resolve(__dirname, "dist/assets") // destination path where assets are copied
            }]
        })
    ],


    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i, // different formats of images to consider
                type: "asset/resource", // loader name
            },
            {
                test: /\.(css|scss)$/, // css and scss format files
                use: [miniCssPlugin.loader, "css-loader", "sass-loader"], // change mini css loader from style loader.
            }

        ]
       
      },

    // 3. Mode: 'development' | 'production'
    mode: "development",
  };

  // --------------------------------------- Webpack in production mode  or optimizations----------------------------------------------------------

  // Webpack behaves different in dev mode and prod mode
  // 1) In prod mode, it optimize the app by minifying only HTML and JS file by default so as to increase performance
  // 2) Webpack uses tree shaking mechanism to optimize the JS files. It means it removes all unused js code.
  // it works only in ES6 modules means modules which are imprted exported using import export syntax
  // 3) To optimize more, we have css and assets left, we need to install separate plugins(perge css plugin) for it. That we will discuss some other day.
  // we can minify css files also, by removing duplicte css and unused css.
  // 4) File hashing for files for faster build. file is only build again if there is change in it.
  // 5) Code Splitting: It is one of the ways to optimizie bundle. We have some dependencies in each file. Let's suppose a module is imported in 
  // more than 2 files. So internally dependency graph will resolve the dependencies and have two separate modules for each of the file.
  // We use code splitting technique, means the dependency is also be optimized and will eb created a single bundle file for it. So out 2 files
  // now be referencing to this new module bundle file.
  // we need to install webpack bundle analyzer library and do some config changes in webpack config file.
  optimization:{
    splitChunks: {
        chunks: "all"
    }
  }

// 6) Dynamic Imports or Lazy Loading: To improve the intitial loading of apps, we have to decrease the webpack size or bundle size. So instead
// of requesting all the dependecies at once, we will dynamincally request those expensive bundle scripts when required. to do this
// we will need to make some changes in our code. JS has import() method which returns the library. it will include dependency only when called.



