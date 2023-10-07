/* aquí se hará la configuración del componente que queremos mostrar y hacer las pruebas cuando estemos en storybook en el navegador */
/* Imports */
import { Meta, StoryObj } from "@storybook/react";
import { MyLabel } from "../components/MyLabel";

/* Meta */
/* Meta contiene metadata sobre la historia del componente. Esto se representará en el menú de la página de storybook ya que estará la información que nosotros definamos aquí de cómo queremos que funcione el componente */
/* la metadata son datos sobre el componente donde el componente también son datos, entonces la metadata son datos que describen otros datos sobre un tema X */
/* se coloca "satisfies" para que satisfaga "Meta<typeof MyLabel>" que en otras palabras es que va a inferir la información que nuestro componente tenga como sus properties y también intentará hacer el trabajo pesado de las configuraciones automáticamente */
const meta = {
  title: "My_Components/UI/MyLabel",
  component: MyLabel,
  /* "tags" para que tenga una documentación del componente y sus casos de uso que se genera de forma automática con algunas configuraciones en la interface del componente como tal que son con comentarios */
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  /* "argTypes" para realizar configuraciones a los argumentos: https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations */
  argTypes: {
    size: { control: "inline-radio" },
    fontColor: { control: "color" },
  },
} satisfies Meta<typeof MyLabel>;
export default meta;

/* otra forma de colocar según la documentación: https://storybook.js.org/docs/react/writing-stories/introduction#default-export */
// const meta: Meta<typeof MyLabel> = {
//   title: "MyLabel",
//   component: MyLabel,
// };
// export default meta;

/* Story */
/* para exportar esta story debemos definir un tipo */
type Story = StoryObj<typeof meta>;

/* crear las historis de tipo Story (el nombre Basic o AllCaps, etc. es por conveniencia, es según cómo mejor queremos representar la información de esta historia). Dentro de los args:{} estará la configuración inicial de cómo queremos ver el componente pero eso en la página de storybook se puede cambiar e ir probando */
export const Basic: Story = {
  /* definir los args del componente. Tener en cuanta que cuando son propiedades obligatorias entonces se tiene que colocar porque sino dará un error, las que son propiedades opcionales se pueden colocar o no */
  /* algo a tener en cuenta es que por el momento storybook no lee todo lo que está dentro de las interfaces, es decir, solo toma las propiedades requeridas y las opcionales no las toma en cuenta, entonces hay que cancelar el servidor y volver a levantarlo en la terminal para que tome todo lo de las interfaces, sería como un pequeño bug que tiene con las interfaces pero esto funciona mejor con los proptypes de JavaScript ya que ahí sí debería leer todo */
  args: {
    label: "Basic Label",
    size: "normal",
  },
};

export const AllCaps: Story = {
  args: {
    label: "All Caps Label",
    size: "h2",
    isCapitalize: true,
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Label",
    size: "h3",
    color: "text-secondary",
  },
};

export const CustomColor: Story = {
  args: {
    label: "Custom Color Label",
    size: "h2",
    fontColor: "gray",
  },
};
