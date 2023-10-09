# Proyecto con React + TypeScript + Storybook

---

## 1. Storybook

Se trabajará con Storybook (https://storybook.js.org/) que es una interfaz frontend para crear UI Components y páginas de forma aislada. Esto nos ayudará a probar y desarrollar de una mejor manera nuestros componentes.

Se estarán implementando las bases y temas adicionales de Storybook. Para instalar Storybook (https://storybook.js.org/docs/react/get-started/install/) dentro de un proyecto existente se deberá colocar: npx storybook@latest init

- Integrar Storybook en una aplicación de React con npx
- Crear un componente desde cero
- Crear historias
- Configurar historias
- Utilizar varios controles para las properties
- Integración con TypeScript
- Crear documentaciones de componentes
- Desplegar documentación a diferentes sitios
- Bonus: Chromatic para desplegar Storybook de forma colaborativa

---

## 2. How to write a story

Las historias de Storybook o Storybook stories representa la llave de estados por cada uno de los componentes.

- #### Imports

  - First, import Meta and StoryObj for type safety and autocompletion in TypeScript stories.
  - Next, import a component. In this case, the Button component.

- #### Meta

  - The default export, Meta, contains metadata about this component's stories. The title field (optional) controls where stories appear in the sidebar.

- #### Story

  - Each named export is a story. Its contents specify how the story is rendered in addition to other configuration options.

- #### Args

  - Args are inputs that are passed to the component, which Storybook uses to render the component in different states. In React, args = props. They also specify the initial control values for the story.

- #### Create your first story

  - Now it's your turn. See how easy it is to create your first story by following these steps below.

    1. Copy the Warning story.
    2. Open the Button story in your current working directory: ./​src/​stories/​Button.stories.ts
    3. Paste it at the bottom of the file and save.

```js
// Button.stories.ts
/* Imports */
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/* Meta */
const meta: Meta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  // ...
};
export default meta;

/* Story */
type Story = StoryObj<Button>;
export const Primary: Story = {
  /* Args */
  args: {
    primary: true,
    label: "Click",
    background: "red",
  },
};

// Copy the code below
export const Warning: Story = {
  args: {
    primary: true,
    label: "Delete now",
    backgroundColor: "red",
  },
};
```

## 3. Hacer el build de storybook

En la terminal se colocará "npm run build-storybook" y luego automáticamente se creará una carpeta llamada "storybook-static" y esa carpeta es básicamente la aplicación como tal la cual se montará en algún servidor. Por ejemplo, si se sube a Netlify solo se utilizará la carpeta "storybook-static".

Una vez hecho el build se puede desplegar por ejemplo en Netlify, npm para tenerlo como paquete, etc.
También se puede probar usando la extensión Live Server de Visual Studio Code. Una vez instalada la extensión entonces nos vamos a la carpeta storybook-static y vamos al index.html y luego presionar click derecho y buscar la opción Open with Live Server o sino directamente presionando Go Live que está en el Visual Studio Code en la barra inferior.

- ### Desplegar a github pages

  Github pages tiene varias formas o carpetas que podemos usar para desplegar. Una de las carpetas por defecto que va a buscar es "docs". Entonces a la carpeta que se genera automáticamente "storybook-static" podemos cambiarle su nombre manualmente a "docs" o sino configurar el script `"build": "build-storybook -o docs"`

- ### Solución: Webpack4 default - compilation:

  - Si al compilar les aparece un error parecido a este:

    ```js
    info => Using default Webpack4 setup
    0% compilingERR! TypeError: The 'compilation' argument must be an instance of Compilation
    ERR!     at Function.getCompilationHooks
    ```

  - Hay que instalar 2 módulos:

    ```js
    npm i @storybook/builder-webpack5
    npm i @storybook/manager-webpack5
    ```

  - Posteriormente en .storybook/main.js agregar la configuración siguiente:

    ```js
    core: {
    builder: "webpack5",
    }

    // ref: -https://issuehunt.io/r/storybookjs/storybook/issues/13893
    ```

- ### Solución: Agregar flag para hacer build automaticamente en /docs

  Para no tener que estar cambiando manualmente el directory storybook-build a docs lo que se puede hacer es personalizar el package.json y, en el script de build, dejar lo siguiente: `"build": "build-storybook -o docs"`
  Esto indica una opción o argumento que se pasa al comando "build-storybook" donde "-o" generalmente se usa para especificar la carpeta de destino donde se generará la documentación de Storybook. En este caso, la carpeta de destino se llamará "docs" en lugar de "storybook-static".

- ### Solución: Error en Storybook: Failed to fetch dynamically imported module...
  A la hora de hacer el deploy y abrir la app desde Github pages puede ocurrir un error en Storybook (Failed to fetch dynamically imported module). La aplicación falla a la hora de compilar por el formato del nombre de los archivos de js. Para corregir el error, añadir un archivo con nombre '.nojekyll' en la raíz del directorio estático generado con el build de storybook "storybook-static" que se le cambiará a "docs". (https://github.com/storybookjs/storybook/issues/20564)

## 4. Bonus: Chromatic para desplegar Storybook de forma colaborativa (https://www.chromatic.com/)

Chromatic se puede integrar con nuestra aplicación de storybook para mejorar la forma en cómo otras personas pueden estar revisando, viendo y desplegando los cambios en nuestro paquete o aplicación que use storybook. Se podría pensar en usarlo cuando hay una gran o moderada cantidad de personas o un equipo de trabajo en el cual tienen muchos cambios los cuales tienen que ser revisados, aprobados o tener algún tipo de flujo antes de desplegarlo. Esta es una herramienta gratuita hasta cierto punto y también es de paga. Al momento de escoger el repositorio de github, esperar unos 10 minutos aprox para que se pueda refrescar y reconozca ese proyecto desplegago en el repo ya que algunas veces puede tomar un tiempo que aparezca.

- ### Solución: Storybook 7.2.0 for React; using the @storybook/react-vite builder (7.2.0); no supported addons found

  Instead of running npx chromatic --project-token=\*\*\*, we will create a new GitHub action file to deploy Storybook automatically. Create a new chromatic.yml file inside the .github/workflows folder with the following content:

  ```js
  name: "Chromatic"
  on: push
  jobs:
    chromatic-deployment:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v1
        - name: Install dependencies
          run: npm install
        - name: Publish to Chromatic
          uses: chromaui/action@v1
          with:
            token: ${{ secrets.GITHUB_TOKEN }}
  ```

  Before pushing the new workflow file, please add the CHROMATIC_PROJECT_TOKEN secret to your repository settings. More information on how to set up this can be found here: https://www.chromatic.com/docs/github-actions

  After successfully deploying our Storybook, the Chromatic page will be updated.

## 5. Hacer una librería de componentes

Estos posts dan algunos ejemplos:

- https://medium.com/canariasjs/creando-componentes-en-react-y-publicando-en-npm-16eee85f9fba
- https://morioh.com/a/db55793a3845/react-js-tutorial-for-beginners-or-full-course-in-9-hours

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
