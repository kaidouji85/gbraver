#!/bin/sh

heroku config:add BASE_URL="http://gbraver-beta.herokuapp.com" --app gbraver-beta
heroku config:add GOOGLE_CLIENT_ID="87026478700-7rks1i5m08d9u01foqdglmgfveiemeju.apps.googleusercontent.com" --app gbraver-beta
heroku config:add GOOGLE_CLIENT_SECRET="YBAHPiJpTHMuXJcS5UvWR2q_" --app gbraver-beta