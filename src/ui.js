// Function to create and initialize the UI with graph data
export async function createUI(graph) {
    // Get references to DOM elements
    const loading = document.getElementById('loading');
    const searchContainer = document.getElementById('search-container');
    const fromSelect = document.getElementById('fromActorSelect');
    const result = document.getElementById('result');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get sorted list of actor names from the graph
    const sortedActors = [...graph.actors.keys()]
        .filter(name => name !== graph.TARGET_ACTOR)
        .sort();

    sortedActors.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        fromSelect.appendChild(option);
    });

    // Function to update the path display when selections change
    const updatePath = async () => {
        if (!fromSelect.value) {
            result.textContent = '';
            return;
        }
            
        const path = graph.findPath(fromSelect.value);
        
        if (path) {
            const pathElements = [
                `<span class="actor-name">${fromSelect.value}</span>`
            ];
            
            path.forEach((step, index) => {
                const isLastActor = index === path.length - 1;
                const starEmoji = isLastActor ? '⭐' : '';
                
                pathElements.push(
                    `<span class="path-arrow">→</span>`,
                    `<span class="movie-title">${step.movie}</span>`,
                    `<span class="path-arrow">→</span>`,
                    `<span class="actor-name">${starEmoji} ${step.nextActor} ${starEmoji}</span>`
                );
            });
            
            result.innerHTML = pathElements.join(' ');
        } else {
            result.textContent = `No path found to ${graph.TARGET_ACTOR}`;
        }
    };

    // Add event listeners for select changes
    fromSelect.addEventListener('change', updatePath);

    // Hide loading and show search interface
    loading.style.display = 'none';
    searchContainer.style.display = 'block';
}