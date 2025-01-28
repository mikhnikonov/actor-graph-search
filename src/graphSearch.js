// Class representing an actor node in the graph
class Actor {
    constructor(name) {
        this.name = name;
        this.movies = new Set(); // Set of movies the actor has appeared in
    }

    // Add a movie to actor's filmography
    addMovie(movie) {
        this.movies.add(movie);
    }
}

// Class representing a movie node in the graph
class Movie {
    constructor(title) {
        this.title = title;
        this.cast = new Set(); // Set of actors in the movie
    }

    // Add an actor to movie's cast and update actor's filmography
    addActor(actor) {
        this.cast.add(actor);
        actor.addMovie(this);
    }
}

// Class representing the bipartite graph of actors and movies
export class MovieGraph {
    constructor() {
        this.actors = new Map(); // Map of actor names to Actor objects
        this.movies = new Map(); // Map of movie titles to Movie objects
    }

    // Add a movie and its cast to the graph
    addMovie(movieData) {
        const movie = new Movie(movieData.title);
        this.movies.set(movieData.title, movie);

        // Process each actor in the movie's cast
        movieData.cast.forEach(actorName => {
            let actor = this.actors.get(actorName);
            if (!actor) {
                // Create new actor if not exists
                actor = new Actor(actorName);
                this.actors.set(actorName, actor);
            }
            movie.addActor(actor);
        });
    }

    // Find shortest path between two actors using BFS
    findPath(startActorName, targetActorName) {
        if (!this.actors.has(startActorName) || !this.actors.has(targetActorName)) return null;

        const queue = [[startActorName, []]];
        const visited = new Set();

        while (queue.length > 0) {
            const [currentActor, path] = queue.shift();
            
            if (currentActor === targetActorName) {
                return path;
            }

            if (!visited.has(currentActor)) {
                visited.add(currentActor);
                const actor = this.actors.get(currentActor);

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
}

// Initialize graph with data from JSON file
import { fetchMovieData } from './dataService.js';

export async function initializeGraph() {
    const graph = new MovieGraph();
    const movies = await fetchMovieData();
    
    if (movies) {
        movies.forEach(movie => graph.addMovie(movie));
    }
    
    return graph;
}