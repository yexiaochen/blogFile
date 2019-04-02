# Script snipt

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