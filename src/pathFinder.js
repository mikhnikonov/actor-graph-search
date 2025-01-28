// Find shortest path between two actors using BFS
export function findPath(graph, startActorName, targetActorName) {
    // Return null if either actor doesn't exist in the graph
    if (!graph.actors.has(startActorName) || !graph.actors.has(targetActorName)) return null;

    // Queue for BFS: each element is [actorName, pathToActor]
    const queue = [[startActorName, []]];
    // Set to keep track of visited actors to avoid cycles
    const visited = new Set();

    while (queue.length > 0) {
        const [currentActor, path] = queue.shift();
        
        // Return the path if we've reached the target actor
        if (currentActor === targetActorName) {
            return path;
        }

        // Process actor only if we haven't visited them before to avoid infinite loops
        if (!visited.has(currentActor)) {
            visited.add(currentActor);
            const actor = graph.actors.get(currentActor);

            // Explore all movies of current actor
            for (const movie of actor.movies) {
                // Check all costars in each movie
                for (const costar of movie.cast) {
                    if (!visited.has(costar.name)) {
                        queue.push([
                            costar.name, 
                            [...path, {
                                actor: currentActor,
                                movie: movie.title,
                                nextActor: costar.name
                            }]
                        ]);
                    }
                }
            }
        }
    }

    return null; // No path found
}