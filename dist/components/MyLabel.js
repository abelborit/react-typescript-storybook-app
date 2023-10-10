import { jsx as _jsx } from "react/jsx-runtime";
/* aquí se trabaja como un componente cualquiera, se crean las interfaces, proptypes, qué renderizará el componente, etc. */
import "./MyLabel.css";
/* si se coloca con valor por defecto quiere decir que esa propiedad es opcional colocarla ya que tendrá un valor por defecto así se coloque o no */
export const MyLabel = ({ label, isCapitalize = false, size = "normal", color, fontColor, backgroundColor = "transparent", ...props }) => {
    return (_jsx("span", { className: `${size} ${color} label`, style: { color: fontColor, backgroundColor }, ...props, children: isCapitalize ? label.toUpperCase() : label }));
};
