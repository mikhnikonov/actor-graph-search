// Import required modules
import { initializeGraph } from './graphSearch.js';
import { createUI } from './ui.js';

// Initialize application
async function init() {
    const graph = await initializeGraph();
    if (graph) {
        await createUI(graph);
    }
}

// Start the application
init();