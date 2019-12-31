var express = require('express');
var cookieParser = require('cookie-parser');
var nodeMailer = require('nodemailer');
var cors = require('cors')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.options('*', cors());

app.post("/api/send-email", (req, res) => {
  const answers = req.body.answers;
  console.log(answers)
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
    },
    attachments: [
      {
        filename: 'reponse.txt',
        content: Buffer.from(JSON.stringify(answers), 'utf-8')
      }
    ]
  });
  let mailOptions = {
      to: 'louis.fortin@actualisation.com',
      subject: "Nouvelle réponse pour compétense-culture",
      body: ""
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
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
