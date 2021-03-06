var http=require('http');
var express=require('express');
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport();

var bodyParser = require('body-parser');
var validator = require('validator');
var fs = require('fs');
var multer = require("multer");
var path = require("path");
directory = path.dirname("");
var parent = path.resolve(directory, '..');
var uploaddir = parent + (path.sep) +'email' + (path.sep);
var upload = multer();
var app = express();
var filepaths = require('filepath');
var fileupload = require('fileupload');

var port = Number(process.env.PORT || 5000);
app.use(bodyParser.json({keepExtensions:true})); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs'); 
// Home page
app.get('/',function(req,res){
    res.render('../sendmail.ejs');
});

app.get('/index',function(req,res){
    res.sendfile('index.html');
});
 
// sending mail function
app.post('/send', upload.array("proposalDocument"), function(req, res){
    /*sampleFile = req.files;
    console.log(sampleFile);
    var filepath = path.join(__dirname, "tick.pdf");
	var email = validator.isEmail(req.body.email);
	if(req.body.email == "" || req.body.subject == "") {
	  res.send("Error: Email & Subject should not blank");
	  return false;
	} else if(email == false){
		res.send("Error: email should be valid.")
	}
     // Sending Email Without SMTP
	nodemailer.mail({
	    from: "Node Emailer ✔ <no-reply@iamrohit.in>", // sender address
	    to: req.body.email, // list of receivers
	    subject: req.body.subject+" ✔", // Subject line
	    //text: "Hello world ✔", // plaintext body
	    html: "<b>"+req.body.description+"</b>" // html body
        attachments: [{
            filename: 'tick.pdf',
            path: 'filepath',
            contentType: 'application/pdf'
          }]
	});
	res.send("Email has been sent successfully");
    
   // Sending Emails with SMTP, Configuring SMTP settings
 
    var smtpTransport = nodemailer.createTransport("SMTP",{
             host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
            auth: {
                 user: "nanibabu.bheemireddi@credencys.com",
                 pass: "hello"
            }
        });
        var mailOptions = {
            from: "Node Emailer ✔ <no-reply@iamrohit.in>", // sender address
            to: req.body.email, // list of receivers
            subject: req.body.subject+" ✔", // Subject line
            //text: "Hello world ✔", // plaintext body
            html: "<b>"+req.body.description+"</b>" // html body
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
          console.log(error)
             res.send("Email could not sent due to error: "+error);
        }else{
          //console.log(response)
             res.send("Email has been sent successfully");
        } 
	});
        var file = req.files;
        console.log(file);
        var filepath = path.join(__dirname, "tick.pdf");
        fs.readFile('tick.pdf', function (err, data) {
        if (err) throw err;                                                  
        var mailOptions = {
            from: 'nanibabu.bheemireddi@credencys.com', // sender address                                   
            to: 'nanibabu.bheemireddi@credencys.com', // list of receivers                                 
            subject: 'Attachment', // Subject line                                                 
            text: 'Hello world attachment test', // plaintext body                                                 
            html: '<b>Hello world attachment test HTML</b>', // html body                                               
            attachments: [
                {
                    filename: 'tick.pdf',   
                    streamSource: fs.createReadStream(filepath),
                    contentType: 'application/pdf',
                    encoding: 'base64'
                }]
        };

        // send mail with defined transport object                                                 
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
        //console.log(data);
        });*/
    var file = req.files;
    console.log(file);
    console.log(uploaddir);
    fs.writeFile(uploaddir+file[0].originalname, file[0].buffer,function(err){
        //console.log(err);    
    });
    //var pathfile = filepaths.create(file[0].originalname);
    //console.log(fs.realpathSync(file[0].originalname, []));
    var filepath = path.join(__dirname, file[0].originalname);
    console.log(filepath)
    //return false;    
    nodemailer.mail({
      from: "nanibabu.bheemireddi@credencys.com",      
      to: "nanibabu.bheemireddi@credencys.com", 
      subject: "Hello",
      text: "Hello world ✔", // plaintext body
      attachments: [
        {
            filename: file[0].originalname,   
            streamSource: fs.createReadStream(filepath),
        }]
    });
    fs.unlink(uploaddir + file[0].originalname, function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.send("Email has been sent successfully"); 
});
// Starting server
var server = http.createServer(app).listen(port, function() {
console.log("Listening on " + port);
});
