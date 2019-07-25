// imports
const express = require('express');
const fs = require('fs');
const RiveScript = require('rivescript');


let bot = new RiveScript({utf8:true} ); // enable Arabic


var FileData = fs.readFileSync('users_database.json')
// Sync because we want to load all the data first

var users = JSON.parse(FileData);
// the very basic database here..
// we are saving the customer's data 
// key -> mobile number (unique)
// value -> the name



// load the rivescripts files
bot.loadFile(['./Brain/star.rive','./Brain/chat.rive','./Brain/begin.rive'] , () => 
{
    console.log('read success');
    bot.sortReplies();
}
, (error) =>
{

    console.log('Error reading file: ' + error);
}

);


function ask(message) // read data from a readable stream one line at a time
{
   
        bot.reply('local-user',message).then(function(reply){
        
            console.log(reply)
            return reply;
        });
   
}


function file_is_written(error)
{
    if(error)
        throw error

    else
    console.log('File Written')
}



var app = express(); // run the express function 


var server = app.listen(3000, () =>
    {
        console.log("lisetning....")
     
    }
    );

console.log("Server is starting..");


app.use(express.static('public'));

// API's part

// get the user chat
app.get('/chat/:user_input',sendText);
function sendText(request,response)
{
var text = request.params.user_input

bot.reply('local-user',text).then(function(reply){
            
    response.send(reply)
});
}


// save to the database
app.get('/add/:name/:number', (request,response) =>
{

    var key = request.params.number;
    var value = request.params.name;

    users[key] = value;

    var data = JSON.stringify(users)

    fs.writeFile('users_database.json',data, () => { 

        console.log("saved.")
    });     

    response.send(users);

} );




// show the content of the database
app.get('/db/', (request,response) =>
{
    response.send(users)
}
);




