// 定义备忘录，消除重叠子问题
const memo = new Map();

function getSolution(f, e) {
  return searchTime(f, e);
}

// 辅助方法：dp()表示当有k个鸡蛋面对n层楼时，至少需要dp(k, n)次操作才能得到答案
function searchTime(f, e) {
  // base case
  if (f === 0 || f === 1 || e === 1) {
    return f;
  }

  const key = `${e},${f}`;
  // 如果备忘录有搜索记录，直接返回
  if (memo.has(key)) {
    return memo.get(key);
  }

  // 状态转移
  let res = Infinity;
  // 二分搜索
  let low = 1, high = f;
  while (low <= high) {
    let mid = low + Math.floor((high - low) / 2);
    let broken = searchTime(mid - 1, e - 1); // 鸡蛋碎了
    let notBroken = searchTime(f - mid, e); // 鸡蛋没碎
    if (broken > notBroken) {
      high = mid - 1;
      res = Math.min(res, broken + 1);
    } else {
      low = mid + 1;
      res = Math.min(res, notBroken + 1);
    }
  }
  // 将结果添加到备忘录
  memo.set(key, res);

  return res;
}

// 测试代码
console.log(getSolution(10, 2)); // 假设有10层楼和2个鸡蛋