import { fetchMovieData } from '../dataService';
import { createUI } from '../ui';
import { MovieGraph } from '../models';
import { init } from '../main';

// Mock dependencies
jest.mock('../dataService');
jest.mock('../ui');

describe('Graph Initialization', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('should handle successful data loading', async () => {
        const mockMovies = [
            { title: 'Movie1', cast: ['Actor1', 'Actor2'] }
        ];
        
        fetchMovieData.mockResolvedValue({
            success: true,
            data: mockMovies
        });

        await init();

        expect(fetchMovieData).toHaveBeenCalled();
        expect(createUI).toHaveBeenCalledWith({
            success: true,
            data: expect.any(MovieGraph)
        });
    });

    test('should handle data loading failure', async () => {
        const errorMessage = 'Failed to load data';
        fetchMovieData.mockResolvedValue({
            success: false,
            error: errorMessage
        });

        await init();

        expect(fetchMovieData).toHaveBeenCalled();
        expect(createUI).toHaveBeenCalledWith({
            success: false,
            error: errorMessage
        });
    });
});