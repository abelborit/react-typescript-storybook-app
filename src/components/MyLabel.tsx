/* aquí se trabaja como un componente cualquiera, se crean las interfaces, proptypes, qué renderizará el componente, etc. */
import "./MyLabel.css";

/* se crea esto para saber cómo se comportará nuestro componente, color de texto, tamaños, funciones, etc. */
// interface MyLabelProps {
//   label: string;
//   size?: "normal" | "h1" | "h2" | "h3";
// }

/* se hace de esta forma para colocar como una documentanción y tener descripciones de cada propiedad. Algo importante es que, añadiendo a lo que está el comentario en MyLabel.stories.ts de bajar el servidor y volverlo a levantar es que en la versión actual de storybook cuando se hacen cambios en las interfaces no se ven reflejadas automáticamente en la parte física que es la página. Una idea de que esto no sucede es que eso de las interfaces no realizan un re-render en general o que vite no reconoce ese cambio en la pantalla y por eso no realiza un re-renderizado porque no hay diferencias y por eso entonces se baja el sevidor y se levanta de nuevo */
interface MyLabelProps {
  /**
   * Text to show
   */
  label: string;
  /**
   * Component size
   */
  size?: "normal" | "h1" | "h2" | "h3";
  /**
   * Capitalize all letters
   */
  isCapitalize?: boolean;
  /**
   * Label color
   */
  color?: "text-primary" | "text-secondary" | "text-tertiary";
  /**
   * Font color
   */
  fontColor?: string;
  /**
   * Background color
   */
  backgroundColor?: string;
}

/* si se coloca con valor por defecto quiere decir que esa propiedad es opcional colocarla ya que tendrá un valor por defecto así se coloque o no */
export const MyLabel = ({
  label,
  isCapitalize = false,
  size = "normal",
  color,
  fontColor,
  backgroundColor = "transparent",
  ...props
}: MyLabelProps) => {
  return (
    <span
      className={`${size} ${color} label`}
      style={{ color: fontColor, backgroundColor }}
      {...props}
    >
      {isCapitalize ? label.toUpperCase() : label}
    </span>
  );
};
