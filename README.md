# Screenshot Component for PowerApps

## Overview
The Screenshot Component for PowerApps allows users to capture screenshots of their app's interface directly within PowerApps. This is particularly useful for generating visual reports, sharing app states, or saving screen layouts for documentation.

## Features
- Customizable button appearance (size, color, font, etc.).
- Captures screenshots of the entire app screen.
- Option to exclude hidden elements from the screenshot.
- Supports hover effects and responsive design.

## Installation

1. **Download the Component:**
   - Clone or download the component from the repository.

2. **Import the Component into PowerApps:**
   - Navigate to the PowerApps portal.
   - Open your app in edit mode.
   - Select **Insert > Custom > Import Component**.
   - Import the Screenshot Component.

3. **Add the Component to Your App:**
   - Drag and drop the component onto your desired screen.

## Usage

### Basic Setup

1. **Add the Screenshot Button:**
   - Drag the Screenshot Component to your desired screen.

2. **Customize the Button:**
   - Use the properties pane to customize the button’s appearance, including text, color, size, font, and more.

### Advanced Setup

1. **Hiding Elements Before Taking a Screenshot:**
   - If you want to exclude certain elements (e.g., panels, groups, controls) from the screenshot, you can hide them before triggering the screenshot.

   Example:

   - **Step 1:** Add a button (e.g., "Hide Elements") and set its `OnSelect` property to hide the elements.
   - **Step 2:** Add the Screenshot Button and set its `OnSelect` property to capture the screenshot.
   - **Step 3:** Ensure that the elements remain hidden while the screenshot is captured.

   ```powerapps
   // On the "Hide Elements" button
   Set(variable, false);

   // On the Screenshot button
   Set(varScreenshot, ScreenshotComponent1.screenshot);
   ```

   - **Step 4:** After capturing the screenshot, you can set the elements to visible again if needed.

2. **Handling Output:**
   - The screenshot is returned as a base64 string. You can use this output to send the screenshot via email, save it to a data source, or display it in an Image control within PowerApps.

   Example:
   ```powerapps
   Set(varScreenshotImage, ScreenshotComponent1.screenshot);
   ```

## Contributing
If you'd like to contribute to the development of this component, feel free to fork the repository and submit a pull request. We welcome contributions from the community.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Special thanks to the PowerApps community for their continuous support and feedback.
