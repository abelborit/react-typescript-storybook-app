# Proyecto con React + TypeScript + Storybook (https://abelborit.github.io/react-typescript-storybook-app/?path=/docs/configure-your-project--docs)

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

Para la estructura de carpetas se deberá eliminar del src los archivos App.css, App.tsx, index.css, main.tsx ya que este proyecto es para poder usar storybook entonces al hacer npm run dev correrá la página de storybook y no el típico proyecto de React. Luego crear un archivo index.tsx y exportar todos los componentes que vamos a usar.

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

# GitHub Actions + Semantic Versioning + Automatic NPM Deploy + Storybook

Ya teniendo el proyecto de storybook entonces lo usaremos para subirlo a NPM pero hay ciertas configuraciones que se tienen que hacer. Subirlo manualmente es tedioso porque hay que tener en cuenta varios factores por ejemplo: Subirlo a GitHub para el respaldo, tener en cuenta que podríamos subir el versionamiento, después que esa misma versión la tenga el paquete en NPM y así más configuraciones. Para realizar eso entonces es mejor usar GitHub Actions lo que nos facilitará haciendo un trabajo automático. El objetivo es que cuando se haga el push o aceptar las PR de otros desarrolladores entonces también se tendrá una analizador de commits y según el commit se haga una u otra acción, por ejemplo un fix para aumentar la versión de patch, un feat para aumentar la versión minor y un breaking change para aumentar la versión major.

Se realizará lo siguiente:

- Tomar nuestros componentes probados con Storybook
- Generar los archivos de definición de TypeScript
- Generar el build de producción
- Crear una acción en Github actions para crear el versionamiento semántico
- Usar el versionamiento semantico para publicar la version del paquete
- Publicar el paquete en NPM
- Actualizar paquete
- Consumir el paquete en aplicaciones externas.

## 1. Configuraciones que serán visibles cuando se despliegue el paquete a NPM

En el package.json se tiene que tener un nombre único y el private pasarlo a false o borrar la propiedad porque si se deja private en true entonces no va a llegar a NPM aunque se tenga toda la configuración hecha. Se agregarán algunas configuraciones adicionales como la licencia, typings (porque se está usando TypeScript). Cuando se crea un paquete de NPM lo que se comparte es la carpeta dist que la crearemos de forma automática. Los typings es de dónde va a saber TypeScript la definición de mis componentes la cual estará en la carpeta dist en el index.d.ts (dist/index.d.ts) donde los archivos .d.ts son los archivos de definición de TypeScript. Esos typings no serían necesarios si no se usara TypeScript. Tambien colocar el main que será la propiedad que servirá a otras aplicaciones que importen nuestro paquete para decirle cuál es el punto de entrada de nuestro paquete en el cual se exporta todo lo necesario. Luego colocar repository para que aparezca la URL y otras personas puedan revisar el repositorio. También se tendrá que hacer una configuración adicional para la integración de GitHub Actions entonces se coloca release y branches para hacer el despliegue de las ramas en este caso el main ya que es la rama principal de nuestro proyecto (pueden ser otra si hay para producción, etc). Se agregará files ya que son los archivos que se van a desplegar.

En los scripts hay que colocar un build el cual se encargará de crear la carpeta dist, los archivos de definición de TypeScript entre otras cosas.

```js
{
  "name": "react-typescript-storybook-app",
  "private": false,
  ...
  "license": "MIT",
  "typings": "dist/index.d.ts",
  "main": "dist/index.js",
  "repository": {
    "url": "https://github.com/abelborit/react-typescript-storybook-app",
    "type": "git"
  },
  "release": {
    "branches": [
      "main"
    ]
  },
  "files": [
    "dist",
    "src"
  ],

  "scripts": {
      ...
  },
}
```

