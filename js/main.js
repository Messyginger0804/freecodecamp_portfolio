// main.js
import createSidebar from './sidebar.js';

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = createSidebar();
    document.body.appendChild(sidebar);

    // Listen for the custom 'project-click' event
    document.addEventListener('project-click', (event) => {
        const project = event.detail.project;

        // Load the project content when the event is triggered
        loadProject(project.link);
    });
});

// Add a popstate event listener for back and forward navigation
window.addEventListener('popstate', (event) => {
    const url = event.state ? event.state.url : '404.html';
    loadProject(url);
});

async function loadProject(url) {
    try {
        // Load HTML content
        const htmlResponse = await fetch(`./projects${url}.html`); // Add a dot before and after the URL

        if (!htmlResponse.ok) {
            throw new Error(`Error loading HTML content from ${url}`);
        }

        const htmlContent = await htmlResponse.text();

        // Instead of replacing the entire content, append it to the body
        document.body.innerHTML = htmlContent;

        // Load CSS styles
        const cssUrl = `./projects${url}.css`; // Add a dot before and after the URL
        const cssResponse = await fetch(cssUrl);

        if (cssResponse.ok) {
            const cssContent = await cssResponse.text();

            // Create a style element and append the CSS content
            const styleElement = document.createElement('style');
            styleElement.textContent = cssContent;

            // Append the style element to the document head
            document.head.appendChild(styleElement);
        }

        // Update the address bar
        history.pushState({ url }, '', url);
    } catch (error) {
        console.error(error);
        // Handle error loading project
    }
}
history.replaceState({ url: window.location.pathname }, '', window.location.pathname);

// const sidebar = createSidebar();
// document.body.appendChild(sidebar);