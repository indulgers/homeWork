function getSolution(f, e) {
    return searchTime(f, e);
  }
  
  function searchTime(f, e) {
    // 临界条件
    if (f === 0 || f === 1 || e === 1) {
      return f;
    }
    let minTime = f;
    // 在每一层进行尝试
    for (let i = 1; i <= f; i++) {
      let time = Math.max(searchTime(i - 1, e - 1), searchTime(f - i, e));
      if (minTime > time + 1) {
        minTime = time + 1;
      }
      // 返回当前情况f、e下的最小尝试次数
    }
    return minTime;
  }
  
  // 测试代码
  console.log(getSolution(10, 2)); // 假设有10层楼和2个鸡蛋