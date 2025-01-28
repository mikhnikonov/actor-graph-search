# ACTOR GRAPH SEARCH

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
   $ yarn start

3. Open browser at http://localhost:8080

🧪 TESTING
----------
Run all tests:
   $ yarn test

Development mode:
   $ yarn test:watch

📁 PROJECT LAYOUT
---------------
src/
 ├─ dataService.js   [Data fetching]
 ├─ graphSearch.js   [Graph structure]
 ├─ pathFinder.js    [BFS algorithm]
 ├─ ui.js           [Interface logic]
 └─ main.js         [Entry point]

🔍 UNDER THE HOOD
----------------
• Graph Theory: Uses a bipartite graph where actors and movies are nodes
• Algorithm: Breadth-First Search (BFS) ensures shortest paths
• Data Structures: Efficient Sets and Maps for quick lookups
• Modern JS: ES6 modules, async/await, and modern APIs

🌐 BROWSER REQUIREMENTS
---------------------
Your browser needs to support:
• ES6 Modules
• Async/Await
• Set & Map

Made with ♥️ using modern JavaScript