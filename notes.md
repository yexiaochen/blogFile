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
在 ES6 之前，通过构造函数的方式 `new` 出对象，造出的对象拥有和共享了构造函数内部绑定的属性方法及原型上的属性方法。TypeScript 里的接口描述的类类型就是类的实例部分应该遵循的类型模板。作为类的静态部分 ———— 构造函数，函数应该也有自己的属性特征。

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

由以上代码可以看出，类的静态部分和动态部分都有各自的类型模板。若是想要将类自身作为类型模板又该如何做呢？最简单的方法就是 `typeof 类` 的方式。

```JavaScript
class Person {
  static age: number = 18;
    constructor(public name: string, public age: number) {}
    say(name) {
        return `Hi,${name}`
    }
}
class Man {
    static age: number;
    constructor(public name: string, public age: number) {}
    public sex = 'man';
    say(name){return `Hi, ${this.sex},${name}`}
}
let man: typeof Person = Man;
new Man('夜曉宸', 18)
```

类静态部分、类实例部分和类自身，它们都有自己需要遵循的类型模板。知道了其中的区别，也就能更好得理解类作为接口使用、接口继承类等用法了。

```JavaScript
class Person {
  name: string;
  age: number;
}
interface Man extends Person {
  sex: 'man'
}

let man: Man = {
    name: '夜曉宸',
    age: 18,
    sex: 'man'
}
```

除了结构上的约束，类也通过访问修饰符对其成员做了约束，包括 public，private，protected，readonly等。

```JavaScript
Person {
  private name: string;
  protected age: number;
}

interface SayPerson extends Person {
  sayHi(): string
}

class Human extends Person implements SayPerson {
  sayHi() {
    return `Hi, ${this.name}`
  }
}
```
........................................
---
title: 用Type驯化JavaScript
date: 2019-04-14 18:04:17
tags:
    - TypeScript
category:
    - 这个想法不一定对
---

> TypeScript 具有类型系统，且是 JavaScript 的超集。它可以编译成普通的 JavaScript 代码。TypeScript 支持任意浏览器，任意环境，任意系统并且是开源的。

作为弱类型、动态型语言，JavaScript 就像未驯化的野马一样。每个人都能上去坐两下，但是真正能够驾驭的只能是个中好手。
近几年，前端经历了快速的发展已经不再是以前随便玩玩的小玩意了。面对越来越大型、越来越持久的项目来说，这种宽松的方式反而成了障碍。

> 东西做大了，随之而来的就是各种规矩

规矩是从经验中总结，同时也是为了朝更好的方向发展，就比如编程里的设计原则和设计模式。「Man maketh manners」，记得王牌特工里，主角们在教育别人的时候总喜欢说这么一句话，「不知礼，无以立也」。在 TypeScript 里，「礼」就是 Type，Type 就是规矩。Typescript 通过类型注解提供编译时的静态类型检查，提前发现错误，同时也提高了代码的可读性和可维护性。

> TypeScript 里的类型注解是一种轻量级的为函数或变量添加约束的方式

在 JavaScript 里，变量用于在特定时间存储特定值，其值及数据类型可以在脚本的生命周期内改变。而在 TypeScript 中，标识符（变量、函数、类、属性的名字，或者函数参数）在其定义时就指定了类型（或类型推论出）。在编译阶段，若出现了期望之外的类型，TypeScript 将会提示抛错（虽然有时候并不会影响程序的正常运行）。

在 TypeScript 中，通过 `: 类型` 的方式为标识符添加类型注解。

```JavaScript
  let isDone: boolean = false;    // boolean；
  let decLiteral: number = 6;    // number；
  let name: string = "bob";    // string；
  let list: number[] = [1, 2, 3];    // Array<number>;
  let list: Array<number> = [1, 2, 3];    // Array<number>;
  let x: [string, number];    // tuple;
  enum Color {Red, Green, Blue}    // enum;
  let notSure: any = 4;    // any;
  function warnUser(): void {    // void;
    console.log("This is my warning message");
  }
  let u: undefined = undefined;    // undefined;
  let n: null = null;    // null;
  function error(message: string): never {    // never;
    throw new Error(message);
  }
  let obj: object = {};    // object
```

在 TypeScript 中，数组（Array）是合并了相同类型的对象，而元组（tuple）合并了不同类型的对象。（`Array<any>`,也可以合并不同类型的数据）

> 类型注解中的类型就是以上的那些类型么？

TypeScript 的核心原则之一是对值所具有的结构进行类型检查，它有时被称做「鸭式辨型法」或「结构性子类型化」。上面的只是基础类型，它们是填充结构的基本单位而已。在 TypeScript 里，类型不应该还停留在 JavaScript 数据类型的层面上，还应包括基础类型的组合结构化。

```JavaScript
let str: 'Hello';    // 字符串字面量类型；
str = 'Hi'    // error；

let something: 'Hello' | 1;    // 联合类型；
something = 1    // ok；

let obj: {name: string, age: number};    // 对象字面量
obj = {
    name: "夜曉宸",
    age: 18,
}
```

