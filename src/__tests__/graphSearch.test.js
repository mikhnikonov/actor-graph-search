import { MovieGraph } from '../models';

describe('MovieGraph', () => {
    let graph;

    beforeEach(() => {
        graph = new MovieGraph();
    });

    test('should add movie and actors to graph', () => {
        const movieData = {
            title: 'Test Movie',
            cast: ['Actor1', 'Actor2']
        };

        graph.addMovie(movieData);

        expect(graph.movies.has('Test Movie')).toBeTruthy();
        expect(graph.actors.has('Actor1')).toBeTruthy();
        expect(graph.actors.has('Actor2')).toBeTruthy();
    });

    test('should connect actors through movies', () => {
        const movieData = {
            title: 'Test Movie',
            cast: ['Actor1', 'Actor2']
        };

        graph.addMovie(movieData);
        const actor1 = graph.actors.get('Actor1');
        const movie = graph.movies.get('Test Movie');

        expect(actor1.movies.has(movie)).toBeTruthy();
        expect(movie.cast.has(actor1)).toBeTruthy();
    });
});