# React-redux-socketio-chat

Note:This project is a work-in progress.  I will keep this project up to date.
To see the live version of the app go to http://slackclone.herokuapp.com

## Use Guide

### Development

```
npm run dev
```

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

## Helpful Resources

https://github.com/erikras/react-redux-universal-hot-example


## Todos
* I'm using Passport to auth right now, and it doesn't accept promises so I'm looking for another way to auth
* change the way ID's are assigned/stored
* reconfigure server calls from within React Components
* switch from mongoDB to redis or cassandra
* bug where user's don't log out they stay online in the users list, and userslist extends beyond the edge of the screen
