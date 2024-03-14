const loggingMiddleware = (req, res, next) => {
    console.log("Request Parameters:", req.params);
    next();
};

module.exports = loggingMiddleware;