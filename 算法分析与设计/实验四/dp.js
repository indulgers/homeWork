// 定义备忘录，消除重叠子问题
const memo = new Map();

function getSolution(f, e) {
  return searchTime(f, e);
}

// 辅助方法：表示当有e个鸡蛋面对f层楼时，至少需要dp(k, n)次操作才能得到答案
function searchTime(f, e) {
  // base case
  if (f === 0 || f === 1 || e === 1) {
    return f;
  }

  const key = `${e},${f}`;
  if (memo.has(key)) { // 如果备忘录有搜索记录，直接返回
    return memo.get(key);
  }

  // 状态转移
  let res = Infinity;
  for (let i = 1; i <= f; i++) {
    // 在第i层扔鸡蛋
    // 如果碎了，鸡蛋数减一，搜索楼层范围缩小至i-1
    // 如果没碎，鸡蛋数不变，搜索楼层范围变为f-i
    res = Math.min(res, 1 + Math.max(searchTime(i - 1, e - 1), searchTime(f - i, e)));
  }

  memo.set(key, res); // 将结果添加到备忘录

  return res;
}

// 测试代码
console.log(getSolution(10, 2)); // 假设有10层楼和2个鸡蛋