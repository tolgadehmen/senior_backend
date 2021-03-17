const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const upload = require('multer')({dest: './public/data'});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.post('/upload', upload.single('file'), (req, res) => {
	console.log(req.file);
	console.log(req.body);

	res.json({path: req.file.pathname});
});

module.exports = app;
