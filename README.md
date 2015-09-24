# React-redux-socketio-chat

### This project is a work-in progress.  



####
Use Guide:
```
- npm install
- grunt build
- npm start
```

#####
if you want to setup mongo:

```
- mkdir db
- mongod --dbpath=./db --smallfiles
```

#####
To see the live version of the app go to http://slackclone.herokuapp.com

#####
Todos:
- I'm using Passport to auth right now, and it doesn't accept promises so I'm looking for another way to auth
- change the way ID's are assigned/stored
- reconfigure server calls from within React Components
- switch from mongoDB to redis or cassandra
- bug where user's don't log out they stay online in the users list

#####
Links to projects I used as guides when building this project:
######
https://github.com/erikras/react-redux-universal-hot-example
