var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  return res.status(200).json({fruits: ["apple", "orange", "banana","cocoa", "berry"] })
});

module.exports = router;
