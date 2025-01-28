export async function fetchMovieData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        return data.movies;
    } catch (error) {
        console.error('Error loading movie data:', error);
        return null;
    }
}