// Function to create and initialize the UI with graph data
export async function createUI(graph) {
    // Get references to DOM elements
    const loading = document.getElementById('loading');
    const searchContainer = document.getElementById('search-container');
    const fromSelect = document.getElementById('fromActorSelect');
    const toSelect = document.getElementById('toActorSelect');
    const result = document.getElementById('result');

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get sorted list of actor names from the graph
    const sortedActors = [...graph.actors.keys()].sort();
    
    // Populate both select dropdowns with actor names
    sortedActors.forEach(name => {
        // Create and populate "from" actor option
        const fromOption = document.createElement('option');
        fromOption.value = name;
        fromOption.textContent = name;
        fromSelect.appendChild(fromOption);

        // Create and populate "to" actor option
        const toOption = document.createElement('option');
        toOption.value = name;
        toOption.textContent = name;
        toSelect.appendChild(toOption);
    });

    // Function to update the path display when selections change
    const updatePath = async () => {
        // Show loading message
        result.textContent = 'Calculating path...';
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find path between selected actors
        const path = graph.findPath(fromSelect.value, toSelect.value);
        if (path) {
            // Build path string starting with first actor
            let pathText = fromSelect.value;
            path.forEach(step => {
                pathText += ` → ${step.movie} → ${step.nextActor}`;
            });
            result.textContent = pathText;
        } else {
            result.textContent = 'No path found between selected actors';
        }
    };

    // Add event listeners for select changes
    fromSelect.addEventListener('change', updatePath);
    toSelect.addEventListener('change', updatePath);

    // Hide loading and show search interface
    loading.style.display = 'none';
    searchContainer.style.display = 'block';
}