- Actualización:

  - En el package.json se hará una actualización en cuanto a las dependencies, devDependencies y peerDependencies. En dependencies se deja el objeto vacío ya que si la persona ya tiene react en su proyecto entonces sería innecesario que cuando instale este paquete instale nuevamente "react" y "react-dom" y por eso solo se instala como devDependencies porque entonces no serán dependencias que formarán parte del build final de mi aplicación/paquete. Si se necesita una dependencia para el proyecto entonces colocarlas en dependencies ya que cuando se instale el paquete en otro proyecto también descargará esas dependencias pero en este caso como es solo "react" y "react-dom" entonces se podría mover a devDependencies.

    ```js
    {
      ...

      "files": [
        "dist",
      ],

      "dependencies": {},

      "devDependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        ...
      },

      "peerDependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0"
      },
    }
    ```

## 2. Configuraciones para TypeScript

Se tiene que corroborar que se tenga TypeScript de forma global colocando en la terminal el comando `tsc --version` y con eso nos debería salir la versión y sino entonces instalar de manera global TypeScript usando la terminal como administrador y colocando `npm i -g typescript`. Luego intentar de nuevo en la terminal el comando `tsc --version` y si sale:

```
tsc : No se puede cargar el archivo C:\Program Files\nodejs\tsc.ps1 porque la ejecución de scripts está deshabilitada
en este sistema. Para obtener más información, consulta el tema about_Execution_Policies en
https:/go.microsoft.com/fwlink/?LinkID=135170.
En línea: 1 Carácter: 1
+ tsc --version
+ ~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess
```

Entonces primero se coloca en la terminal `Get-ExecutionPolicy` y si nos sale `Restricted` entonces colocar en la terminal `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted` para cambiar el valor a `Unrestricted` (probar nuevamente `Get-ExecutionPolicy` para corroborar) y con eso ya estaría funcionando correctamente todo. Probar de nuevo el comando `tsc --version`.

Como se está trabajando con TypeScript entonces TypeScript podría ser quien se encargue de hacer toda las transpilación y generación de la carpeta dist. En el archivo tsconfig.json asegurarse primero que haya el include y que tenga el src (esto ya tendría que venir por defecto al crear el proyecto). Luego en compilerOptions se añade la propiedad outDir que será el directorio en el cual queremos la salida o el producto que en este caso será la carpeta dist. Colocar también declaration en true porque se quieren las declaraciones. Se puede cambiar el module de "ESNext" a "CommonJS" ya que ese es un standard. Cambiar el noEmit a false.

```js
{
  "compilerOptions": {
    "outDir": "dist",
    ...
    "declaration": true,
    "module": "CommonJS",
    ...
    "noEmit": false,
    ...
  },

  "include": ["src"],

}
```

Luego de terminar lo anterior, colocar en la terminal del proyecto `tsc` (TypeScript Compiler) y eso leerá el archivo de configuración de TypeScript (tsconfig.json) y va a transpilar todo el código (lo que está incluído en "include": ["src"]). Esto dará algunos errores esperados como por ejemplo:

```
src/stories/Button.stories.ts:6:7 - error TS4023: Exported variable 'meta' has or is using name 'ButtonProps' from external module "C:/ruta del proyecto/react-advanced-projects/react-typescript-storybook-app/src/stories/Button" but cannot be named.
```

Para esto entonces se debería ir a cada uno de los archivos que dan errores y por ejemplo para los problemas en stories.ts entonces en sus archivos .tsx colocar el export en la interface ya que al hacer la transpilación entonces se están importando en otros archivos y por eso da error. Después de solucionar los problemas se tiene que borrar la carpeta dist que se generó y colocar de nuevo en la terminal `tsc`.
En este caso da error también el tsconfig.json:

```
$ tsc
tsconfig.json:12:25 - error TS5095: Option 'bundler' can only be used when 'module' is set to 'es2015' or later.

12     "moduleResolution": "bundler",
                           ~~~~~~~~~

tsconfig.json:13:35 - error TS5096: Option 'allowImportingTsExtensions' can only be used when either 'noEmit' or 'emitDeclarationOnly' is set.

13     "allowImportingTsExtensions": true,
                                     ~~~~


Found 2 errors in the same file, starting at: tsconfig.json:12
```

