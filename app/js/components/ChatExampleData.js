module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('messages', JSON.stringify([
      {
        id: 'm_1',
        threadID: 't_1',
        threadName: 'Welcome!',
        authorName: 'The Turtle Team',
        text: 'Welcome to Turtle! Enjoy your stay',
        timestamp: Date.now() - 999999999
      }
    ]));
  }

};
