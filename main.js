const {App} = require('@slack/bolt');
const axios = require('axios');
const dotenv = require('dotenv')

dotenv.config()

const app = new App({
    token: `${process.env.BOT_TOKEN}`,
    name: 'paatchbot',
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000

  });
  
  app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
      
        "text": "Hello @TeamParis! Aujourd'hui vous êtes xx au bureau à Paris demain. Il reste xx places. Intéressé.e.s? 🙌React pour ajourd'hui et 🌲pour demain",
        "attachments": [
            {
                "title": "flatstudio.paat.ch",
               
                
                "image_url": "http://i.imgur.com/OJkaVOI.jpg?1"
                
            },

            {
                "title": "Cela vous interesse t'il?",
                "callback_id": "comic_1234_xyz",
                "color": "#3AA3E3",
                "attachment_type": "default",
                "actions": [
                    {
                        "name": "Yes",
                        "text": "Yes",
                        "type": "button",
                        "value": "Sure"
                    },
                    {
                        "name": "no",
                        "text": "No",
                        "type": "button",
                        "value": "sureno"
                    }
                ]
            }
        ]
    
    });
  });
  
  (async () => {
    // Start your app
    await app.start();
  
    console.log('⚡️ Your app is actually running!');
  })();