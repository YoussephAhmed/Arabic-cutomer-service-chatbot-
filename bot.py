
import os.path
from rivescript import RiveScript






file = os.path.dirname(__file__)
brain = os.path.join(file,'brain')


bot = RiveScript(utf8=True) # enables Arabic
bot.load_directory(brain)
bot.sort_replies()


while True :
    msg = str(input('You> '))

    if msg == 'quit':
        break

    else:
       print('Bot> ' + bot.reply('localuser',msg))


