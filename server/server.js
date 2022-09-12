const express = require('express')
const bodyParser = require('body-parser')
const cors=require("cors");

// App config & Middlewares
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

const corsOptions ={
   origin:'*', 
   credentials:true,  //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// Sorting Criteria to rank the objects in groups. 
// Sorting priority in order of points=> goals=> altpoints => register date
function sorting(a, b){
	if (a.points<b.points){
		return 1
	}else if (a.points>b.points){
		return -1
	}else{
		if (a.goals<b.goals){
			return 1
		}else if (a.goals>b.goals){
			return -1
		}else{
			if (a.altpoints<b.altpoints){
				return 1
			}else if (a.altpoints>b.altpoints){
				return -1
			}else{
				if (a.date>b.date){
					return 1
				}else{
					return -1
				}
			}
		}
	}
}

// On startup of Backend API service on browser
app.get('/', (req, res)=>{
	res.send("Backend API service for Football Tournament")
})

// Receives LongURL via post req body and generates a ShortURL then stores in MySQL backend service
app.post('/ranked', async(req, res)=>{
	let group1 = []
	let group2 = []
	let indexed = {}
	let teamdetails = req.body.Teams.trim(); //Trim extra spaces before and after string
	await teamdetails.split('\n').forEach(element => {
		let line = element.split(' ')
		let date = line[1].split('/')
		if (line[2] == '1'){
			indexed[line[0]] = {'group':1, 'index':group1.length}
			group1.push({'name':line[0], 'date': new Date('2022', date[1], date[0]),'points':0, "altpoints":0, 'goals':0})

		}else{
			indexed[line[0]] = {'group':2, 'index':group2.length}
			group2.push({'name':line[0], 'date': new Date('2022', date[1], date[0]), 'points':0, "altpoints":0, 'goals':0})
		}
	});
	let fullbracket = [group1, group2]
	let matchdetails = req.body.Matches.trim(); //Trim extra spaces before and after string
	await matchdetails.split('\n').forEach(element=>{
		let line = element.split(' ')
		// First Wins
		if (parseInt(line[2])>parseInt(line[3])){
			let winner = indexed[line[0]]
			let loser = indexed[line[1]]
			fullbracket[winner.group-1][winner.index].points += 3 
			fullbracket[winner.group-1][winner.index].altpoints += 5 
			fullbracket[winner.group-1][winner.index].goals += parseInt(line[2])  
			fullbracket[loser.group-1][loser.index].altpoints += 1 
			fullbracket[loser.group-1][loser.index].goals += parseInt(line[3]) 
		}
		// Second Wins
		else if (parseInt(line[3])>parseInt(line[2])){
			let winner = indexed[line[1]]
			let loser = indexed[line[0]]
			fullbracket[winner.group-1][winner.index].points += 3 
			fullbracket[winner.group-1][winner.index].altpoints += 5 
			fullbracket[winner.group-1][winner.index].goals += parseInt(line[3])  
			fullbracket[loser.group-1][loser.index].altpoints += 1 
			fullbracket[loser.group-1][loser.index].goals += parseInt(line[2]) 
		}
		// Tie
		else if (parseInt(line[2])==parseInt(line[3])){
			let tie1 = indexed[line[0]]
			let tie2 = indexed[line[1]]
			fullbracket[tie1.group-1][tie1.index].points += 1 
			fullbracket[tie1.group-1][tie1.index].altpoints += 3 
			fullbracket[tie1.group-1][tie1.index].goals += parseInt(line[2])  
			fullbracket[tie2.group-1][tie2.index].points += 1 
			fullbracket[tie2.group-1][tie2.index].altpoints += 3 
			fullbracket[tie2.group-1][tie2.index].goals += parseInt(line[3])  
		}
	})
	group1.sort((a, b)=>sorting(a, b))
	group2.sort((a, b)=>sorting(a, b))
	res.send({"group1":group1, "group2":group2}) 
})

// Listen on assigned port
app.listen(app.get('port'), function () {
    console.log(`Football Tournament ranking applet listening at port: ${app.get('port')}`);
});