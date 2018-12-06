/* Dependencies */
const express = require('express');

/* Constants */
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('dash', { title: 'Express' });
});

/* Exports */
module.exports = router;
