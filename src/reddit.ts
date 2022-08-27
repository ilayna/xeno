import Snoowrap from 'snoowrap'
import { config } from 'dotenv'
config();

const client_id = process.env['REDDIT_CLIENT_ID']
const client_secret = process.env['REDDIT_CLIENT_SECRET']
const username = process.env['REDDIT_USERNAME']
const password = process.env['REDDIT_PASSWORD']

if (!client_id || !client_secret || !password || !username) {
    console.log('reddit client id or client secret not found !, exitting !');
    process.exit(0);
}

const r = new Snoowrap({
    userAgent: 'Xenbot by u/wabulu',
    clientId: client_id,
    clientSecret: client_secret,
    username: username,
    password: password,
  });

const randomSub = r.getRandomSubmission('memes');
const res = async () => {
    await randomSub.then((sub) => {
        console.log(sub.url);
    });
} 
res();