var express = require('express')
var app = express()
var fs = require('fs');
var bodyParser = require('body-parser');
var helmet = require('helmet');
app.use(helmet);

//routes
var indexRouter = require('./routes/index.js');
var topicRouter = require('./routes/topic.js');

// parse application/x-www-form-urlencoded
app.use(express.static(`public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', (request, response, next) => {
  fs.readdir('./data', (error, filelist) => {
    request.list = filelist;
    next();
  });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
