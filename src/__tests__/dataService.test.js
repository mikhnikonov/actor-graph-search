import { fetchMovieData } from '../dataService';

describe('Data Service', () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    test('should handle successful data fetch', async () => {
        const mockData = {
            movies: [
                { title: 'Movie1', cast: ['Actor1', 'Actor2'] }
            ]
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData)
            })
        );

        const result = await fetchMovieData();
        expect(result.success).toBe(true);
        expect(result.data).toEqual(mockData.movies);
    });

    test('should handle network error', async () => {
        const errorMessage = 'Network error'
        global.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));

        const result = await fetchMovieData();
        expect(result.success).toBe(false);
        expect(result.error).toContain(errorMessage);
    });

    test('should handle invalid JSON', async () => {
        const errorMessage = 'Invalid JSON'
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.reject(new SyntaxError(errorMessage))
            })
        );

        const result = await fetchMovieData();
        expect(result.success).toBe(false);
        expect(result.error).toContain(errorMessage);
    });
});