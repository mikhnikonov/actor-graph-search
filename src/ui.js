// Populates select element with sorted actor names
export function appendActorOptions(graph, fromSelect) {
    // Get all actors except Tom Cruise and sort them
    const sortedActors = [...graph.actors.keys()]
        .filter(name => name !== graph.TARGET_ACTOR)
        .sort();

    // Create and append option elements
    sortedActors.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        fromSelect.appendChild(option);
    });
}

// Creates HTML markup showing the path between actors through movies
export function createPathDisplay(fromActor, path) {
    if (!path || path.length === 0) {
        return null;
    }

    // Start with the initial actor
    const pathElements = [
        `<span class="actor-name">${fromActor}</span>`
    ];
    
    // Build the chain: actor -> movie -> actor -> movie -> ...
    path.forEach((step, index) => {
        const isLastActor = index === path.length - 1;
        const starEmoji = isLastActor ? '⭐' : '';
        
        pathElements.push(
            `<span class="path-arrow">→</span>`,
            `<span class="movie-title">${step.movie}</span>`,
            `<span class="path-arrow">→</span>`,
            `<span class="actor-name">${starEmoji}${step.nextActor}${starEmoji}</span>`
        );
    });
    
    return pathElements.join(' ');
}

// Updates the result display when a new actor is selected
export function updatePath(graph, fromSelect) {
    const resultElement = document.getElementById('result');
    // Clear result if no actor selected
    if (!fromSelect.value) {
        resultElement.textContent = '';
        return;
    }
        
    // Find and display the path or show "not found" message
    const path = graph.getPath(fromSelect.value);
    const pathMarkup = createPathDisplay(fromSelect.value, path);
    
    resultElement.innerHTML = pathMarkup || `No path found to ${graph.TARGET_ACTOR}`;
}

// Initializes the UI and sets up event handlers
export async function createUI(graphResult) {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const searchContainer = document.getElementById('search-container');

    if (!graphResult.success) {
        loading.style.display = 'none';
        error.textContent = graphResult.error;
        error.style.display = 'block';
        return;
    }

    const graph = graphResult.data;
    const fromSelect = document.getElementById('fromActorSelect');

    appendActorOptions(graph, fromSelect)
    fromSelect.addEventListener('change', () => updatePath(graph, fromSelect));

    loading.style.display = 'none';
    searchContainer.style.display = 'block';
}