Para solucionar esto entonces colocar:

```js
{
  "compilerOptions": {
    "outDir": "dist",
    ...
    "declaration": true,
    "module": "ES2015",
    ...
    // "allowImportingTsExtensions": true,
    "noEmit": false,
    ...
  },

  "include": ["src"],

}
```

Cuando se comenta "allowImportingTsExtensions": true, entonces revisar todos los archivos y ver las importaciones con extensión .tsx o .ts y quitarlas como en el caso del archivo main.tsx de la importación `import App from './App.tsx'` que da un error `An import path can only end with a '.tsx' extension when 'allowImportingTsExtensions' is enabled.` a `import App from "./App";` sin la extensión.

Cuando ya se tenga la carpeta dist creada (manualmente por el momento, luego se creará automáticamente) vemos que en la carpeta dist no están los assets ni los archivos .css ya que TypeScript solo se encarga de trabajar con los archivos de TypeScript propiamente (.ts o .tsx) y eso se podría solucionar manualmente copiando y pegando los archivos en el dist y eso podría funcionar hasta cierto punto porque habrán errores ya que los archivos de TypeScript no lograrán encontrar sus archivos de .css respectivos.

- Actualización:

  - En el tsconfig.json se hará una actualización en cuanto a su configuración:

  ```js
  {
    "compilerOptions": {
      "outDir": "dist",
      ...
      "declaration": true,
      "module": "ESNext",
      ...
      "allowJs": true,
      "emitDeclarationOnly": false,
      "declarationMap": false,
      ...
      "allowImportingTsExtensions": false,
      ...
      "noEmit": false,
      ...
    },

    "include": ["src"],

  }
  ```

### 2.1 Configuración para TypeScript de este proyecto:

- "outDir": "dist": Esta opción especifica la carpeta de salida donde se generarán los archivos compilados. En este caso, los archivos JavaScript compilados se colocarán en la carpeta "dist".

- "target": "ES2020": Define la versión de ECMAScript a la que se dirigirá la compilación. En este caso, se está apuntando a ECMAScript 2020 (ES2020), lo que significa que el código TypeScript se compilará para ejecutarse en un entorno que admite las características de ES2020.

- "useDefineForClassFields": true: Habilita el uso de la palabra clave "define" para campos de clase en TypeScript. Esto es útil cuando trabajas con propiedades de clase públicas en la sintaxis de clase de TypeScript.

- "lib": ["ES2020", "DOM", "DOM.Iterable"]: Especifica las bibliotecas de TypeScript que estarán disponibles durante la compilación. En este caso, se incluyen las bibliotecas ES2020, DOM y DOM.Iterable, lo que significa que se pueden utilizar las características correspondientes en tu código TypeScript.

- "declaration": true: Cuando está configurado en "true", esto indica que se deben generar archivos de declaración (.d.ts) junto con los archivos JavaScript compilados. Los archivos de declaración son útiles para proporcionar información de tipo a otros desarrolladores que consumen tu código.

- "module": "ES2015": Define la forma en que se organizarán los módulos en el código compilado. Aquí, se está utilizando el sistema de módulos ES2015.

- "skipLibCheck": true: Cuando está configurado en "true", TypeScript omitirá la comprobación de las bibliotecas de definición de tipo (archivos .d.ts) al compilar. Esto puede acelerar el proceso de compilación si tienes muchas bibliotecas de definición de tipo en tu proyecto.

- "moduleResolution": "bundler": Esta opción establece el método de resolución de módulos en modo "bundler". Indica que se utilizará una resolución de módulos específica para empaquetadores (bundlers) como Webpack o Rollup.

- "allowImportingTsExtensions": true: Permite la importación de módulos TypeScript (.ts o .tsx) sin especificar la extensión del archivo.

- "resolveJsonModule": true: Habilita la capacidad de importar archivos JSON directamente en tu código TypeScript.