换句话说，在定义标识符的时候，用一个类型模板来描述标识符的结构和内部类型组成。即类型模板就是标识符期望的样子。

> 代码是给人看的，顺便是给机器运行的

都说好的代码就该这样。但是在 TypeScript 里，这两句话可以颠倒下顺序。代码是给机器运行的，顺便是给人看的。
在谈到 TypeScript 的好处时，有一条很重要，增强了编译器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等。而这些也得益于标识符的类型的精确划分或表述，所以想写好 Typescript 代码，就应该精确描述标识符的类型，而不是随处安放的 `any`。

> 表述复杂结构最常用的方式 ———— 接口

接口是 JavaScript 中没有的东西，是一个非常灵活的概念，可以抽象行为，也可以描述「对象的形状」。
对于需要复用的结构类型，就可以使用接口的方式，而不是对象字面量内联式注解。

```JavaScript
interface Iperson {    // 对象
    name: string,
    age: number,
    sayHi(): void,
}
let obj: Iperson = {
    name: "夜曉宸",
    age: 18,
    sayHi: ()=> {}
}

/* ——————人工分割线—————— */

interface Iperson {    // 函数类型
    (name: string, age: number): string
}
let person: Iperson = (name, age) => {
    return `${name},${age}`
}
person('夜曉宸', 18);

/* ——————人工分割线—————— */

interface Iperson {    // 构造函数
    new (name: string, age: number)
}
let person: Iperson = class Person {
    name: string;
    age: number;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
new person('夜曉宸', 18);

/* ——————人工分割线—————— */

interface Iperson {    // 类实现接口
    name: string,
    age: number,
}
class Person implements Iperson{
    name = '夜曉宸'
    age = 18
}
new Person()

/* ——————人工分割线—————— */

interface Iperson {    // 混合类型
    (name, age): string,
    age: number,
}

function Person(): Iperson {
    let me = <Iperson>function (name, age): string {
        return `${name}, ${age}`
    }
    me.age = 18;
    return me;
}

let person = Person();
person('夜曉宸', 18)
person.age

```

以上接口在对象、普通函数、构造函数、类上的表现。对于接口的属性，还可以做到精确控制，如可选属性、任意属性、只读属性等。
最后，接口间可以继承，接口还可以继承类。当接口继承类时，它会继承类的成员但不包括其实现，但是若继承了拥有私有或受保护的成员类时，这个接口只能由这个类或其子类来实现了，这个和类的访问修饰符的特点有关系。

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

在 ES6 之前，通过构造函数的方式 `new` 出对象，造出的对象拥有和共享了构造函数内部绑定的属性方法及原型上的属性方法。TypeScript 里的接口描述的类类型就是类的实例部分应该遵循的类型模板。作为类的静态部分 ———— 构造函数，函数应该也有自己的属性特征。

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

由以上代码可以看出，类的静态部分和动态部分都有各自的类型模板。若是想要将类自身作为类型模板又该如何做呢？最简单的方法就是 `typeof 类` 的方式。

```JavaScript
class Person {
  static age: number = 18;
    constructor(public name: string, public age: number) {}
    say(name) {
        return `Hi,${name}`
    }
}
class Man {
    static age: number;
    constructor(public name: string, public age: number) {}
    public sex = 'man';
    say(name){return `Hi, ${this.sex},${name}`}
}
let man: typeof Person = Man;
new Man('夜曉宸', 18)
```

类静态部分、类实例部分和类自身，它们都有自己需要遵循的类型模板。知道了其中的区别，也就能更好得理解类作为接口使用、接口继承类等用法了。

```JavaScript
class Person {
  name: string;
  age: number;
}
interface Man extends Person {
  sex: 'man'
}

let man: Man = {
    name: '夜曉宸',
    age: 18,
    sex: 'man'
}
```

除了结构上的约束，类也通过访问修饰符对其成员做了约束，包括 public，private，protected，readonly等。

```JavaScript
class Person {
  private name: string;
  protected age: number;
}

interface SayPerson extends Person {
  sayHi(): string
}

class Human extends Person implements SayPerson {
  sayHi() {
    return `Hi, ${this.age}`
  }
}
```

知道了访问修饰符的特点，也就明白之前说过的「当接口继承类时，它会继承类的成员但不包括其实现，但是若继承了拥有私有或受保护的成员类时，这个接口只能由这个类或其子类来实现了」。

> 如果一个标识符的类型不确定，该如何？

对于一个内部逻辑相差不大，入參类型不同的函数来说，没必要因为参数类型不同而重复大部分代码，这时就需要一个变量变量来代替。

```JavaScript
/* 范型函数 */
class Person {
    className = 'person'
}
class Human {
    classname = 'human'
}
function create<T>(Class: new () => T) : T{
    return new Class();
}
create(Person).className

/* 范型接口 */
interface Creat<T>{
    (Class: new () => T):T
}
class Person {
    className = 'person'
}
class Human {
    classname = 'human'
}
function create<T>(Class: new () => T) : T{
    return new Class();
}
let person: Creat<Person> = create;

person(Person)    // OK
person(Human)    // Error
```