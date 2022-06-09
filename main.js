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

//help from bolt
     installationStore: {
      storeInstallation: async (installation) => {
        // Bolt will pass your handler an installation object
        // Change the lines below so they save to your database
        if (installation.isEnterpriseInstall && installation.enterprise !== undefined) {
          // handle storing org-wide app installation
          return await database.set(installation.enterprise.id, installation);
        }
        if (installation.team !== undefined) {
          // single team app installation
          return await database.set(installation.team.id, installation);
        }
        throw new Error('Failed saving installation data to installationStore');
      },
      fetchInstallation: async (installQuery) => {
        // Bolt will pass your handler an installQuery object
        // Change the lines below so they fetch from your database
        if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
          // handle org wide app installation lookup
          return await database.get(installQuery.enterpriseId);
        }
        if (installQuery.teamId !== undefined) {
          // single team app installation lookup
          return await database.get(installQuery.teamId);
        }
        throw new Error('Failed fetching installation');
      },
      deleteInstallation: async (installQuery) => {
        // Bolt will pass your handler  an installQuery object
        // Change the lines below so they delete from your database
        if (installQuery.isEnterpriseInstall && installQuery.enterpriseId !== undefined) {
          // org wide app installation deletion
          return await database.delete(installQuery.enterpriseId);
        }
        if (installQuery.teamId !== undefined) {
          // single team app installation deletion
          return await database.delete(installQuery.teamId);
        }
        throw new Error('Failed to delete installation');
      },
    },

})


  app.message('hello', async ({ message, say }) => {
    await say({
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            "text": `Hey there <@${message.user}>!`
          },
        }
      ],
      text: `Hey there <@${message.user}>!`
    });
  });
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
