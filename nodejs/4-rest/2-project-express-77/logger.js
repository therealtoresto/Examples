
const logger = (req, res, next) => {
    console.dir({
        method: req.method,
        url: req.url,
        time: new Date()
    });
    next()
}

module.exports = { logger };