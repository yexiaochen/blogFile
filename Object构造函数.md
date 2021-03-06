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

### Object.keys()

**描述** :
获取给定对象自身可枚举属性(字符串)组成的数组.
> *`Object.keys(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj = {
        a: 'hello'
    }
    Object.defineProperty(obj, 'b', {value: 'world'})
    let property_1 = Object.getOwnPropertyDescriptor(obj, 'a')
    let property_2 = Object.getOwnPropertyDescriptor(obj, 'b')
    let propertyArray = Object.keys(obj);
    // > property_1
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: true }
    // > property_2
    // { value: 'world',
    // writable: false,
    // enumerable: false,
    // configurable: false }
    // > propertyArray
    // [ 'a' ]
```

### Object.values()

**描述** :
获取给定对象自身可枚举属性值组成的数组.
> *`Object.values(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj = {
        a: 'hello',
        b: () => {
            console.log('hello')
        }
    }
    Object.defineProperty(obj, 'c', {value: 'world'})
    let property_1 = Object.getOwnPropertyDescriptor(obj, 'a')
    let property_2 = Object.getOwnPropertyDescriptor(obj, 'c')
    let valuesArray = Object.values(obj);
    // > property_1
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: true }
    // > property_2
    // { value: 'world',
    // writable: false,
    // enumerable: false,
    // configurable: false }
    // > valuesArray
    // [ 'hello', [Function: b] ]
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

### Object.preventExtensions()

**描述** :
使得对象变得不可扩展. 即设置对象内部 `[[Extensible]]` 值为 ***false***.
> *`Object.preventExtensions(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: {
            c: 'world'
        }
    }
    let property_1 = Object.getOwnPropertyDescriptor(obj_1, 'a')
    let boolean_1 = Object.isExtensible(obj_1)
    Object.preventExtensions(obj_1)
    let property_2 = Object.getOwnPropertyDescriptor(obj_1, 'a')
    let boolean_2 = Object.isExtensible(obj_1)
    // > property_1
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: true }
    // > property_2
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: true }
    // > boolean_1
    // true
    // > boolean_2
    // false
```

### Object.seal()

**描述** :
使得对象变得不可扩展. 即设置对象内部 `[[Extensible]]` 值为 ***false***. 对象属性的 `[[Configurable]]` 为 ***false***.
> *`Object.seal(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj_1 = {
        a: 'hello',
        b: {
            c: 'world'
        }
    }
    let property_1 = Object.getOwnPropertyDescriptor(obj_1, 'a')
    let boolean_1 = Object.isExtensible(obj_1)
    Object.seal(obj_1)
    let property_2 = Object.getOwnPropertyDescriptor(obj_1, 'a')
    let boolean_2 = Object.isExtensible(obj_1)
    // > property_1
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: true }
    // > property_2
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: false }
    // > boolean_1
    // true
    // > boolean_2
    // false
```

### Object.freeze()

**描述** :
冻结一个对象, 将不能向该对象添加新的属性, 不能修改、删除已有属性, 以及不能修改已有属性的可枚举性、可配置性、可写性. 如果属性是对象, 除非被冻结, 否则也是可以修改的. 数组作为对象, 被冻结后, 元素不可被修改. `[[Extensible]]` 内部属性为 ***false***. 对象属性的 `[[Configurable]]` 为 ***false***. 若是对象属性描述符为数据描述符, 则对象属性的 `[[Writable]]` 为 ***false***.
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
    let property_1 = Object.getOwnPropertyDescriptor(obj_1, 'a')
    let boolean_1 = Object.isExtensible(obj_1)
    Object.freeze(obj_1)
    let property_2 = Object.getOwnPropertyDescriptor(obj_1, 'a')
    let boolean_2 = Objct.isExtensible(obj_1)
    obj_1.a = 'hi'
    obj_1.b.c = '世界'
    // > obj_1
    // { a: 'hello', b: { c: '世界' } }
    // > property_1
    // { value: 'hello',
    // writable: true,
    // enumerable: true,
    // configurable: true }
    // > property_2
    // { value: 'hello',
    // writable: false,
    // enumerable: true,
    // configurable: false }
    // > boolean_2
    // true
    // > boolean_2
    // false
```

