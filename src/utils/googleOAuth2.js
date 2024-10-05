import path from 'node:path';
import { readFile } from 'fs/promises';
import { OAuth2Client } from 'google-auth-library';

import { env } from './env.js';

const PATH_JSON = path.join(process.cwd(), 'google-oauth.json'); //path to the google-oauth.json file

const OAuthCONFIG = JSON.parse(await readFile(PATH_JSON));

const googleOAuthClient = new OAuth2Client({
  clientId: env('GOOGLE_AUTH_CLIENT_ID'),
  clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
  redirectUri: OAuthCONFIG.web.redirect_uris[0],
});

export const generateAuthUrl = () => {
  googleOAuthClient.generateAuthUrl({
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  });
};
