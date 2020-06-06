# 基础

## 基本使用

```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

resolve 和 reject 的参数会传递给回调函数。

## 如果 resolve 的参数是 promise

```javascript
const p1 = new Promise(function (resolve, reject) {});
const p2 = new Promise(function (resolve, reject) {
  resolve(p1);
});
```

此时 p1 的状态会传递给 p2。p2 的状态将会由 p1 来决定。
p1 padding：p2 padding
p1 resolve | reject：p2 将会立即执行

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("fail")), 3000);
});

const p2 = new Promise(function (resolve, reject) {
  // 虽然p2 1s 后已经resolve 了。
  // 但是因为resolve返回的是另一个promise 导致了此时 p2 的成功状态无效了
  setTimeout(() => resolve(p1), 1000);
});
// 3s 后p1 失败。导致 p2 也失败了触发了 catch
p2.then((result) => console.log(result)).catch((error) => console.log(error));
// Error: fail
```

## promise 的 then

1. then 的第一个参数是 resolve 时候的回调函数。第二个参数是 reject 状态的回调函数。
2. then 返回的是一个新的 promise 实例。
3. then 如果 return 的是一个 promise 后续的 then 会等待 promise 的执行

## promise 的 catch

promise 的 catch 可以既可以用来捕获 promise reject 抛出的错误，也可以捕获代码运行中的错误。
catch 返回的同样是一个 promise 对象

catch 实际上可以用 then(null, rejection) 或者 then(undefined, redection)来实现

例如

```javascript
// 写法1
const promise = new Promise((resolve, reject) => {
  try {
    throw new Error("test");
  } catch (e) {
    reject(e);
  }
});
// 写法2
const promise = new Promise((resolve, reject) => {
  reject(new Error("test"));
});

promise.catch((err) => {
  console.log(error);
});
```

### promise 错误特性

#### promise 中在已经 resolve 后才抛出的错误不会被 catch 捕获

```javascript
new Promise((resolve, reject) => {
  resolve('res');
  throw new Error('test);
}).then(val => {
  console.log(val)
}).catch(err => {
  console.log(err);
})
```

以上代码的 error 是在 resolve 之后产生的。所以 catch 已经无法捕获到错误了。

#### 错误具有冒泡的特性

错误会一直向后传递，最终被一个 catch 捕获为止。

#### 如果没有 catch promise 对象抛出的错误不会传递到外层

```javascript
const test = () => {
  return new Promise((res, rej) => {
    res(x + 3);
  });
};

test().then((val) => {
  console.log(val);
});
console.log(123);
```

上面的代码会先打印一个错误 x is undefined。但是并不会退出进程，然后在打印出 123。

要注意下面这种情况

```javascript
new Promise((res, jes) => {
  res("ok");
  setTimout(() => {
    throw new Error();
  }, 0);
}).then((val) => {
  console.log(val);
});
```

上面这段程序会先输出 ok 然后抛出错误。
因为 setTimout 将错误指定在了下一个时间循环中。此时 promise 的运行已经结束。所以相当于是在 promise 外抛出了错误。

一般建议 promise 后面总是有个 catch 方法。
