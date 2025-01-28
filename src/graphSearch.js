import { findPath } from './pathFinder.js';
import { fetchMovieData } from './dataService.js';

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
        this.actors = new Map();
        this.movies = new Map();
    }

    addMovie(movieData) {
        const movie = new Movie(movieData.title);
        this.movies.set(movieData.title, movie);

        movieData.cast.forEach(actorName => {
            let actor = this.actors.get(actorName);
            if (!actor) {
                actor = new Actor(actorName);
                this.actors.set(actorName, actor);
            }
            movie.addActor(actor);
        });
    }

    findPath(startActorName, targetActorName) {
        return findPath(this, startActorName, targetActorName);
    }
}

export async function initializeGraph() {
    const graph = new MovieGraph();
    const movies = await fetchMovieData();
    
    if (movies) {
        movies.forEach(movie => graph.addMovie(movie));
    }
    
    return graph;
}