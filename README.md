Actor Graph Search

A web application that finds the shortest path between any two actors through their movie collaborations.

Features
- Builds a graph of actor connections through movies
- Finds shortest path between two actors using BFS algorithm
- Interactive UI with dropdown selection of actors
- Real-time path calculation and display

Installation
------------
## Install dependencies
yarn install

Development

## Start development server
yarn start

# Testing

## Run tests
yarn test

## Run tests in watch mode
yarn test:watch

Project Structure
---------------
/
├── src/
│   ├── dataService.js    # Data fetching logic
│   ├── graphSearch.js    # Graph and node classes
│   ├── pathFinder.js     # Path finding algorithm
│   ├── ui.js            # UI rendering logic
│   └── main.js          # Application entry point
├── data.json            # Movie and actor data
└── index.html          # Main HTML file

Algorithm
---------
The application uses Breadth-First Search (BFS) to find the shortest path between actors through their movie collaborations. This ensures the path with the minimum number of intermediary actors is found.

Implementation Details
--------------------
- Uses ES6 modules for code organization
- Implements a bipartite graph structure (actors and movies as nodes)
- Utilizes Sets and Maps for efficient data storage and lookup
- Employs async/await for data fetching
- Includes Jest testing framework for unit tests