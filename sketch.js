function setup()
{

let bot = new RiveScript({utf8:true} ); // enable Arabic


// load the file

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


    let button = select('#submit');
    let user_input = select('#user_input');


    button.mousePressed(chat);

    function chat()
    {
        let input =  user_input.value();
     

        bot.reply('local-user',input).then(function(reply)
            {
                let output = reply;

                createP("User>  " + input);
                createP("Bot>  " + output);
        
            });
        

        

 
    }

}
