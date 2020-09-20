# Backend

Back end is up : https://royer-salty-hackers.herokuapp.com/

To log in : https://royer-salty-hackers.herokuapp.com/api/auth/login
Login requires: 
{
    "email": "royeraadames@gmail.com",
    "password": "admin"
}
There is already 10 users by default on the database, see the picture to know more about it. There password for all of them is admin

To sign up: https://royer-salty-hackers.herokuapp.com/api/users
Sing up requires:
{
    "first_name": "Royer",
    "last_name": "adames",
    "email": "royeraadames@gmail.com",
    "password": "admin"
}
When you log in you get a token has a response.

You need a valid token to access users, and comments
To get all users: https://royer-salty-hackers.herokuapp.com/api/users/

To get all comments: https://royer-salty-hackers.herokuapp.com/api/comments
