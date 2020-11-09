const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const helmetCsp = require('helmet-csp');
const path = require('path');
const cors = require('cors');

const sendMail = require('./utils/mailer');

const pubPath = path.join(__dirname, '../public');
const port = 3224;

// const csp = "default-src * 'unsafe-inline' 'unsafe-eval'; script-src 'self' https://saffron.enli.technology/js/; script-src-elem; script-src-attr; style-src; style-src-elem; style-src-attr; img-src; font-src; connect-src; media-src; object-src; prefetch-src; child-src; frame-src; worker-src; frame-ancestors; form-action; base-uri; manifest-src; plugin-types; report-uri; report-to";

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmetCsp({
    directives: {
      defaultSrc: ["'self'", "'unsafe-inline'", "saffron.enli.technology"],
      // imgSrc: ["'self", "'unsafe-inline'", "data: 'image/svg+xml;base64'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "saffron.enli.technology"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
    reportOnly: false,
})
);

app.use('/', express.static(pubPath));

app.post('/send-mail', async (req, res, next) => {
  try {
    console.log(req.body);
  
    const mailResp = await sendMail(req.body, next);

    res.json({ message: mailResp });
  } catch (err) {
    next(err);
  }
});

app.get('/', (req, res) => {
  res.render('index.html');
});

app.listen(port, () => {
  console.log(`> webgl viewer app is listening on port: ${port}`);
});
