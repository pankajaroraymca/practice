// Memoization in JavaScript is an optimization technique used to cache the results of expensive function calls so that when the same inputs occur again,
//  the cached result is returned instead of redoing the computation.

// Memoriaztion Techniques -

// 1) Manual Memoization: Using plan js object as cache to store results of expensive function calls.

function memoizedAddTo256() {
  var cache = {};

  return function (num) {
    if (num in cache) {
      console.log("cached value");
      return cache[num];
    } else {
      cache[num] = num + 256;
      return cache[num];
    }
  };
}
var memoizedFunc = memoizedAddTo256();

memoizedFunc(20); // Normal return
memoizedFunc(20); // Cached return

// 2) LRU Cache Memoization: Limited size cache to stop umlimited cache growth. Remove the last used result of expensive function call.
// 3) Map Based Memoization: Useful when keys are non-string e.g number etc.
// 4) Weak Map Based Memoization: when keys are objects and you don't wish to prevent it from gc.
// 5) Recursive memoization: Passing the shared cache in recusrsive functions. E.g fibonacci

// shared cache is passed in recusrive function calls.
function fib(n, cache = {}) {
  if (n in cache) return cache[n];
  if (n <= 1) return n;
  cache[n] = fib(n - 1, cache) + fib(n - 2, cache);
  return cache[n];
}
