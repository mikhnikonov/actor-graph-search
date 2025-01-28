export async function fetchMovieData() {
    try {
        const response = await fetch('./data.json');
        if (!response.ok) {
            throw new Error('Failed to load movie data');
        }
        
        const data = await response.json();
        if (!data || !Array.isArray(data.movies)) {
            throw new Error('Invalid movie data format');
        }

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return { 
            success: true, 
            data: data.movies 
        };
    } catch (error) {
        console.error('Error loading movie data:', error);
        return { 
            success: false, 
            error: 'Unable to load movie database. Please try again later.' 
        };
    }
}