'use strict';

module.exports = function() {
 return function adminAuth(req, res, next) {
    var userRole = req.user.role;

    if (userRole !== 'admin') {  // verify role
      console.log('Unauthorized user');
      return res.status(401).json({msg: 'Unauthorized'});
    }
   next();
  };
};
