[![Saffron](https://www.saffronbeds.com/wp-content/uploads/2020/01/logo_saffron_black_edit_full_size.jpg)](https://www.saffronbeds.com)

# 3D configurator "**Saffron Beds**"

Javascript extension made with [Threejs] and [Reactjs]. This extension could be loaded to the website with simple loader script **saffron-app-loader.min.js** located in the _./public/js_ directory after build process.

## Getting Started

Clone this repo and install dependencies with `yarn` or `npm install`.

### Starting The Dev Server

`yarn dev` or `npm run dev`

This project uses _webpack-dev-server_ to spin up an Express server with Hot-Reloading capability. Changes to code in `.src` should cause pages to reload.

### Building files for production

`yarn build` or `npm run build`

###### Configuration

This 3D configurator use file **data.json** located in _./public/saffron/data.json_ to hold information of configurable items and its assets, like 3d models (title, position, scale, materials, etc.).
To make any changes in configurable objects, to be seen in this configurator modify this file and related paths to assets in _./public/static_ directory, where all assets are located.
