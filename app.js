const express = require('express');
const path = require('path');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const CronJob = require('cron').CronJob;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const scraper = require('./scraper/scraper');
const everyFourHours = '0 */4 * * *';
const everyMinute = '0 */1 * * * *';

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Product Data API",
            description: "Product Data API Information",
            contact: {
                name: "Amazing Developer"
            },
            servers: ["http://localhost:5000", "http://vps-a7db4c18.vps.ovh.net:3000"]
        }
    },
    apis: ['./routes/*.js']
};

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
scraper.start()
const job = new CronJob(everyFourHours, async function () {
    console.log("-------Start Scraper-------")
    await scraper.start()
 }, null, true, 'America/Los_Angeles');
 job.start();



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
