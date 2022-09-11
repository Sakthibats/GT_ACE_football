const express = require('express')
const bodyParser = require('body-parser')

// App config & Middlewares
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

// Receives LongURL via post req body and generates a ShortURL then stores in MySQL backend service
app.post('/ranked', (req, res)=>{
	console.log(req.body)
	res.send({"Testing":123}) 
})

// Listen on assigned port
app.listen(app.get('port'), function () {
    console.log(`URL Shortening service listening at port: ${app.get('port')}`);
});