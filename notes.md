## 副作用和值的不可变性

`const` 是用来声明一个常量的，而常量就是不允许被重新赋值的变量。在排查问题的时，我们很少将注意力放在由 const 声明的变量上，毕竟它就是一个无关痛痒的常量。如果最终就是因为这个常量发生了变化，会不会很刺激？！虽然 const 声明的是常量，但是对于引用类型的值，程序还是允许它改变的。因为 const 的不靠谱，我们不得不重新关注由它声明的常量。

```JavaScript
const x = [ 2 ];
x[0] = 3;
```

数据的突变引发了一系列意想不到的 bug，究其原因，是变量被共享或有着不同的用处。

```JavaScript
var x = 1;

foo();

console.log( x );

bar();

console.log( x );

baz();

console.log( x );
```

当变量被共享时（在函数 `foo()`、`bar()`、`baz()` 中，任何一个函数都有可能改变变量 x），最终我们无法确认 x 到底是什么值，为了追踪变量 x 的变化，我们不得不仔细逐个阅读函数 `foo()`、`bar()`、`baz()`。显而易见，这给我们阅读理解代码带来了很大的麻烦。

```JavaScript
function sum(list) {
    var total = 0;
    for (let i = 0; i < list.length; i++) {
        if (!list[i]) list[i] = 0;

        total = total + list[i];
    }

    return total;
}

var nums = [ 1, 3, 9, 27, , 84 ];

sum( nums );            // 124

sums;    //[1, 3, 9, 27, 0, 84]
```

而对于引用同一对象的不同变量，对象的改变也是同步的，这种改变往往是不易察觉的。所以，对于引用类型的特殊性，需要特别注意的。

归纳一下，什么样的变量被共享时需要额外上心的，外层作用域里的变量和引用类型的变量。

如何避免这种数据突变带来的状态紊乱的？可以想到的是将变量变成只读的或重新拷贝一份以作区别。

```JavaScript
var x = Object.freeze( [ 2, 3, [4, 5] ] );

// 不允许改变：
x[0] = 42;

// oops，仍然允许改变：
x[2][0] = 42;
```

我们可以使用 `Object.freeze` 等 API 将数据转为不可变，但是这种 API 的还是有局限性的，只能浅层限制不可变。要想使得一个深层嵌套的对象不可变，就需要深度遍历对每个属性使用 `Object.freeze` 等 API。

另一种思路就是拷贝一份数据，这样的话，再怎么折腾副本都不会影响到源数据。

```JavaScript
function addValue(arr) {
    var newArr = [ ...arr, 4 ];
    return newArr;
}

addValue( [1,2,3] );    // [1,2,3,4]
```

在此，我们不由地想起函数式编程的核心 —— 不变性。我们看到了变化的数据给程序造成的可读性差、状态紊乱等坏处，自然我们就想到数据不变性会让程序更加友好。但值的不变性并不意味着值代表的状态不会发生改变，所以就有了值的拷贝。这种不变性是指，当需要改变程序中某个状态时，我们不能改变源数据，而是拷贝跟踪它的副本。拷贝也有深拷贝和浅拷贝，我们需要的是独立于源数据的副本。

```JavaScript
function updateLastLogin(user) {
    var newUserRecord = Object.assign( {}, user );
    newUserRecord.lastLogin = Date.now();
    return newUserRecord;
}

var user = {
    // ..
};

user = updateLastLogin( user );
```

然而，拷贝也不是没有代价的。突然多出来的副本，多少会影响到性能。我们希望有种方式可以减少内存占用，提高性能。它使得不同变量指向同一个数据源同时有着不同版本的数据，不同版本的数据互不影响，这有点像 git 的版本控制，这样的话，值的不变性这个语义也得以保留。其实已经有一些库实现了类似的优化，如 Immutable.js 等。

如果用两个字总结以上的内容，无疑，就是「干扰」了，这种干扰来自于非预期的数据变化。

作为函数式编程的主角 —— 函数，我们自然也会希望函数内部不会造成数据的突变，一切结果是可预测的，更多的希望它能够符合函数式编程的核心 —— 不变性。也就是说，我们在编码的过程中要减少函数的副作用。

除了以上所说的数据共享，副作用还包括随机性 （`Math.random()`）、IO 操作、竞态问题等。副作用是多种多样，我们使用纯函数来减少这种副作用。换句话说，与纯函数相违背的，我们基本可以认为是副作用。

什么是纯函数？有说纯函数就是幂等函数，但并不是所有的纯函数都是数学概念上的幂等。

```JavaScript
var hist = document.getElementById( "orderHistory" );

// 幂等的：
hist.innerHTML = order.historyText;

// 非幂等的：
var update = document.createTextNode( order.latestUpdate );
hist.appendChild( update );

// 非幂等的：
function calculateAverage(list) {
    var sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += list[i];
    }
    return sum / list.length;
}

calculateAverage( [1,2,4,7,11,16,22] );            // 9
```

另一种定义函数的方法是，给定相同的输入（一个或多个），它总是产生相同的输出。

```JavaScript
const PI = 3.141592;

function circleArea(radius) {
    return PI * radius * radius;
}
```

还有一种定义就是，即纯函数具有引用透明性。

> 引用透明性是指一个函数调用可以被它的输出值所代替，并且整个程序的行为不会改变。换句话说，不可能从程序的执行中分辨出函数调用是被执行的，还是它的返回值是在函数调用的位置上内联的。

```JavaScript
function calculateAverage(list) {
    var sum = 0;
    for (let i = 0; i < list.length; i++) {
        sum += list[i];
    }
    return sum / list.length;
}

var nums = [1,2,4,7,11,16,22];

var avg = calculateAverage( nums );

console.log( "The average is:", avg );        // The average is: 9

var avg = 9;

console.log( "The average is:", avg );        // The average is: 9
```

代码的副作用降低了程序的质量，同时也加大了我们对代码的阅读难度。没有副作用的程序是不存在的，我们只是通过重构不纯的函数或封装副作用等方式来避免副作用的产生。