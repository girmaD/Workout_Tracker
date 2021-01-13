const router = require('express').Router()
const path = require('path');

////////////////////////////
//// routes to html files //
///////////////////////////
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

//export router to make it accessible to other files
module.exports = router;
