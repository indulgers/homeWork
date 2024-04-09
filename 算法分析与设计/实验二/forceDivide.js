class Point {
  constructor(x, y) {
      this.x = x;
      this.y = y;
  }
}

function bruteForceClosestPair(points) {
  let minDistance = Infinity;
  let closestPair = [];

  for (let i = 0; i < points.length - 1; i++) {
      for (let j = i + 1; j < points.length; j++) {
          const distance = calculateDistance(points[i], points[j]);
          if (distance < minDistance) {
              minDistance = distance;
              closestPair = [points[i], points[j]];
          }
      }
  }

  return closestPair;
}

function closestPairDivideAndConquer(points) {
  // Sort points by x-coordinate
  const sortedPoints = points.slice().sort((a, b) => a.x - b.x);

  // Recursive function to find closest pair
  function closestPairRec(sortedX, sortedY) {
      const n = sortedX.length;

      if (n <= 3) {
          return bruteForceClosestPair(sortedX);
      }

      // Divide the points into left and right halves
      const midIndex = Math.floor(n / 2);
      const midPoint = sortedX[midIndex];
      const leftX = sortedX.slice(0, midIndex);
      const rightX = sortedX.slice(midIndex);

      // Split points into left and right based on midPoint's x-coordinate
      const leftY = [];
      const rightY = [];
      for (const point of sortedY) {
          if (point.x <= midPoint.x) {
              leftY.push(point);
          } else {
              rightY.push(point);
          }
      }

      // Recursively find closest pairs in left and right halves
      const closestLeft = closestPairRec(leftX, leftY);
      const closestRight = closestPairRec(rightX, rightY);

      // Find the closest pair overall
      let minDistance;
      let closestPair;
      if (closestLeft && closestRight) {
          const distLeft = calculateDistance(closestLeft[0], closestLeft[1]);
          const distRight = calculateDistance(closestRight[0], closestRight[1]);
          if (distLeft < distRight) {
              minDistance = distLeft;
              closestPair = closestLeft;
          } else {
              minDistance = distRight;
              closestPair = closestRight;
          }
      } else if (closestLeft) {
          minDistance = calculateDistance(closestLeft[0], closestLeft[1]);
          closestPair = closestLeft;
      } else if (closestRight) {
          minDistance = calculateDistance(closestRight[0], closestRight[1]);
          closestPair = closestRight;
      }

      // Check for closest pairs across the division line
      const strip = [];
      for (const point of sortedY) {
          if (Math.abs(point.x - midPoint.x) < minDistance) {
              strip.push(point);
          }
      }

      for (let i = 0; i < strip.length - 1; i++) {
          for (let j = i + 1; j < Math.min(i + 7, strip.length); j++) {
              const distance = calculateDistance(strip[i], strip[j]);
              if (distance < minDistance) {
                  minDistance = distance;
                  closestPair = [strip[i], strip[j]];
              }
          }
      }

      return closestPair;
  }

  // Sort points by y-coordinate
  const sortedY = points.slice().sort((a, b) => a.y - b.y);

  return closestPairRec(sortedPoints, sortedY);
}

function calculateDistance(point1, point2) {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

// Generate random points
function generateRandomPoints(n, minX, maxX, minY, maxY) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        points.push(new Point(x, y));
    }
    return points;
}

// Test the algorithms with 100,000 points
const points = generateRandomPoints(500000, 0, 1000, 0, 1000);
console.time("bruteForceClosestPair");
console.log("Brute Force Closest Pair:", bruteForceClosestPair(points));
console.timeEnd("bruteForceClosestPair");

console.time("closestPairDivideAndConquer");
console.log("Divide and Conquer Closest Pair:", closestPairDivideAndConquer(points));
console.timeEnd("closestPairDivideAndConquer");
