
var app = require('express')(),
    mailer = require('express-mailer');

mailer.extend(app, {
  from: 'nanibabu.bheemireddi@credencys.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'nanibabu.bheemireddi@credencys.com',
    pass: '25@aprl@1994'
  }
});
 
  app.mailer.send('', {
    to: 'nanibabu.bheemireddi@credencys.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.  
    subject: 'Test Email', // REQUIRED. 
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables. 
  }, function (err,body) {
    if (err) {
      // handle error 
      console.log(err);
    }
    console.log(body)
  });