### Object.isExtensible()

**描述** :
判断一个对象是否可扩展的. 即是否可添加新的属性. 新对象 `[[Extensible]]` 默认为 ***true*** . ***Object.preventExtensions(target)***, ***Object.seal(target)*** 或 ***Object.freeze(target)*** 可将目标对象内部属性 `[[Extensible]]` 置为 ***false***.
**语法** :
> *`Object.isExtensible(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj = {}
    let boolean_1 = Object.isExtensible(obj)
    Object.freeze(obj)
    let boolean_2 = Object.isExtensible(obj)
    // > boolean_1
    // true
    // > boolean_2
    // false
```

### OObject.isSealed()

**描述** :
判断一个对象是否被密封. 若对象的内部属性 `[[Extensible]]` 为 ***false***, 返回 ***true***. 若对象属性的 `[[Configurable]]` 为 ***true***, 返回 ***false***. 否则, 返回 ***false***.
**语法** :
> *`Object.isSealed(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj = {}
    let boolean_1 = Object.isFrozen(obj)
    Object.defineProperty(obj, 'a', {configurable: false})
    let boolean_2 = Object.isFrozen(obj)
    Object.preventExtensions(obj)
    let boolean_3 = Object.isFrozen(obj)
    // > boolean_1
    // false
    // > boolean_2
    // false
    // > boolean_3
    // true
```

### Object.isFrozen()

**描述** :
判断一个对象是否被冻结. 若对象的内部属性 `[[Extensible]]` 为 ***false***, 返回 ***true***. 若对象属性的 `[[Configurable]]` 为 ***true***, 返回 ***false***. 若是对象属性描述符为数据描述符, 对象属性的 `[[Writable]]` 为 ***true***, 返回 ***false***. 否则, 返回 ***false***.
**语法** :
> *`Object.isFrozen(target)`*
**`target`** : 目标对象.

```JavaScript
    let obj = {}
    let boolean_1 = Object.isFrozen(obj)
    Object.freeze(obj)
    let boolean_2 = Object.isFrozen(obj)
    // > boolean_1
    // true
    // > boolean_2
    // false

    let obj = {}
    let boolean_1 = Object.isFrozen(obj)
    Object.defineProperty(obj, 'a', {writable: false})
    let boolean_2 = Object.isFrozen(obj)
    Object.defineProperty(obj, 'a', {configurable: false})
    let boolean_3 = Object.isFrozen(obj)
    Object.preventExtensions(obj)
    let boolean_4 = Object.isFrozen(obj)
    // > boolean_1
    // false
    // > boolean_2
    // false
    // > boolean_3
    // false
    // > boolean_4
    // true
```

### Object.setPrototypeOf()

**描述** :
使得对象变得不可扩展. 即设置对象内部 `[[Extensible]]` 值为 ***false***. 对象属性的 `[[Configurable]]` 为 ***false***.
> *`Object.setPrototypeOf(target, prototype)`*
**`target`** : 目标对象.
**`prototype`** : 原型对象(对象或 ***null***).

```JavaScript
    let obj_1 = {a: 1}
    let obj_2 = {b: 2}
    Object.setPrototypeOf(obj_2, obj_1)
    let proto_1 = Object.getPrototypeOf(obj_2)
    // > proto_1
    // { a: 1 }
```

### Object.getPrototypeOf()

**描述** :
获取给定对象的原型(内部 `[[Prototype]]` 属性的值). 若没有即成属性, 则返回 ***null***.
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

**描述** :
判断两个值是否相等. 规则和抽象相等、严格相等不一样.
**语法** :
> *`Object.is(target1, target2)`*
**`target`** : 需要比较的两个值.

```JavaScript
    Object.is(undefined, undefined)    // true
    Object.is(null, null)  // true
    Object.is(true, true)  // true
    Object.is(false, false)    // true
    Object.is(+0, +0)  // true
    Object.is(NaN, NaN)    // true *
    Object.is(-0, -0)  //true
```
