import "./MyLabel.css";
export interface MyLabelProps {
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
export declare const MyLabel: ({ label, isCapitalize, size, color, fontColor, backgroundColor, ...props }: MyLabelProps) => import("react/jsx-runtime").JSX.Element;
