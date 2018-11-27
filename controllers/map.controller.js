/* Dependencies */
const express = require('express');

/* Constants */
const router = express.Router();

/* GET map page. */
router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/map.html`);
});

/* Exports */
module.exports = router;

