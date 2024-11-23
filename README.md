# Markdown/HTML Editor

This is a powerful yet easy-to-use **Markdown/HTML editor** built with *[Showdown.js](https://github.com/showdownjs/showdown)*, *[Turndown.js](https://github.com/domchristie/turndown)* and *[CodeMirror 6](https://codemirror.net/)*. It enables seamless writing, conversion, and real-time preview of both Markdown and HTML, making it an ideal tool for SEO professionals, copywriters, and anyone frequently switching between these formats.

## Preview
<img width="100%" alt="markdown-html-editor-v2-preview-rich" src="https://github.com/user-attachments/assets/fe21927d-4207-4535-b7d2-5970557db029">

## Features

- **Enhanced Code Editor**: Powered by CodeMirror 6 for better syntax highlighting and editing experience
- **Markdown Editor**: Write and edit Markdown in the left panel
- **HTML Editor**: See the HTML equivalent of your Markdown in real-time on the right panel
- **Live Preview**: View the HTML-rendered output of your Markdown instantly
- **Clipboard Support**: Paste content directly from your clipboard into the Markdown editor
- **Copy Functionality**: Easily copy the Markdown, HTML, or the previewed content to your clipboard with a single click
- **Customizable Turndown Options**: Adjust conversion settings for HTML to Markdown conversion via a user-friendly options panel. <br><em><a href="https://github.com/mixmark-io/turndown#options" target="_blank">Learn more about Turdown options</a></em>
- **Persistent Preferences**: Your Turndown settings are saved and loaded automatically using `localStorage`
- **Dark/Light Mode Toggle**: Switch between light and dark themes using the toggle button, which dynamically updates the editor theme
- **Improved List Handling**: Better support for nested lists and continuous numbering

## Installation

1. **Download or clone the repository**:
   ```bash
   git clone https://github.com/mxcrml/markdown-html-editor.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd markdown-html-editor
   ```

3. **Open the project** in your browser:
   Simply open the `index.html` file in your browser to use the tool.

## Usage

1. **Write Markdown**: 
   - The left panel is the Markdown editor where you can write your content using standard Markdown syntax.
   
2. **See HTML in Real-Time**:
   - As you type in the Markdown editor, the HTML code is generated automatically and displayed in the right-hand panel under the "HTML" section.
   
3. **Live Preview**:
   - The live HTML-rendered output is also shown in a preview box, so you can see how your Markdown will appear when rendered.

4. **Adjust Turndown Options**:
   - Use the options panel below the buttons to customize how HTML is converted back to Markdown.
   - Options include heading style, bullet list markers, code block style, emphasis delimiters, and more.
   - Changes are applied in real-time, and your preferences are saved for future sessions.

5. **Clipboard Functionality**:
   - **Copy**: Use the respective "Copy" buttons to copy the Markdown, HTML, or previewed content.

6. **Dark/Light Mode**:
   - Click the "Dark Mode/Light Mode" button to toggle between the light and dark themes. The button's text dynamically updates based on the current mode.

## File Structure

- **index.html**: The main HTML file containing the layout of the editor and the options panel.
- **style.css**: Contains the styling for both light and dark themes, as well as styles for the options panel.
- **script.js**: Handles the core functionality, including the conversion between Markdown and HTML, the options management, clipboard features, and the dark/light mode toggle.

## Technologies Used

- **[CodeMirror 6](https://codemirror.net/)**: A versatile text editor implemented in JavaScript for the browser
- **[Showdown.js](https://github.com/showdownjs/showdown)**: A JavaScript library used to convert Markdown to HTML
- **[Turndown.js](https://github.com/domchristie/turndown)**: A JavaScript library used to convert HTML back into Markdown
- **HTML5/CSS3**: For building the structure and styling of the editor
- **JavaScript (ES6)**: For dynamic behavior, clipboard management, and theme toggling

## License

This project is licensed under the CC-BY-4.0 License. See the [LICENSE](LICENSE.md) file for more details.

## About

This Markdown-HTML editor is part of an experiment done with ChatGPT o1.preview and Claude AI to test their development skills.

## Contact

For any questions or feedback, please reach out to [maxime@astralrank.com](mailto:maxime@astralrank.com).
