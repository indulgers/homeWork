const fs = require('fs');

let n = 450;
let node = new Array(n + 1).fill(0);
let sum = 0;
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

  let a = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      a[i] += p[i][j];
    }
  }

  for (let i = 1; i <= n; i++) {
    let maxIndex = 1;
    for (let j = 2; j <= n; j++) {
      if (a[maxIndex] < a[j]) {
        maxIndex = j;
      }
    }
    b[i] = maxIndex;
    a[maxIndex] = -1;
  }
  g[0] = colour;
  for (let i = 1; i <= n; i++) {
    h[i][colour + 1] = colour;
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
  let minIndex = 1;
  let minCount = 450;
  for (let i = 1; i <= n; i++) {
    if (h[i][0] && h[i][colour + 1] < minCount) {
      minCount = h[i][colour + 1];
      minIndex = i;
    }
  }
  return minIndex;
}

function dfs(x, next) {
  if (next > n) {
    sum++;
    return;
  }
  for (let i = 1; i <= colour; i++) {
    if (h[x][i]) {
      let cl = deleteColour(x, i);
      let t = h[x][0];
      h[x][0] = 0;
      let m = min();
      dfs(m, next + 1);
      h[x][0] = t;
      recoverColour(i, cl);
    }
  }
}

set();
let start_time = Date.now();
dfs(1, 1);
let end_time = Date.now();
let time = (end_time - start_time) / 1000;
console.log("\ntime: " + time);
console.log("总数" + sum);