- "isolatedModules": true: Cuando está configurado en "true", TypeScript trata cada archivo como un módulo independiente. Esto puede mejorar la eficiencia de la compilación en algunos casos.

- "noEmit": false: Esta opción deshabilita la generación de archivos JavaScript de salida. Cuando está configurado en "false" (como en este caso), se generarán archivos JavaScript junto con archivos de declaración.

- "jsx": "react-jsx": Esta opción configura el compilador TypeScript para reconocer y procesar la sintaxis JSX utilizada en aplicaciones de React.

- "strict": true: Habilita un conjunto de opciones estrictas de TypeScript para mejorar la seguridad y la calidad del código.

- Opciones de linting (control de calidad del código):

  - "noUnusedLocals": true: Advierte sobre variables locales no utilizadas.
  - "noUnusedParameters": true: Advierte sobre parámetros de funciones no utilizados.
  - "noFallthroughCasesInSwitch": true: Detecta casos en los que puede faltar una sentencia "break" en una instrucción "switch".

- "include": ["src"]: Especifica qué archivos o carpetas deben incluirse en el proceso de compilación. En este caso, se incluirán los archivos dentro de la carpeta "src".

- "references": [{ "path": "./tsconfig.node.json" }]: Esto se usa para hacer referencia a otro archivo de configuración TypeScript ("tsconfig.node.json") en tu proyecto. Puede ser útil cuando tienes configuraciones específicas para diferentes partes de tu proyecto.

## 3. Configuraciones en el script del package.json

