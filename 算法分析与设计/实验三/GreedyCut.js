const fs = require('fs');

let n = 450;
let node = new Array(n + 1).fill(0);
let p = Array.from(Array(n + 1), () => new Array(n + 1).fill(0));
let colour = 5;
let b = new Array(n + 1).fill(0);
let g = new Array(100).fill(0);
let h = Array.from(Array(1000), () => new Array(1000).fill(1));

function set() {
  let data = fs.readFileSync('le450_5a.col', 'utf8');
  let lines = data.split('\n');
  for (let line of lines) {
    if (line[0] === 'e') {
      let [_, u, v] = line.split(' ').map(Number);
      p[u][v] = p[v][u] = 1;
    }
  }

  // 重新排列节点，按照节点的度数降序排列
  let degrees = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      degrees[i] += p[i][j];
    }
  }
  let sortedNodes = Array.from({ length: n }, (_, index) => index + 1);
  sortedNodes.sort((a, b) => degrees[b] - degrees[a]);

  // 重新构建邻接矩阵
  let newP = Array.from(Array(n + 1), () => new Array(n + 1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      newP[i][j] = p[sortedNodes[i - 1]][sortedNodes[j - 1]];
    }
  }
  p = newP;

  // 重新初始化颜色数、着色数组等
  let a = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      a[i] += p[i][j];
    }
  }

  let m = 1;
  for (let i = 1; i <= n; i++) {
    let t = 1;
    for (let j = 2; j <= n; j++) {
      if (a[t] < a[j]) t = j;
    }
    b[m++] = t;
    a[t] = -1;
  }
  g[0] = colour;
  for (let i = 1; i <= n; i++) {
    h[i][colour + 1] = colour;
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= colour; j++) {
      h[i][j] = 1;
    }
  }
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

set();
let start_time = Date.now();
let sum = dfs(1, 1);
let end_time = Date.now();
let time = (end_time - start_time) / 1000;
console.log("\ntime: " + time);
console.log("总数" + sum);
