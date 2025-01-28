import { findPath } from './pathFinder.js';

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
        this.TARGET_ACTOR = 'Tom Cruise';
    }

    addMovie(movieData) {
        // Create and store new movie node
        const movie = new Movie(movieData.title);
        this.movies.set(movieData.title, movie);

        // Process each actor in the cast
        movieData.cast.forEach(actorName => {
            // Get existing actor or create new one
            let actor = this.actors.get(actorName);
            if (!actor) {
                actor = new Actor(actorName);
                this.actors.set(actorName, actor);
            }
            // Connect movie and actor nodes
            movie.addActor(actor);
        });
    }

    getPath(startActorName) {
        return findPath(this, startActorName, this.TARGET_ACTOR);
    }
}