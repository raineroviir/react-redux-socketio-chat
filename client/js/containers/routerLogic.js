const router;

// Here's the trick: assign to module.exports before any require()s
module.exports = {
  getCurrentPath() {
    return router.getCurrentPath();
  },

  makePath(to, params, query) {
    return router.makePath(to, params, query);
  },

  makeHref(to, params, query) {
    return router.makeHref(to, params, query);
  },

  transitionTo(to, params, query) {
    router.transitionTo(to, params, query);
  },

  replaceWith(to, params, query) {
    router.replaceWith(to, params, query);
  },

  goBack() {
    router.goBack();
  },

  run(render) {
    router.run(render);
  }
};

var routes = require('./routes'),
    Router = require('react-router');

router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

// module.exports = router;
