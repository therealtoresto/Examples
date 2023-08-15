var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:count/:id', function(req, res, next) {
  console.dir({ params: req.params });
  res.send('respond with a resource');
});

module.exports = router;
