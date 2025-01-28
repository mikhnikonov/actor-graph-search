// Import required modules
import { MovieGraph } from './models.js';
import { fetchMovieData } from './dataService.js';
import { createUI } from './ui.js';

async function initializeGraph() {
    const result = await fetchMovieData();
    if (!result.success) {
        return { success: false, error: result.error };
    }
    
    const graph = new MovieGraph();
    result.data.forEach(movie => graph.addMovie(movie));
    return { success: true, data: graph };
}

async function init() {
    const result = await initializeGraph();
    await createUI(result);
}

init();