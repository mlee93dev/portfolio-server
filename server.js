const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

let app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', 'x-auth');
  res.header('Access-Control-Allow-Headers', 'Origin, x-auth, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.render('index.html');
});

app.post('/', (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Mailgun',
      auth: {
        user: 'postmaster@sandboxbd1c82fa486a411d8252e00086824911.mailgun.org',
        pass: '530d24384be84b0a8767d21f995f3b72-e44cc7c1-edf7bba2'
      }
    });
    const mailOptions = {
      from: req.body.email,
      to: 'mark.lee1933@gmail.com',
      subject: `Portfolio Website Message from ${req.body.name}`,
      text: req.body.message
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        throw new Error('There was an error sending the email.');
      } 
      res.status(200).send();
    });

  } catch (e) {
    console.log(e);
    res.status(400).send({'message': e.message});
  }
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};