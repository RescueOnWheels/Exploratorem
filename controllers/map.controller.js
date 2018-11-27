/* Dependencies */
const express = require('express');

/* Constants */
const router = express.Router();

/* GET map page. */
router.get('/', (req, res) => {
  res.render('map');
});

/* Exports */
module.exports = router;

