class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function closestPairOnePass(points) {
    const sortedPoints = points.slice().sort((a, b) => a.x - b.x);

    let closestPair = [];
    let minDistance = Infinity;
    let leftIndex = 0;
    let rightIndex = 1;

    while (rightIndex < sortedPoints.length) {
        const leftPoint = sortedPoints[leftIndex];
        const rightPoint = sortedPoints[rightIndex];
        const distance = calculateDistance(leftPoint, rightPoint);

        if (distance < minDistance) {
            closestPair = [leftPoint, rightPoint];
            minDistance = distance;
        }

        if (rightIndex - leftIndex === 1 || rightPoint.y - leftPoint.y < minDistance) {
            rightIndex++;
        } else {
            leftIndex++;
        }
    }

    return closestPair;
}

function calculateDistance(point1, point2) {
    return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

function generateRandomPoints(n, minX, maxX, minY, maxY) {
    const points = [];
    for (let i = 0; i < n; i++) {
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        points.push(new Point(x, y));
    }
    return points;
}

const numPoints = [100000, 300000, 500000, 700000,1000000];

for (const n of numPoints) {
    const points = generateRandomPoints(n, 0, 1000, 0, 1000);
    console.log(`点的数量: ${n}`);

    console.time("分治一趟");
    console.log("分治一趟:", closestPairOnePass(points));
    console.timeEnd("分治一趟");

    console.log("--------------------");
}
