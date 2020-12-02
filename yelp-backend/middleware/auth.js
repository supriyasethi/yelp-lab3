function authentication(res, req, next) {
    if (!req.session || !req.session.userId) {
        const err = new Error('You are not logged in');
        err.statusCode = 401;
        next(err);
      }
      next();
}

module.exports = authentication;

