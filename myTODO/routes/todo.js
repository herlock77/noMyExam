var express = require('express');
var router = express.Router();

router.get('/list', (request, respose, next) => {
    response.render('todolist', { title: TodoList });
});

// router.post('/add', (req, res, next) => {
//     res.render('todoadd', { title: Todo Add });
// });

// router.post('/complete', (req, res, next) => {
//     //res.send('complete todo');
// });

// router.post('delete', (req, res, next) => {
//     //res.send('delete todo');
// });

module.exports = router;