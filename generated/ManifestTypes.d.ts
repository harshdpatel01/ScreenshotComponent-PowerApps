/*
*This is auto generated from the ControlManifest.Input.xml file
*/

// Define IInputs and IOutputs Type. They should match with ControlManifest.
export interface IInputs {
    buttonText: ComponentFramework.PropertyTypes.StringProperty;
    buttonHeight: ComponentFramework.PropertyTypes.WholeNumberProperty;
    buttonWidth: ComponentFramework.PropertyTypes.WholeNumberProperty;
    borderRadius: ComponentFramework.PropertyTypes.WholeNumberProperty;
    borderStyle: ComponentFramework.PropertyTypes.StringProperty;
    padding: ComponentFramework.PropertyTypes.WholeNumberProperty;
    backgroundColor: ComponentFramework.PropertyTypes.StringProperty;
    fontColor: ComponentFramework.PropertyTypes.StringProperty;
    hoverBackgroundColor: ComponentFramework.PropertyTypes.StringProperty;
    fontSize: ComponentFramework.PropertyTypes.WholeNumberProperty;
    fontFamily: ComponentFramework.PropertyTypes.StringProperty;
    textAlign: ComponentFramework.PropertyTypes.StringProperty;
    fontWeight: ComponentFramework.PropertyTypes.StringProperty;
    textTransform: ComponentFramework.PropertyTypes.StringProperty;
    lineHeight: ComponentFramework.PropertyTypes.WholeNumberProperty;
}
export interface IOutputs {
    screenshot?: string;
    buttonText?: string;
    buttonHeight?: number;
    buttonWidth?: number;
    borderRadius?: number;
    borderStyle?: string;
    padding?: number;
    backgroundColor?: string;
    fontColor?: string;
    hoverBackgroundColor?: string;
    fontSize?: number;
    fontFamily?: string;
    textAlign?: string;
    fontWeight?: string;
    textTransform?: string;
    lineHeight?: number;
}
