let n = 400;
let node = new Array(n + 1).fill(0);
let p = Array.from(Array(n + 1), () => new Array(n + 1).fill(0));
let colour = 4;
let b = new Array(n + 1).fill(0);
let g = new Array(100).fill(0);
let h = Array.from(Array(1000), () => new Array(1000).fill(1));

function generateMap(n, density) {
  let map = Array.from(Array(n), () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.random() < density) {
        map[i][j] = map[j][i] = 1;
      }
    }
  }
  return map;
}

function setMapData(n, map) {
  let node = new Array(n + 1).fill(0);
  let p = map;
  let colour = 5;
  let b = new Array(n + 1).fill(0);
  let g = new Array(100).fill(0);
  let h = Array.from(Array(1000), () => new Array(1000).fill(1));
  return { node, p, colour, b, g, h };
}

function deleteColour(x, i) {
  let cl = [];
  for (let j = 1; j <= n; j++) {
    if (p[x][j]) {
      if (h[j][i] && h[j][0]) {
        h[j][i] = 0;
        h[j][colour + 1]--;
        cl.push(j);
      }
    }
  }
  return cl;
}

function recoverColour(y, cl) {
  for (let i = 0; i < cl.length; i++) {
    h[cl[i]][y] = 1;
    h[cl[i]][colour + 1]++;
  }
}

function min() {
  let cout = [];
  let temp = 450;
  for (let i = 1; i <= n; i++) {
    if (h[i][0]) {
      if (h[i][colour + 1] < temp) {
        cout = [i];
        temp = h[i][colour + 1];
      } else if (h[i][colour + 1] === temp) {
        cout.push(i);
      }
    }
  }
  for (let i = 1; i <= n; i++) {
    if (cout.includes(b[i])) {
      return b[i];
    }
  }
}

function dfs(x, next) {
  if (!h[x] || h[x].length <= colour) {
    return 0; // 终止当前递归
  }
  if (next > n) {
    return 1;
  }

  let sum = 0;
  let flag = true;
  for (let i = 1; i <= colour; i++) {
    if (h[x][i]) {
      node[x] = i;
      if (!g[i] && flag) {
        let temp = g[0];
        g[0]--;
        g[i]++;
        let cl = deleteColour(x, i);
        let t = h[x][0];
        h[x][0] = 0;
        let m = min();
        sum += dfs(m, next + 1) * temp;
        recoverColour(i, cl);
        h[x][0] = t;
        g[0]++;
        g[i]--;
        flag = false;
      } else if (g[i]) {
        g[i]++;
        let cl = deleteColour(x, i);
        let t = h[x][0];
        h[x][0] = 0;
        let m = min();
        sum += dfs(m, next + 1);
        h[x][0] = t;
        recoverColour(i, cl);
        g[i]--;
      }
    }
  }
  return sum;
}
function runAnalysis(n, map, runs) {
    let total_time = 0;
    for (let i = 0; i < runs; i++) {
      let { node, p, colour, b, g, h } = setMapData(n, map);
      let start_time = process.hrtime();
      let sum = dfs(1, 1);
      let end_time = process.hrtime(start_time);
      let time = end_time[0] * 1e3 + end_time[1] / 1e6; // 转换为毫秒
      total_time += time;
      console.log("Run " + (i + 1) + ": time - " + time.toFixed(3) + "ms, total - " + sum);
    }
    let average_time = total_time / runs;
    console.log("Average time: " + average_time.toFixed(3) + "ms");
  }
  

let density = 0.1; // 设置边的密度
let map = generateMap(n, density); // 生成地图数据
let runs = 10; // 运行次数
runAnalysis(n, map, runs); // 运行分析
