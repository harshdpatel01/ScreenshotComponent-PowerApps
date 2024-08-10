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
        this._container = container;
        this._notifyOutputChanged = notifyOutputChanged;
        this._buttonText = context.parameters.buttonText.raw || "Take Screenshot";
        this.renderButton(context);  // Render the button with styles and event listeners
    }

    // Create and style the button element
    private renderButton(context: ComponentFramework.Context<IInputs>): void {
        this._button = document.createElement('button');
        this._button.innerText = this._buttonText;
        this.applyStyles(context);  // Apply the styles from the context parameters
        this._button.onclick = () => this.handleButtonClick(context);  // Set the click event handler
        this._container.appendChild(this._button);  // Add the button to the container
    }

    // Handle the button click to capture the screenshot
    private handleButtonClick(context: ComponentFramework.Context<IInputs>): void {
        this._button.disabled = true;  // Disable the button during processing
        this._button.style.opacity = "0.6";  // Dim the button to indicate it's disabled

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
                this._screenshot = canvas.toDataURL('image/png');  // Convert the canvas to a base64 PNG
                this._notifyOutputChanged();  // Notify PowerApps that the screenshot is ready
                this._button.disabled = false;  // Re-enable the button
                this._button.style.opacity = "1.0";  // Restore the button's appearance

                // Restore hidden elements' visibility
                elementsToHide.forEach((element) => {
                    element.style.display = '';
                });
            }).catch(error => {
                console.error("Screenshot capture failed:", error);  // Log errors to console
                this._button.disabled = false;  // Re-enable the button if an error occurs
                this._button.style.opacity = "1.0";  // Restore the button's appearance
            });
        }, 500);  // Adjust this delay if necessary
    }

    // Apply styles to the button based on the context parameters
    private applyStyles(context: ComponentFramework.Context<IInputs>): void {
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
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this._button.innerText = context.parameters.buttonText.raw || this._buttonText;  // Update button text
        this.applyStyles(context);  // Reapply styles if any parameters changed
    }

    public getOutputs(): IOutputs {
        return {
            screenshot: this._screenshot
        };
    }

    public destroy(): void {
        // Any necessary cleanup code here
    }
}