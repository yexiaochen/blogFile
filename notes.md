# 一

* Promise

```JavaScript
    Promise.resolve().then(()=>{
        console.log('1')
        Promise.resolve().then(() => {
            console.log('2');
            Promise.resolve().then(() => {
                console.log('3');
            })
        }).then(() => {
            console.log('4')
        })
    })

    Promise.resolve().then(() => {
        console.log('5')
        Promise.resolve().then(() => {
            console.log('6')
        }).then(() => {
            console.log('7')
        }).then(() => {
            console.log('8')
        })
        Promise.resolve().then(() => {
            console.log('9')
            Promise.resolve().then(() => {
                console.log('10')
            })
        }).then(() => {
            console.log('11')
        })
    }).then(() => {
        console.log('12')
    })
```

```JavaScript
    var log = function(){
        console.log('args', arguments)
        console.log.apply(null, arguments)
    }

    var log_1 = log.bind(null, 1, 2, 3)
    var log_2 = Function.prototype.apply.bind(log, null)

    console.log('log_2', log_2)
    log_2([1, 2, 3])

    // log_1(2, 3, 4)

    // callback async
    var async = function (x = Date.now(), callback) {
        try{
            // do something now
            // throw 'Error'
            console.log('async:初始时间戳', x)
            setTimeout(() => {
                try{
                    // do something in the future
                    // throw 'Error'
                    let interval = Date.now() - x;
                    callback && callback(null, `async:在${interval}毫秒后异步完成`)
                }catch(error){
                    callback(error)
                }
            }, 3000)
        }catch(error){
            callback(error)
        }
    }
    async(undefined, function (error, value) {
        error?console.log('asyncError:', error):console.log('async:', value)
    })

    // callback Promise async
    var asyncPromise = function (x = Date.now()) {
        return new Promise((resolve, reject) => {
            // do something now
            // throw 'Error'
            console.log('asyncPromise:初始时间戳', x)
            setTimeout(() => {
                try{
                    // do something in the future
                    // throw 'Error'
                    let interval = Date.now() - x;
                    resolve(`asyncPromise在${interval}毫秒后异步完成`)
                }catch(error){
                    reject(error)
                }
            }, 3000)
        })
    }
    asyncPromise(undefined).then(value => {
        console.log('asyncPromise', value)
    }, error => {
        console.log('errorPromise', error)
    })

    // Promise Wrap
    var promiseWrap = function(fn){
        return function() {
            let args = Array.from(arguments);
            return new Promise((resolve, reject) => {
                fn.apply(null, args.concat(arguments, (error, value) => {
                    error ? reject(error): resolve(value)
                }))
            })
        }
    }

    // parallel Promise
    var parallel = (x = Date.now()) => {
        Promise.resolve().then(() => {
            new Promise(resolve => {
                setTimeout(() => {
                    let interval = Date.now() - x;
                    resolve(`parallel-1:在${interval}毫秒后完成`)
                }, 3000)
            }).then(value => {
                console.log(value)
            })
        }).then(value => {
            let interval = Date.now() - x;
            console.log(`parallel-2:在${interval}毫秒后完成`)
        })
    }

    // serial Promise
    var serial = (x = Date.now()) => {
        Promise.resolve().then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    let interval = Date.now() - x;
                    resolve(`serial-1:在${interval}毫秒后完成`)
                }, 3000)
            }).then(value => {
                console.log(value)
            })
        }).then(value => {
            let interval = Date.now() - x;
            console.log(`serial-2:在${interval}毫秒后完成`)
        })
    }

    // sequence
    Promise.resolve().then(value => {
        console.log('promise-1-1', value)
        Promise.resolve().then((value) => {
            console.log('promise-1-2', value)
        }).then((value) => {
            console.log('promise-1-3', value)
        })
    }).then(value => {
        console.log('promise-1-4', value)
    })

    Promise.resolve().then(value => {
        console.log('promise-2-1', value)
        Promise.resolve().then((value) => {
            console.log('promise-2-2', value)
        }).then((value) => {
            console.log('promise-2-3', value)
        })
    }).then(value => {
        console.log('promise-2-4', value)
    })
```