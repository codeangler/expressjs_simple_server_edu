'use strict';
const express = require('express');
const path = require('path');
const bodyParser = require('body-Parser');
const nodemailer = require('nodemailer');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {'title': 'Welcome'});
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  console.log('test-A');
  res.render('contact');
});

app.post('/contact/send', (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'email@email.com',
      pass: 'password-string'
    }
  });

  let mailOptions = {
    from: 'Casey Burnett <dev@codeangler.com>',
    to: 'dev@codeangler.com',
    subject: 'Webstite Submission',
    text: 'You have a submission with the following details...   \nName: ' + req.body.name + " \nEmail: " + req.body.email + "\nMessage: " + req.body.message,
    html: '<p>You have a submission with the following details... <ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul></p>'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      // res.redirect('/');
    } else {
      console.log(req.body);
      console.log("Message sent");
      res.redirect('/');
    }
  })
  console.log('test-B');
});

app.listen(3000, () => {
  console.log(`Listening on PORT 3000`);
});