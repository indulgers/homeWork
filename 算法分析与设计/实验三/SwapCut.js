const fs = require('fs');

let n = 450;
let node = new Array(n + 1).fill(0);
let p = Array.from(Array(n + 1), () => new Array(n + 1).fill(0));
let colour = 25;
let b = new Array(n + 1).fill(0);
let g = new Array(100).fill(0);
let h = Array.from(Array(1000), () => new Array(1000).fill(1));

function set() {
  let data = fs.readFileSync('le450_25a.col', 'utf8');
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

let start_time = Date.now();
let total_time = 0;
let total_sum = 0;
for (let i = 0; i < 20; i++) {
  set();
  let sum = dfs(1, 1);
  total_sum += sum;
  let end_time = Date.now();
  let time = (end_time - start_time) / 1000;
  total_time += time;
}
let avg_time = total_time / 20;
let avg_sum = total_sum / 20;
console.log("\navg_time: " + avg_time);
console.log("avg_sum: " + avg_sum);
