---
title: 让Python漫步在浏览器上
tags:
---
> 随着人工智能技术的普及，越来越多的前端程序员开始关注相关技术。Python 作为人工智能领域最常用的语言，与前端程序员日常使用的语言 JavaScript 同属脚本语言，且在两者发展过程中，社区也多有相互借鉴之处，因此有很多相似。一个熟悉 JavaScript 语言的前端程序员，通过掌握了他们之间的不同之处，可以快速上手 Python.

如何快速上手? 对于一个前端程序员来说, 如果能够在熟悉的浏览器环境下学习, 最好不过了. 所以, 那就手撸一个 [***Pathon*** 在线编程](https://www.yexiaochen.com/pythonOnline/). 而本文的重点则是本地文件的操作, [**上传(读取)**](#上传「读取」) 和 [**下载**](#下载).

# File API

## FileReader

将 ***File*** 和 ***Blob*** 类型的文件或数据异步读入内存.

### InstanceOfFileReader Properties

**instanceOfFileReader.error(只读)** : 在读取时的出现的错误.
**instanceOfFileReader.readyState(只读)** : 提供读取操作时的状态.
|Value(readyState)|State(FileReader)|Description|
|:---:|:---:|:---:|
|0|EMPTY|未加载任何数据|
|1|LOADING|加载数据中|
|2|DONE|已完成数据读取|
**instanceOfFileReader.result(只读)** : 读取的结果, 要么是 ***String***, 要么是 ***ArrayBuffer***, 这取决于读取的方法, 且仅在 ***load*** 事件触发后可用.

```JavaScript
  const stateNames = {
    [FileReader.EMPTY] : 'EMPTY',
    [FileReader.LOADING] : 'LOADING',
    [FileReader.DONE] : 'DONE'
  };
  let openFile = function(event) {
    let input = event.target;
    let reader = new FileReader();
    // 打开注解即可查看隐藏属性
    // reader.onloadstart = function() {
    //   reader.abort();
    // };
    reader.onprogress = function(e) {
      console.log('Event: ', e.type)
    };
    reader.onload = function(e) {
      console.log('Event: ', e.type)
    };
    reader.onloadend = function(e) {
      console.log('Event: ', e.type)
      console.log(reader.error.message);
    };
    reader.onabort = function(e) {
      console.log('Event: ', e.type)
    }
    reader.onerror = function(e) {
      console.log('Event: ', e.type)
      console.log(reader.error.message);
    }
    reader.onload = function(){
      let dataURL = reader.result;
      console.log('ReadyState: ' + stateNames[reader.readyState]);
      console.log('Result: ', dataURL)
    };
    console.log('ReadyState: ' + stateNames[reader.readyState]);
    // 打开注解即可查看隐藏属性
    // reader.readAsDataURL(input.files[0]);
    // reader.readAsArrayBuffer(input.files[0])
    reader.readAsText(input.files[0])
    console.log('ReadyState: ' + stateNames[reader.readyState]);
  };
```

### InstanceOfFileReader Methods

**instanceOfFileReader.abort()** : 终止读取操作.
**instanceOfFileReader.readAsArrayBuffer()** : 以 ***ArrayBuffer*** 类型为输出结果进行读取.
**instanceOfFileReader.readAsDataURL()** : 以 ***data: URL*** 类型为输出结果进行读取.
**instanceOfFileReader.readAsText()** : 以 ***String*** 类型为输出结果进行读取.

### InstanceOfFileReader Events

**onloadstart/'loadstart'** :
**onprogress/'progress'** :
**onload/'load'** :
**onabort/'abort'** :
**onerror/'error'** :
**onloadend/'loadend'** :

## Blob

## URL

## 下载

## 上传「读取」