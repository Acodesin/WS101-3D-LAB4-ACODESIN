var http = require('http');
var server = http.createServer( (request, response) => {
  response.end('Versions: ' + JSON.stringify(process.versions));
});
server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});

// Problem 26: Restaurant Menu Planner

const menu = [
  { name: "Margherita Pizza", category: "Main", price: 400, prepTime: 15 },
  { name: "Caesar Salad", category: "Starter", price: 200, prepTime: 10 },
  { name: "Grilled Salmon", category: "Main", price: 400, prepTime: 20 },
  { name: "Chocolate Cake", category: "Dessert", price: 200, prepTime: 12 },
  { name: "Garlic Bread", category: "Starter", price: 200, prepTime: 8 }
];

// 1. Calculate average price
function calculateAveragePrice(items) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return (total / items.length).toFixed(2);
}

// 2. Filter items by category
function filterByCategory(items, category) {
  return items.filter(item => item.category === category);
}

// 3. Find the most expensive item
function findMostExpensive(items) {
  return items.reduce((prev, current) =>
    current.price > prev.price ? current : prev
  );
}

// 4. Group items by preparation time ranges
// Ranges: short (0-10), medium (11-20), long (21+)
function groupByPrepTime(items) {
  const groups = { short: [], medium: [], long: [] };
  items.forEach(item => {
    if (item.prepTime <= 10) groups.short.push(item);
    else if (item.prepTime <= 20) groups.medium.push(item);
    else groups.long.push(item);
  });
  return groups;
}

// 5. Simulate fetching new menu items asynchronously
function fetchNewMenuItems() {
  return new Promise(resolve => {
    console.log("\nFetching new menu items...");
    setTimeout(() => {
      const newItems = [
        { name: "Tiramisu", category: "Dessert", price: 400, prepTime: 15 },
        { name: "Bruschetta", category: "Starter", price: 200, prepTime: 7 }
      ];
      resolve(newItems);
    }, 2000); // 2-second delay
  });
}

// Program Execution
console.log("=== Restaurant Menu Planner ===");
console.log("\n1. Average price of all items:", calculateAveragePrice(menu));

console.log("\n2. Filtered by category 'Starter':");
console.log(filterByCategory(menu, "Starter"));

console.log("\n3. Most expensive item:");
console.log(findMostExpensive(menu));

console.log("\n4. Grouped by preparation time:");
console.log(groupByPrepTime(menu));

// Fetch new items asynchronously
fetchNewMenuItems().then(newItems => {
  console.log("\n5. New menu items fetched:");
  console.log(newItems);
});