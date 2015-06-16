turtle
======
>'take ur turtle like everywhere: a simple social media platform focused on privacy'

---
[![Build Status](https://travis-ci.org/dwolfm/turtle.svg)](https://travis-ci.org/dwolfm/turtle)
# About
Turtle is a bare bones messaging servace. Make connections and chat with them.   
Create Group chats and invite your connections to join. Give members of a chat  
Permisions to moderate a chat. Give members of a chat permisions to add new   
members to the chat. Once a message has been read it will be deleted from the server.
>'Imagine a chat app where you can talk to your friends, but when the conversation is over   
your messages dissopear forever.'   

Turtle celebrates how conversaions happend before digital storage was so easy to  
come by. Turtle celebrates conversaions in the present. Turtle is simply text chat with no history. Clone and host your own turtle.  

---
## Dev notes
* so far we only suport UTF-8 messages
* we need to add support for images, youtube, soundcloud  
---
## API docks
## User Routes
#### Create 
* **POST /api/users**
* **Post Body:** ```{email: [unique email], username: [unique username], password: [passwd]}```
* **Response** 
* **Success:** ```{sucess: true:, usernamePass: true, emailPass: true, passwordPass: true}```
* **Failure:** ```{sucess: false:, usernamePass: [false if not unique], emailPass: [false if not unique], passwordPass: [false if empty]}```

#### Login
* **GET /api/login**
* **Header**
* **Auth: ** ```email:password``` 
* **Response**
* **Success:** ``` {success: true, eat: eat} ``` 
* **Failure:** ``` {success: false, msg: 'error logging in'}``` 

## Contacts List Routes
#### Friend Request
#### Accept Friend Request
#### Deny Friend Request


