var api_key = 'key-b10dd6ab0faa4881eb75ac97a14986f0';
var domain = 'sandbox83348788cedf4ba7846fe3dcb8a948f1.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key,domain: domain});
var path = require("path");

var filepath = path.join(__dirname, "tick.pdf");


var data = {
	from: 'nanibabu.bheemireddi@credencys.com',
	to:"nanibabu.bheemireddi@credencys.com",
	subject:"hello",
	text: "sending message",
	attachment:filepath
};

mailgun.messages().send(data,function(error,body){
	if(error){
		console.log(error);
	} else {
		console.log(body);
	}
})