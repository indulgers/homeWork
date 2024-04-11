class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function bruteForceClosestPairWithinStrip(strip, minDistance) {
    let closestPair = [];
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

function closestPairOnePass(points) {
    const sortedPoints = points.slice().sort((a, b) => a.x - b.x);
    let closestPair = [];
    let minDistance = Infinity;
    let leftIndex = 0;
    let rightIndex = 0;
    let rectBottom = sortedPoints[0].y;

    while (rightIndex < sortedPoints.length) {
        const leftPoint = sortedPoints[leftIndex];
        const rightPoint = sortedPoints[rightIndex];
        const distance = calculateDistance(leftPoint, rightPoint);

        if (distance < minDistance) {
            closestPair = [leftPoint, rightPoint];
            minDistance = distance;
        }

        if (rightIndex < sortedPoints.length - 1) {
            rightIndex++;
        } else {
            if (leftIndex < sortedPoints.length - 1) {
                leftIndex++;
                rectBottom = sortedPoints[leftIndex].y;
            }
            while (rightIndex < sortedPoints.length - 1 && sortedPoints[rightIndex + 1].y <= rectBottom) {
                rightIndex++;
            }
        }
    }

    return closestPair;
}

function closestPairDivideAndConquerPartBrute(points) {
    const sortedPoints = points.slice().sort((a, b) => a.x - b.x);

    function closestPairRec(sortedX, sortedY) {
        const n = sortedX.length;

        if (n <= 3) {
            return bruteForceClosestPairWithinStrip(sortedY, Infinity);
        }

        const midIndex = Math.floor(n / 2);
        const midPoint = sortedX[midIndex];
        const leftX = sortedX.slice(0, midIndex);
        const rightX = sortedX.slice(midIndex);

        const leftY = [];
        const rightY = [];
        for (const point of sortedY) {
            if (point.x <= midPoint.x) {
                leftY.push(point);
            } else {
                rightY.push(point);
            }
        }

        const closestLeft = closestPairRec(leftX, leftY);
        const closestRight = closestPairRec(rightX, rightY);

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

        const strip = [];
        for (const point of sortedY) {
            if (Math.abs(point.x - midPoint.x) < minDistance) {
                strip.push(point);
            }
        }

        const closestInStrip = bruteForceClosestPairWithinStrip(strip, minDistance);

        if (closestInStrip.length > 0) {
            const distStrip = calculateDistance(closestInStrip[0], closestInStrip[1]);
            if (distStrip < minDistance) {
                minDistance = distStrip;
                closestPair = closestInStrip;
            }
        }

        return closestPair;
    }

    const sortedY = points.slice().sort((a, b) => a.y - b.y);

    return closestPairRec(sortedPoints, sortedY);
}

function closestPairDivideAndConquer(points) {
    const sortedPoints = points.slice().sort((a, b) => a.x - b.x);

    function closestPairRec(sortedX, sortedY) {
        const n = sortedX.length;

        if (n <= 3) {
            return bruteForceClosestPairWithinStrip(sortedY, Infinity);
        }

        const midIndex = Math.floor(n / 2);
        const midPoint = sortedX[midIndex];
        const leftX = sortedX.slice(0, midIndex);
        const rightX = sortedX.slice(midIndex);

        const leftY = [];
        const rightY = [];
        for (const point of sortedY) {
            if (point.x <= midPoint.x) {
                leftY.push(point);
            } else {
                rightY.push(point);
            }
        }

        const closestLeft = closestPairRec(leftX, leftY);
        const closestRight = closestPairRec(rightX, rightY);

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

    const sortedY = points.slice().sort((a, b) => a.y - b.y);

    return closestPairRec(sortedPoints, sortedY);
}

function calculateDistance(point1, point2) {
    if (!point1 || !point2) {
        return Infinity; // 或者其他适当的值
    }
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

    console.time("分治多趟");
    console.log("分治多趟:", closestPairDivideAndConquer(points));
    console.timeEnd("分治多趟");

    console.time("分治部分蛮力");
    console.log("分治部分蛮力:", closestPairDivideAndConquerPartBrute(points));
    console.timeEnd("分治部分蛮力");

    console.log("--------------------");
}


document.getElementById('runAlgorithms').addEventListener('click', function() {
    // 生成随机点
    const numPoints = [100, 300, 500, 700, 1000]; // 减少点数量以避免性能问题
    for (const n of numPoints) {
        const points = generateRandomPoints(n, 0, 1000, 0, 1000);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML += `<h2>点的数量: ${n}</h2>`;

        // 执行分治多趟算法
        console.time("分治多趟");
        const divConquerResult = closestPairDivideAndConquer(points);
        console.timeEnd("分治多趟");
        resultsDiv.innerHTML += `<p>分治多趟: (${divConquerResult[0].x},${divConquerResult[0].y}) 和 (${divConquerResult[1].x},${divConquerResult[1].y})</p>`;

        // 执行分治部分蛮力算法
        console.time("分治部分蛮力");
        const divConquerPartBruteResult = closestPairDivideAndConquerPartBrute(points);
        console.timeEnd("分治部分蛮力");
        resultsDiv.innerHTML += `<p>分治部分蛮力: (${divConquerPartBruteResult[0].x},${divConquerPartBruteResult[0].y}) 和 (${divConquerPartBruteResult[1].x},${divConquerPartBruteResult[1].y})</p>`;

        resultsDiv.innerHTML += "<hr>";
    }
});
