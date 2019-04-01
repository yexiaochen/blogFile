# Script snipt

```JavaScript
    Function.prototype.Call = function(){
        let args = Array.from(arguments), context = args.shift();
        context = Object(context);
        context.fn = this;
        let result = context.fn(...args);
        return (delete context.fn) && result;
    };
```