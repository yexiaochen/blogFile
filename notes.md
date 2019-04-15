# 随手记

## Script snipt

```JavaScript
Function.prototype.Call = function(){
    let args = Array.from(arguments), context = args.shift();
    context = Object(context);
    context.fn = this;
    let result = context.fn(...args);
    return (delete context.fn) && result;
}

function deepClone(params) {
  if (Array.isArray(params)) {
    return params.reduce((accumulator, currentValue) => {
      (typeof currentValue === 'object') ? accumulator.push(deepClone(currentValue)) : accumulator.push(currentValue);
      return accumulator;
    }, [])
  } else {
    return Reflect.ownKeys(params).reduce((accumulator, currentValue) => {
      (typeof params[currentValue] === 'object') ? accumulator[currentValue] = deepClone(params[currentValue]) : accumulator[currentValue] = params[currentValue];
      return accumulator;
    }, {})
  }
}
```

## 驯化 JavaScript

说完接口，就要说说类了，因为它们有多相似的地方，比如充当对象的类型模板，继承成员等。

> 类到底是什么呢？

ES6 引入了 Class（类）这个概念，通过 class 关键字，可以定义类, Class 实质上是 JavaScript 现有的基于原型的继承的语法糖. Class 可以通过extends关键字实现继承。TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

```JavaScript
class Person {
    static age: number = 18;
    constructor(public name: string, public age: number) { }
    sayHi(name: string): string{
        return `Hi,${name}`
    }
}
/* —————— 人工分割线 —————— */
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.sayHi = function (name) {
        return "Hi," + name;
    };
    Person.age = 18;
    return Person;
}());
```

TypeScript 编译后，可以看出来，类其实就是一个函数而已。
在 ES6 之前，通过构造函数的方式 `new` 出对象，造出的对象拥有和共享了构造函数内部绑定的属性方法及原型上的属性方法。TypeScript 里的接口描述类类型就是类的实例部分应该遵循的类型模板。作为类的静态部分 ———— 构造函数，函数也有自己的属性特征。

```JavaScript
interface static_person {
    age: number,
    new (name: string, age: number);
}

interface instance_person {
    name: string,
    age: number,
    say(name: string): string
}

let person: static_person = class Person implements instance_person{
    static age: number = 18;
    constructor(public name: string, public age: number) { }
    say(name) {
        return `Hi,${name}`
    }
}
new person('夜曉宸',18)
```