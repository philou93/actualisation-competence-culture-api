var express = require('express');
var cookieParser = require('cookie-parser');
var nodeMailer = require('nodemailer');
var cors = require('cors')

const fs = require('fs');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.options('*', cors());

app.post("/api/send-email", (req, res) => {
  const answers = req.body.answers;
  if(answers === undefined){
    res.status(401).send();
    return;
  }
  
  // TODO: valider que tous les champs sont présents

  let transporter = nodeMailer.createTransport({
    host: 'world-207.ca.planethoster.net',
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: 'admin@competence-culture.actualisation.com',
        pass: 'sG&{g]}Ju&N&'
    }
  });
  let mailOptions = {
    from: "admin@competence-culture.actualisation.com",
    to: 'paudet.fortin@gmail.com',
    subject: "Nouvelle réponse pour compétense-culture",
    body: "",
    attachments: [
      {
        filename: 'reponse.txt',
        content: Buffer.from(JSON.stringify(answers), 'utf-8')
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) { 
      res.status(401).send();
      return;
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });

  res.status(200).send();
});

app.listen(8081, () => {
  console.log("Server listenning to port 8081");
});

module.exports = app;
