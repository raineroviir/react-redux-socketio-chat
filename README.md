# React-redux-socketio-chat

To see the live version of the app go to http://slackclone.herokuapp.com

## Use Guide

First off, clone the repository and then `cd react-redux-socketio-chat`and `npm install`

### Development

Comes with [redux-dev tools](https://github.com/gaearon/redux-devtools) and [react-transform](https://github.com/gaearon/react-transform-boilerplate
)

```
npm run dev
```
And then point your browser to `localhost:3001`

### Production

```
npm run build
npm start
```

For setting up mongoDB in your local environment

```
mkdir db
mongod --dbpath=./db --smallfiles
```

then to open the database open a new terminal and type in `mongo` and type in `use chat_dev` 

## Helpful Resources and Inspiring Projects

* Erikras' universal redux example: https://github.com/erikras/react-redux-universal-hot-example
* The facebook react flux-chat example: https://github.com/facebook/flux/tree/master/examples/flux-chat
* The awesome community at https://discordapp.com/channels/102860784329052160/102860784329052160

## Todos
* ~~Make the app persist on browser refresh~~
* Promise based auth library
* Users properly get removed from the list of users online
* My session implementation needs to be fixed
* ~~A list of users online~~
* ~~Move all the CSS to inline styling in the React Components~~
* ~~validation for username/channelname exists~~
