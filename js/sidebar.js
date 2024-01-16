import { projectLinks } from "./project.js";

export default function createSidebar() {
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar fixed top-0 right-0 h-full overflow-y-scroll bg-blue-800/90 text-white w-1/4 px-12 pt-10 pb-24 overflow-y-auto z-[999]';

    // ... (existing code)

    const projects = projectLinks; // Assuming you have the array defined

    projects.map((project) => {
        const listItem = document.createElement('div');
        listItem.className = 'mb-2 bg-gray-200 text-gray-900 w-full cursor-pointer rounded-md transition duration-300 hover:bg-gray-300 project-link';
        listItem.dataset.path = project.link;

        const innerDiv = document.createElement('div');
        innerDiv.textContent = project.name;
        innerDiv.className = 'p-2';

        innerDiv.addEventListener('click', () => {
            // Dispatch a custom event with project information
            const projectClickEvent = new CustomEvent('project-click', {
                detail: { project },
            });
            document.dispatchEvent(projectClickEvent);
        });

        listItem.appendChild(innerDiv);
        sidebar.appendChild(listItem);
    });

    // ... (existing code)

    document.body.appendChild(sidebar);
    return sidebar;
}
