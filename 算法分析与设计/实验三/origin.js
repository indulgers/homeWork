let map = [
    [0, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 0, 1, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 1],
    [0, 0, 0, 1, 1, 0, 1, 1, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 1, 1, 0, 1, 0]
];

let nodeNum = map.length; // 节点数量
let colorNum = 4; // 颜色数量
let colors = new Array(nodeNum).fill(0); // 存储每个节点的颜色，初始值为0表示未着色
let solutionCount = 0; // 解的数量
let startTime = Date.now(); // 开始时间

// 检查节点node是否可以染成color
function isValid(node, color) {
  for (let i = 0; i < nodeNum; i++) {
    if (map[node][i] && colors[i] == color) {
      return false;
    }
  }
  return true;
}

// 回溯搜索
function backtracking(node) {
  if (node == nodeNum) { // 所有节点都染色完毕
    solutionCount++;
    return;
  }

  for (let color = 1; color <= colorNum; color++) {
    if (isValid(node, color)) {
      colors[node] = color; // 记录节点的颜色
      backtracking(node + 1);
      colors[node] = 0; // 回溯
    }
  }
}

backtracking(0);
let endTime = Date.now(); // 结束时间
let timeInSeconds = (endTime - startTime) / 1000; // 计算运行时间（秒）

console.log("解决方案的个数为：" + solutionCount);
console.log("运行时间为：" + timeInSeconds + "秒");
