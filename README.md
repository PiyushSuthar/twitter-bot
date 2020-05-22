# Welcome to Twitter Bot 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](#)
[![Twitter: PiyushSthr](https://img.shields.io/twitter/follow/PiyushSthr.svg?style=social)](https://twitter.com/PiyushSthr)

> A bot that generates images from Quotes Api and posts it to Twitter.

## Install

```sh
git clone https://github.com/PiyushSuthar/twitter-bot.git
cd twitter-bot
npm install
```

## Usage

```sh
node index.js
```

## Automation

We will deploy this bot on Heroku, and make it work at a given time everyday. There are 2 ways of doing it.
1. Using Heroku's own scheduler, (But we'll have to provide our credit card info)
2. Using my own Lifehack/Jugaad.

Doing it with Heroku's own scheduler is easy, you can follow their Documentation.
I'll show you how to do it without it.

First of all we'll install ExpressJs. Yes, we will use this one here in our bot.
```sh 
npm i express
```
Open the index.js file and put all the code in a function.
```js
request("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json",{json : true}, async(err,res,body)=>{
    ...
})
```
### To 
```js
function functionName(){
    request("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json",{json : true}, async(err,res,body)=>{
        ...
    })
}
```
now require express module in the index.js file.
```js
const express = require("express")
const app = express();

var port = process.env.PORT || 8000;
```
Now basically what our idea is when we will visit a specific path on the domain, this will trigger the function. So this is how we can do it.

Make sure to make the path very difficult. What I did was, I went ot a random password generaor and generated some and pasted over here.
```js
app.get("/EXvAjMfjhPwqnk7D/vVL7xTXwPr6gkeVJ",(req,res)=>{
    funcionName();//calling the function
    res.send("I'm tweeting!")//Giving a response back.
})
app.listen(port,()=>console.log(`We are listening on port ${port}`))
```
Now just add a script in package.json
```js
"start": "node index.js",
```

That's it now deploy it on heroku through Heroku Cli.
## Author

👤 **Piyush Suthar**

* Website: https://piyushsuthar.codes
* Twitter: [@PiyushSthr](https://twitter.com/PiyushSthr)
* Github: [@piyushsuthar](https://github.com/piyushsuthar)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
