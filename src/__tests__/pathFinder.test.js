import { findPath } from '../pathFinder';

describe('pathFinder', () => {
    let mockGraph;

    beforeEach(() => {
        // Create a mock graph with test data
        mockGraph = {
            actors: new Map([
                ['Actor1', { name: 'Actor1', movies: new Set([{ title: 'Movie1', cast: new Set([{ name: 'Actor2' }]) }]) }],
                ['Actor2', { name: 'Actor2', movies: new Set([{ title: 'Movie1', cast: new Set([{ name: 'Actor1' }]) }]) }]
            ])
        };
    });

    test('should find path between connected actors', () => {
        const path = findPath(mockGraph, 'Actor1', 'Actor2');
        expect(path).toEqual([{
            actor: 'Actor1',
            movie: 'Movie1',
            nextActor: 'Actor2'
        }]);
    });

    test('should return null for disconnected actors', () => {
        mockGraph.actors.set('Actor3', { name: 'Actor3', movies: new Set() });
        const path = findPath(mockGraph, 'Actor1', 'Actor3');
        expect(path).toBeNull();
    });

    test('should return null for non-existent actors', () => {
        const path = findPath(mockGraph, 'Actor1', 'NonExistentActor');
        expect(path).toBeNull();
    });
});