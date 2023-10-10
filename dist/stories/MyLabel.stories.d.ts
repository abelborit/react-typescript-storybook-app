import { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ label, isCapitalize, size, color, fontColor, backgroundColor, ...props }: import("../components/MyLabel").MyLabelProps) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
    parameters: {
        layout: string;
    };
    argTypes: {
        size: {
            control: string;
        };
        fontColor: {
            control: string;
        };
        backgroundColor: {
            control: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const AllCaps: Story;
export declare const Secondary: Story;
export declare const CustomColor: Story;
export declare const CustomBackgroundColor: Story;
