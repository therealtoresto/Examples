var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const resArray = [];
  if (req.query.from && req.query.to) {
    
    const { from, to } = req.query;
    const fromCount = Number(from);
    const toCount = Number(to);

    for (let i = fromCount; i < toCount + 1; i++) {
      resArray.push(i);
    }
  }
  console.log(req.query);
  res.send(resArray);
});

module.exports = router;
