import { IInputs, IOutputs } from "./generated/ManifestTypes";
import html2canvas from "html2canvas";

export class ScreenshotComponent implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _container: HTMLDivElement;
    private _notifyOutputChanged: () => void;
    private _screenshot: string;
    private _button: HTMLButtonElement;
    private _buttonText: string;

    constructor() {
        // Empty constructor
    }

    // Initialize the control and create the button
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement): void {
        try {
            this._container = container;
            this._notifyOutputChanged = notifyOutputChanged;
            this._buttonText = context.parameters.buttonText.raw || "Take Screenshot";
            this.renderButton(context);  // Render the button with styles and event listeners
        } catch (error) {
            console.error("Initialization failed:", error);
        }
    }

    // Create and style the button element
    private renderButton(context: ComponentFramework.Context<IInputs>): void {
        try {
            this._button = document.createElement('button');
            this._button.innerText = this._buttonText;
            this.applyStyles(context);  // Apply the styles from the context parameters
            this._button.onclick = () => this.handleButtonClick(context);  // Set the click event handler
            this._container.appendChild(this._button);  // Add the button to the container
        } catch (error) {
            console.error("Rendering button failed:", error);
        }
    }

    // Handle the button click to capture the screenshot
    private handleButtonClick(context: ComponentFramework.Context<IInputs>): void {
        try {
            this._button.style.display = "none";  // Hide the button during processing
        
            // Immediately hide elements that are explicitly set to be invisible in PowerApps
            const elementsToHide: HTMLElement[] = [];
            document.querySelectorAll('[data-bind]').forEach((element) => {
                if (element instanceof HTMLElement) { // Ensure the element is an HTMLElement
                    const binding = element.getAttribute('data-bind');
                    if (binding && binding.includes('visible:') && binding.includes('properties.Visible')) {
                        const style = window.getComputedStyle(element);
                        if (style.visibility === 'hidden' || style.display === 'none' || style.opacity === '0') {
                            elementsToHide.push(element);
                            element.style.display = 'none';
                        }
                    }
                }
            });
        
            // Small delay before taking the screenshot to allow changes to render
            setTimeout(() => {
                html2canvas(document.body, {
                    useCORS: true,  // Attempt to use CORS for images
                    allowTaint: false,  // Prevent tainted images from breaking the capture
                    logging: true,  // Enable logging to console for debugging
                    backgroundColor: null,  // Preserve background transparency or color
                    windowWidth: document.documentElement.scrollWidth,  // Capture full width
                    windowHeight: document.documentElement.scrollHeight  // Capture full height
                }).then(canvas => {
                    try {
                        this._screenshot = canvas.toDataURL('image/png');  // Convert the canvas to a base64 PNG
                        this._notifyOutputChanged();  // Notify PowerApps that the screenshot is ready
        
                        // Restore the button's visibility
                        this._button.style.display = "block";  // Show the button again
        
                        // Restore hidden elements' visibility
                        elementsToHide.forEach((element) => {
                            element.style.display = '';
                        });
                    } catch (error) {
                        console.error("Processing screenshot failed:", error);
                        this._button.style.display = "block";  // Ensure the button is shown even if processing fails
                    }
                }).catch(error => {
                    console.error("Screenshot capture failed:", error);  // Log errors to console
                    this._button.style.display = "block";  // Show the button again if an error occurs
                });
            }, 500);  // Adjust this delay if necessary
        } catch (error) {
            console.error("Button click handling failed:", error);
            this._button.style.display = "block";  // Ensure the button is shown in case of any failure
        }
    }    

    // Apply styles to the button based on the context parameters
    private applyStyles(context: ComponentFramework.Context<IInputs>): void {
        try {
            this._button.style.height = context.parameters.buttonHeight.raw + "px" || "40px";
            this._button.style.width = context.parameters.buttonWidth.raw + "px" || "150px";
            this._button.style.borderRadius = context.parameters.borderRadius.raw + "px" || "5px";
            this._button.style.border = context.parameters.borderStyle.raw || "1px solid #000";
            this._button.style.padding = context.parameters.padding.raw + "px" || "10px";
            this._button.style.cursor = "pointer";
            this._button.style.backgroundColor = context.parameters.backgroundColor.raw || "#0078D7";
            this._button.style.color = context.parameters.fontColor.raw || "#ffffff";
            this._button.style.fontSize = context.parameters.fontSize.raw + "px" || "14px";  // Font size
            this._button.style.fontFamily = context.parameters.fontFamily.raw || "Arial, sans-serif";  // Font family
            this._button.style.textAlign = context.parameters.textAlign.raw || "center";  // Text alignment
            this._button.style.fontWeight = context.parameters.fontWeight.raw || "normal";  // Font weight
            this._button.style.textTransform = context.parameters.textTransform.raw || "none";  // Text transform (e.g., uppercase)
            this._button.style.lineHeight = context.parameters.lineHeight.raw + "px" || "normal";  // Line height

            // Handle hover effects
            this._button.onmouseover = () => {
                this._button.style.backgroundColor = context.parameters.hoverBackgroundColor.raw || "#005A9E";
            };

            this._button.onmouseout = () => {
                this._button.style.backgroundColor = context.parameters.backgroundColor.raw || "#0078D7";
            };
        } catch (error) {
            console.error("Applying styles failed:", error);
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        try {
            this._button.innerText = context.parameters.buttonText.raw || this._buttonText;  // Update button text
            this.applyStyles(context);  // Reapply styles if any parameters changed
        } catch (error) {
            console.error("Update view failed:", error);
        }
    }

    public getOutputs(): IOutputs {
        try {
            return {
                screenshot: this._screenshot
            };
        } catch (error) {
            console.error("Getting outputs failed:", error);
            return {};  // Return an empty object if something goes wrong
        }
    }

    public destroy(): void {
        try {
            // Any necessary cleanup code here
        } catch (error) {
            console.error("Destroy method failed:", error);
        }
    }
}
