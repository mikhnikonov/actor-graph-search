# ACTOR GRAPH SEARCH

[![cov](https://mikhnikonov.github.io/actor-graph-search/badges/coverage.svg)](https://github.com/mikhnikonov/actor-graph-search/actions)

Find connections between actors through their movie collaborations!

✨ WHAT IT DOES
--------------
Enter any two actors and discover how they're connected through their movie collaborations. 
The app finds the shortest path between them, showing you the movies and actors that connect them.

Example:
Julia Roberts → Eat Pray Love → Richard Jenkins → Spotlight → Mark Ruffalo

🚀 QUICK START
-------------
1. Install dependencies:
   $ yarn install

2. Start development server:
   $ yarn dev

3. Open browser at http://localhost:8080

🧪 TESTING
----------
Run all tests:
   $ yarn test

Development mode:
   $ yarn test:watch

📁 PROJECT LAYOUT
---------------
public/
 ├─ index.html &nbsp; &nbsp; &nbsp;	[Main HTML]
 ├─ index.js	&nbsp; &nbsp; &nbsp; [Browser entry point]
 ├─ styles.css	&nbsp; &nbsp; &nbsp; [Styling]
 └─ data.json	&nbsp; &nbsp; &nbsp; [Movie database]

src/
 ├─ models.js	&nbsp; &nbsp; &nbsp; [Graph structure]
 ├─ pathFinder.js	&nbsp; &nbsp; &nbsp; [BFS algorithm]
 ├─ dataService.js	&nbsp; &nbsp; &nbsp; [Data fetching]
 ├─ ui.js	&nbsp; &nbsp; &nbsp; [Interface logic]
 └─ main.js	&nbsp; &nbsp; &nbsp; [App initialization]

🔍 UNDER THE HOOD
----------------
• Graph Theory: Uses a bipartite graph where actors and movies are nodes
• Algorithm: Breadth-First Search (BFS) ensures shortest paths
• Data Structures: Efficient Sets and Maps for quick lookups

🌐 BROWSER REQUIREMENTS
---------------------
Your browser needs to support:
• ES6 Modules
• Async/Await
• Set & Map

💡 POSSIBLE IMPROVEMENTS
---------------------
1. Testing Enhancements:
   • Visual regression testing with Percy or Chromatic
   • E2E testing with Cypress
   • Snapshot testing for UI components

2. Analytics & Monitoring:
   • User behavior tracking with Mixpanel
   • Performance monitoring with Web Vitals
   • Error tracking with Sentry

3. User Experience:
   • Autocomplete for actor search
   • Visualization of the actor-movie graph with d3
   • Dark/Light theme support 

4. Performance:
   • Data caching strategy
   • Progressive loading for large datasets
   • Service Worker for offline support

Made with ♥️ using modern JavaScript