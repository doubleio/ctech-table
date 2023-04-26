# C-TECH Table

To upload changes, enter **npm run deploy**.

# Usage Guidelines

To use this package.json file, simply add it to your project directory and run

```
npm install
```

to install all the dependencies and devDependencies.

## Scripts

`npm run dev`: for running development server with Vite

`npm run build`: for building the application for production with Vite

`npm run preview`: for previewing the built application with Vite's server

`npm run deploy`: for deploying the application with a deploy script written in bash.

Once installed, you can use the scripts section to run development, building, previewing, and deploying tasks. Running `npm run dev` will start a development server, while `npm run build` will build the application for production. `npm run preview` will allow you to preview the application after it has been built, and `npm run deploy` will deploy the built application using the deploy.sh script.

Make sure you have a deploy.sh script in your project directory before running npm run deploy.

## Plugins

1. For sliders, use vueform/slider - <https://github.com/vueform/slider>

2. Dropdown vue-collapsible-panel - <https://github.com/dafcoe/vue-collapsible-panel>
