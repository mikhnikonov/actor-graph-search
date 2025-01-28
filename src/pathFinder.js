// Find shortest path between two actors using BFS
export function findPath(graph, startActorName, targetActorName) {
    if (!graph.actors.has(startActorName) || !graph.actors.has(targetActorName)) return null;

    const queue = [[startActorName, []]];
    const visited = new Set();

    while (queue.length > 0) {
        const [currentActor, path] = queue.shift();
        
        if (currentActor === targetActorName) {
            return path;
        }

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