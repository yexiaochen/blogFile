```JavaScript
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const session = require('koa-session');

let store = {
  storage: {},
  get(key){
    return this.storage[key];
  },
  set(key, session){
    this.storage[key] = session;
  },
  destroy(key){
    delete this.storage[key];
  }
};

const app = new Koa();
const router = new Router();
app.keys = ['secret'];
const CONFIG = {
  key: 'koa:session',
  maxAge: 86400000,
  overwrite: true,
  httpOnly: true,
  signed: true,
  store
};

app.use(session(CONFIG, app));
app.use(cors({credentials: true}));
app.use(koaBody());
app.use(router.routes()).use(router.allowedMethods());

router.post('/login', ctx => {
  const {user} = ctx.request.body;
  const logged = ctx.session.user || false;
  console.log('store.storage', store.storage);
  if(!logged){
    ctx.session.user = user;
    ctx.body = 'welcome, you are first login';
  }else {
    ctx.body = `hi, ${ctx.session.user}, you haved logined`;
  }
});


const PORT = '8080';

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`)
})
```

```HTML
<!-- index.html-->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Document</title>
</head>

<body>
  <button id="btn">send request</button>
</body>
<script>
  const btn = document.getElementById('btn');
  const data = {
    user: 'cyril',
    passward: 123,
  };
  const request = () => {
    return fetch('http://localhost:8080/login', {
      credentials: 'include',
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    });
  }
  const sendRequest = async () => {
    const res = await request();
    return await res.text();
  };
  btn.addEventListener('click', async () => {
    const msg = await sendRequest();
    console.log(msg);
  });
</script>

</html>
```

```JSON
{
  "name": "koa-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "koa": "^2.7.0",
    "serve": "^11.0.0"
  },
  "dependencies": {
    "koa-body": "^4.1.0",
    "koa-cors": "^0.0.16",
    "koa-router": "^7.4.0",
    "koa-session": "^5.12.0"
  }
}

```

## webpack

```JavaScript
// eslint-loader
{
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          formatter: require("eslint-friendly-formatter"),
        }
      },
.eslintrc
{
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "extends": "airbnb",
    "rules": {
        "semi": [0],
        "react/jsx-filename-extension": [0]
    }
}
module.exports = {
  module: {
    rule:
    {
      test: /\.(png|svga?|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: 'file-loader'
          }
        }
      ].concat(isDev ? [] : [
        {
          loader: 'image-webpack-loader',
          options: {
            pngquant: {
              speed: 4,
              quality: '75-90'
            },
            optipng: {
              optimizationLevel: 7
            },
            mozjpeg: {
              quality: 70,
              progressive: true
            },
            gifsicle: {
              interlaced: false
            }
          }
        }
      ])
    }
  }
}
```