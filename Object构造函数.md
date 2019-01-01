---
title: Object构造函数
tags:
---
# Object

***Object*** 构造函数用来包装成对象.

## 概述

***Object*** 构造函数为给定值创建一个对象包装器. 如果给定值是 ***null*** 或 ***undefined**, 将会创建并返回一个空对象. 否则, 将返回一个与给定值对应类型的对象.

当以非构造函数形式被调用时, ***Object*** 等同于 `new Object()`.

## 构造函数方法

### Object.assign()

**描述** :
将源目标(一个或多个)对象中的所有可枚举属性值复制到目标对象中. 如果目标对象和源对象中存在相同的属性(键), 后者的属性将覆盖前者的属性. 最终返回目标对象.
**语法** :
> *`Object.assign(target, ..sources)`*
**`target`** : 目标对象.
**`sources`** : 源对象.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: 'word'
    }
    let copy = Object.assign({}, obj)
    // > copy
    // { a: 'hello', b: 'word' }
    // > obj_1
    // { a: 'hello', b: 'word' }
    // > copy === obj_1
    // false

    let obj_2 = {
        a: 'hi',
        b: 'world'
    }
    let obj_3 = {
        a: 'hello',
        b: 'world'
    }
    Object.assign(obj_2, obj_3)
    // > obj_2
    // { a: 'hello', b: 'world' }
```

### Object.create()

**描述** :
创建一个新对象, 并将内部属性 ***`[[Prototype]]`*** 指向源对象.
**语法** :
> *`Object.create(sources[, Properties])`*
**`sources`** : 提供原型的源对象.
**`Properties`** : 为新对象添加属性, 规则如同 ***`Object.defineProperties(obj, Prototype)`***.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: 'word'
    }
    let obj_2 = Object.create(obj_1, {name: {value: 'obj_2'}})
    >obj_2
    // {name: 'obj_2', _proto_: {a: 'hello', b: 'word'}}
```

### Object.defineProperty()

**描述** :
为对象定义一个新属性或修改现有属性.
**语法** :
> *`Object.defineProperty(target, prop, descriptor)`*
**`target`** : 要在其上定义或修改属性的目标对象.
**`prop`** : 要定义或修改的属性属性名称.
**`descriptor`** : 将被定义或修改的属性描述符.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: 'word'
    }
    let obj_2 = Object.create(obj_1, {name: {value: 'obj_2'}})
    >obj_2
    // {name: 'obj_2', _proto_: {a: 'hello', b: 'word'}}
```

### Object.defineProperties()

**描述** :
为对象定义一个新属性或修改现有属性.
**语法** :
> *`Object.defineProperty(target, prop, descriptor)`*
**`target`** : 要在其上定义或修改属性的目标对象.
**`prop`** : 要定义或修改的属性属性名称.
**`descriptor`** : 将被定义或修改的属性描述符.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: 'word'
    }
    let obj_2 = Object.create(obj_1, {name: {value: 'obj_2'}})
    >obj_2
    // {name: 'obj_2', _proto_: {a: 'hello', b: 'word'}}
```

### Object.entries()

**描述** :
由给定对象自身可枚举属性的键值对数组组成的数组. 属性的顺序与通过 `for...in` 循环对象的属性值所给出的顺序相同.
**语法** :
> *`Object.entries(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: 'word'
    }
    let obj_2 = Object.entries(obj_1)
    // > obj_2
    // [ [ 'a', 'hello' ], [ 'b', 'word' ] ]

    let map = new Map(obj_2)
    // > map
    // Map { 'a' => 'hello', 'b' => 'word' }

```

### Object.freeze()

**描述** :
冻结一个对象, 将不能向该对象添加新的属性, 不能修改、删除已有属性, 以及不能修改已有属性的可枚举性、可配置性、可写性. 如果属性是对象, 除非被冻结, 否则也是可以修改的. 数组作为对象, 被冻结后, 元素不可被修改.
**语法** :
> *`Object.freeze(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: {
            c: 'world'
        }
    }
    Object.freeze(obj_1)
    obj_1.a = 'hi'
    obj_1.b.c = '世界'
    // > obj_1
    // { a: 'hello', b: { c: '世界' } }
```

### Object.getOwnPropertyDescriptor()

**描述** :
获取指定对象上某个自有属性对应的属性描述符.(自有属性即直接赋予该对象的属性, 非原型链继上查找到的属性)
**语法** :
> *`Object.getOwnPropertyDescriptor(target, prop)`*
**`target`** : 目标对象.
**`prop`** : 目标对象的属性名称.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: {
            c: 'world'
        },
        get c() {
            return 'c'
        }
    }
    let obj_2 = Object.getOwnPropertyDescriptor(obj_1, 'a')
    let obj_3 = Object.getOwnPropertyDescriptor(obj_1, 'c')
    // > obj_2
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: true }
    // > obj_3
    // { get: [Function: get c],
    // set: undefined,
    // enumerable: true,
    // configurable: true }
```

### Object.getOwnPropertyNames()

**描述** :
获取指定对象的所有自有属性的属性名(包括不可枚举属性但不包括 ***Symbol*** 值作为名称的属性)组成的数组.
**语法** :
> *`Object.getOwnPropertyNames(target)`*
**`target`** : 目标对象.
**`prop`** : 目标对象的属性名称.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: {
            c: 'world'
        },
        get c() {
            return 'c'
        }
    }
    let arr = Object.getOwnPropertyNames(obj_1)
    // > arr
    // [ 'a', 'b', 'c' ]
```

### Object.getOwnPropertySymbols()

**描述** :
获取给定对象所有的 ***Symbol*** 属性的数组.
**语法** :
> *`Object.getOwnPropertyNames(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj = {}
    let a = Symbol('a')
    obj[a] = 'hello'
    var arr = Object.getOwnPropertySymbols(obj)
    // > arr
    // [ Symbol(a) ]
```

### Object.getPrototypeOf()

**描述** :
获取给定对象的原型(内部 `Prototype` 属性的值). 若没有即成属性, 则返回 ***null***.
**语法** :
> *`Object.getOwnPropertyNames(target)`*
**`target`** : 目标对象.

```JavaScript
    function Person() {}
    let person = new Person()
    let a = Object.getPrototypeOf(person)
    // > a
    // Person {}

    let obj = {}
    let obj_1 = Object.create(obj)
    let obj_2 = Object.getPrototypeOf(obj_1)
    // > obj_2
    // {}
    // > obj_2 === obj
    // true
```

### Object.is()
### Object.isExtensible()
### Object.isFrozen()
### OObject.isSealed()
### Object.keys()
### Object.preventExtensions()
### OObject.seal()
### Object.setPrototypeOf()
### Object.values()