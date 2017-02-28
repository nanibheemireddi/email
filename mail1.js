var nodemailer = require("nodemailer");
var path = require("path");
var fs = require('file-system');

var filepath = path.join(__dirname, "tick.pdf");
nodemailer.mail({
      from: "nanibabu.bheemireddi@credencys.com",      
      to: "nanibabu.bheemireddi@credencys.com", 
      subject: "Hello",
      text: "Hello world ✔", // plaintext body
      attachments: [
        {
            filename: 'tick.pdf',   
            streamSource: fs.createReadStream(filepath),
            contentType: 'application/pdf',
            encoding: 'base64'
        }]
  });
 console.log("Email has been sent successfully"); 



