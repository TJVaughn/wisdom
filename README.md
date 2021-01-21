# wisdom

## Random Quote Picking Application

The wisdom app, you can sign up at https://ancientwisdom.herokuapp.com/
Every day, the application chooses a random quote from the database and then emails the quote to users who have signed up. 
It also tweets the quote out @ancientwisbot

Technologies used are: 
- MongoDB
- Node.js
- React.js
- Express.js
- Agenda.js

To see the rest of the technologies used check out the package.json file.

The app is hosted on Heroku. It's currently using the free tier, due to this the app takes about 30 seconds to spin up. 

To build your own wisdom app:

1. git clone this repo
2. install dependencies with yarn install(on server as well as client)
3. Setup your mongoDB database seperately
4. mkdir /server/config/dev.env
5. in dev.env, add values for 
- HOST=0.0.0.0
- PORT=5000
- MONGO_URL=`INPUT LOCAL URL HERE`
- USERNAME=`MAKE A USERNAME`
- PASSWORD=`MAKE A PASSWORD`
- SENDGRID_API_KEY=`GET YOUR KEY FROM THEM IF YOU WANT TO USE THEIR SERVICE FOR SENDING EMAILS`
- TWITTER_TOKENS=`THERE ARE ACTUALLY 4 TOKENS, IF YOU WANT TO TWEET FROM THE SERVER`
6. If you want to use this config vars in production you can add them in your app settings on Heroku
7. Spin up your database server on your machine
8. yarn dev (in folder terminal)

I added in /server/rawHtml some raw African quotes that you can add to the database. Look in the /routers/quote.js file to find the route to add them. 
I will be updating these routes to clean it up and actually make these APIs a bit more sophisticated as this project was somewhat bodged together
I will also be sorting the quotes and writing better algorithms.
