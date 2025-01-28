import { createUI } from '../ui';

describe('UI Functions', () => {
    // Setup DOM elements before each test
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="loading">Loading...</div>
            <div id="error"></div>
            <div id="search-container" style="display: none;">
                <select id="fromActorSelect"></select>
                <div id="result"></div>
            </div>
        `;
    });

    test('should handle error state', async () => {
        const errorResult = {
            success: false,
            error: 'Test error message'
        };

        await createUI(errorResult);

        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const searchContainer = document.getElementById('search-container');

        expect(loading.style.display).toBe('none');
        expect(error.textContent).toBe('Test error message');
        expect(error.style.display).toBe('block');
        expect(searchContainer.style.display).toBe('none');
    });

    test('should initialize UI with successful data', async () => {
        const mockGraph = {
            actors: new Map([
                ['Actor1', {}],
                ['Actor2', {}],
                ['Tom Cruise', {}]
            ]),
            TARGET_ACTOR: 'Tom Cruise',
            getPath: jest.fn()
        };

        const successResult = {
            success: true,
            data: mockGraph
        };

        await createUI(successResult);

        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const searchContainer = document.getElementById('search-container');
        const select = document.getElementById('fromActorSelect');

        expect(loading.style.display).toBe('none');
        expect(error.style.display).toBe('');
        expect(searchContainer.style.display).toBe('block');
        expect(select.options.length).toBe(2); // Should have Actor1 and Actor2 (excluding Tom Cruise)
    });

    test('should update path when actor is selected', async () => {
        const mockPath = [
            { movie: 'Movie1', nextActor: 'Tom Cruise' }
        ];

        const mockGraph = {
            actors: new Map([
                ['Actor1', {}],
                ['Tom Cruise', {}]
            ]),
            TARGET_ACTOR: 'Tom Cruise',
            getPath: jest.fn().mockReturnValue(mockPath)
        };

        const successResult = {
            success: true,
            data: mockGraph
        };

        await createUI(successResult);

        const select = document.getElementById('fromActorSelect');
        const result = document.getElementById('result');

        // Trigger actor selection
        select.value = 'Actor1';
        select.dispatchEvent(new Event('change'));

        expect(mockGraph.getPath).toHaveBeenCalledWith('Actor1');
        expect(result.innerHTML).toContain('Actor1');
        expect(result.innerHTML).toContain('Movie1');
        expect(result.innerHTML).toContain('Tom Cruise');
    });
});