Hasta lo anterior ya se podía crear la carpeta de distribución dist pero faltan los archivos .css y los assets. Aquí se realizará ciertas configuraciones para que si existe la carpeta dist entonces eliminarla para poder colocar la nueva pero `tsc` que es el TypeScript Compilar no podría efectuar la eliminación o copia de archivos ya que solo se enfoca en los archivos de TypeScript como tal, entonces se instalarán librerías de terceros para eliminar (https://www.npmjs.com/package/rimraf) y para copiar(https://www.npmjs.com/package/copyfiles). Se creará la propiedad `"clean": "rimraf dist/"` para limpiar la carpeta de distribución dist. Ahora necesitamos mover los archivos estáticos que no terminan siendo enviados al dist (es decir los que no terminan siendo transpilados de TypeScript a JavaScript) se creará la propiedad `"copy-files": "copyfiles -u 1 src/**/*.css dist/"` para copiar los archivos y mandarlos al dist. A todo lo anterior se podría colocar un script para crear los archivos minificados cosa que podría ayudar al performance del paquete.

```js
  "scripts": {
    "dev": "npm run storybook",
    "build": "npm run clean && tsc && npm run copy-files",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "clean": "rimraf dist/",
    "copy-files": "copyfiles -u 1 src/**/*.css dist/"
  },
```

## 4. Configuraciones para el Semantic Versioning Automático (https://www.npmjs.com/package/semantic-release)

Para hacer los commit normales y tradicionales entonces no colocar las palabras clave del Semantic Versioning del feat, fix perf.

Una de las cosas tediosas de trabajar con librerías es el manejo del versionamiento semántico pero la versión nos ayuda a saber si es una versión mayor, si es un parche o si es un bug fix (reparación de errores) (https://semver.org/) y con esto para saber el estado actual del paquete. Se instalará como dependencia de desarrollo `npm i -D semantic-release`

Copiar estos plugins en el package.json para trabajar con Semantic Versioning

- Según el mensaje del commit realizará el release automático de la versión Major, Minor o Patch (@semantic-release/commit-analyzer)
- Generar los release notes (@semantic-release/release-notes-generator)
- Generar el changelog de forma automática (@semantic-release/changelog)
- Para las integraciones con GitHub (@semantic-release/github)
- Realizar despliegues automáticas a NPM (@semantic-release/npm)
- Para trabajar con Git y GitHub (@semantic-release/git)

```js
...
"plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/github",
    "@semantic-release/npm",
    "@semantic-release/git"
],
```

Una vez realizado lo anterior, como ya lo tenemos instalado, en teoría ya lo podríamos usar para que cree el versionamiento semántico pero hay que conectarlo de cierta manera para que cuando se despliegue trabaje y cree el versionamiento y nos cree el release en el repositorio y para hacer eso vamos a usar los GitHub Actions. Según la siguiente tabla sacada de la librería semantic-release (https://www.npmjs.com/package/semantic-release) tenemos que colocar cierto tipo de mensajes para realizar el versionamiento.

| Commit message                                                                                                                                                                    | Release type                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| fix(pencil): stop graphite breaking when too much pressure applied                                                                                                                | ~~Patch~~ Fix Release                                                                                  |
| feat(pencil): add 'graphiteWidth' option                                                                                                                                          | ~~Minor~~ Feature Release                                                                              |
| perf(pencil): remove graphiteWidth option. BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reasons. | ~~Major~~ Breaking Release. (Note that the BREAKING CHANGE: token must be in the footer of the commit) |

Cabe mencionar que la carpeta dist sí la vamos a necesitar porque eso es lo que se termina descargando por las demás personas y eso tendría que ser parte del repositorio. Para eso entonces ir la .gitignore y sacar todo lo del dist.

Para hacer el primer commit usando el semantic versioning usaremos `git commit -m "feat: Updated package.json configurations. Updated tsconfig.json configurations. Fixed stories errors because tsconfig.json configurations. Installed new dependencies. Created new dist folder"` Pero con eso no esperemos que ya tengamos el release en el repositorio, el semantic versioning ya es parte de nuestro proyecto pero ahora pasaremos a configurar los github actions para que este analice cuando se recibe un nuevo push y cuando se reciba en el repositorio entonces github actions disparará la llamada al semantic versioning.

Ahora, antes de hacer que el versionamiento semántico se configure de manera automática y que nuestro paquete que subimos a github se despliegue automáticamente en NPM, tenemos que usar dos tokens de acceso.

- Primer token de acceso en GitHub: Ir al ícono de nuestro usario -> Settings -> Developer settings -> Personal access token -> Tokens (classic) -> Generate new token -> Generate new token (classic) -> Colocar contraseña (si es que pide). Luego en las notas colocar algo que tenga sentido y referencia a lo que queremos hacer, por ejemplo: MyStorybook-Components-Semantic-Versioning.

Github recomienda que siempre tenga un tiempo para que expire, esto con la finalidad de que si el token se ve comprometido entonces el token va a dejar de existir en una X cantidad de tiempo (en este caso práctico colocar 30 días). Para los accesos o el alcance de este token se puede dar a toda la cuenta de github pero solo se colocará el acceso a los repositorios. Y finalmente presionar el botón Generate token y nos dará un token, ese token tenerlo a la mano porque cuando se salga de la pantalla no volveremos a ver ese token. Ahora hace falta el token que me permite publicar repositorios (en este caso paquetes) de manera automática a NPM.

- Segundo token de acceso en NPM: Ir al ícono de nuestro usario -> Access Tokens -> Generate New Token -> Classic Token -> Colocar contraseña (si es que pide) -> En las notas colocar algo que tenga sentido y referencia a lo que queremos hacer, por ejemplo: MyStorybook-Components-Semantic-Versioning -> Option: Publish -> Generate Token

Con NPM es igual que en GitHub de que ese token tenerlo a la mano porque cuando se salga de la pantalla no volveremos a ver ese token. Luego el token deberá tener acceso a publicar (Publish) y tener cuidado ya que cualquier persona con este token podrá publicar paquetes como si fuéramos nosotros (si es un equipo de trabajo u organización y hay un equipo que estará tocando ese paquete constantemente entonces no hay problema), entonces tener cuidado ya que personas que tengan acceso al repositorio podrían saber de este token.

Ya teniendo los tokens de acceso de GitHub y NPM ya se pueden usar para hacer los despliegues automáticos con GitHub Actions. entonces ahora los tokens los vamos a utilizar como si fueran variables de entorno que van a funcionar en GitHub Actions.

GH_TOKEN = token de github
NPM_TOKEN = token de NPM

- Pasos para GitHub Actions: Estando en el respositorio del proyecto -> Settings del repositorio -> Secrets and variables (funcionan como si fueran las variables de entorno) -> Actions -> New repository secret -> Colocar el nombre y su token -> Add secret

## 5. Configuraciones para los GitHub Actions (Crear versionamiento y despliegue de forma automática)

GitHub Actions es una herramienta poderosa que ofrece GitHub (que es de Microsoft) para realizar tareas automáticas y para esto hay muchas configuraciones y hay algunas que ya nos ofrencen al entrar a New Workflow que son tareas automáticas que van a suceder cuando hay algún cambio en el repositorio. En este caso vamos a configurar las GitHub Actions para que cada vez que se haga un push en el repositorio, automáticamente el semantic versioning configure que es una nueva versión ya sea major, minor o patch en la parte de los releas y que también haga el deploy automáticamente a NPM.

Se empezará a crear un nuevo workflow entonces, entonces se hará click en la pestaña Actions y luego en New Workflow y después en **set up a workflow yourself** y por defecto te manda a una pantalla del repositorio y entra a la carpeta .github/workflows/main.yml donde main.yml es el archivo que se creará y workflows puede ser que cambie, puede ser que sea entrando así en los directorios y sino de frente en .github. Estos archivos .yml son archivos donde la separación y la tabulación son importantes. Puede que el archivo main.yml tenga o no una configuración que ya la agregaremos o cambiaremos después, pero por ahora hacer click en `Commit changes...` y agregar el commit desde el repositorio de github. Luego ya en Visual Studio Code hacer un git pull para traer los cambios del repositorio y ver si hay que resolver conflictos o no.

Ya teniendo los últimos cambios entonces se empezará a configurar el main.yml. Ahora que se colocó la acción de hacer el build de forma automática, colocar otra vez el dist en el .gitignore ya que ahora se hará de forma automática por el GitHub Actions.

- Si hay algún tipo de error similar a que el Semantic action no puede acceder a Github o algo refereido a hacer al push o no sube a NPM entonces colocar en el main.yml:

```yml
permissions:
  contents: write
```

- Si hay errores con permisos al repositorio de github (si hay un error o problemas con el semantic-versioning sobre permisos): leer: https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/ci-configurations/github-actions.md para agregar algunas líneas:

```yml
- uses: actions/checkout@v2
  with:
    fetch-depth: 0
    persist-credentials: false
- name: Setup Node.js
  uses: actions/setup-node@v1
  with:
    node-version: 18.13.0
```

- También tener en cuenta que si se trabaja con npm entonces colocar sin el run:

```yml
- name: Install Dependencies
  run: npm install

- name: Build App
  run: npm build
```

- Apartir del 2022 hubo cambios en GitHub Actions y en semantic-release. Hubieron cambios en "actions/checkout@v3" , "actions/setup@v3" y el node version:

```yml
- uses: actions/checkout@v3
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: 18
```

- Tener en cuenta que en el package.json la versión sigue como la inicial, es decir, está tal cual creamos el proyecto, para tener la última versión para futuros release entonces se tendría que realizar un pull luego de haber hecho el push al repositorio.

- Otro posible problema puede ser al usar css module (.module.css) hay que recordar que estos se importan como si fuera una librería como las que usamos siempre. Entonces se puede crear un archivo de declaración de TypeScript (declaration.d.ts) que solo va a servir para que cuando tengamos módulos de css el storybook solo se enfoque en utilizarlos:

  ```ts
  declare module "*.css";
  ```

  También lo que se puede usar para aumentar la compatibilidad y dependiendo qué se esté haciendo es instalar sass, sass-loader, etc. Y ver en dónde se colocará, es decir, si como devDependencies o como dependencies.

- Para aumentar un poco más la compatibilidad de nuestros componentes se tendría que exportarlos por default también.

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
