<br />
<div align="center">
    <img src="./.github/AnixLogo.png" alt="Anix Logo" width="150">
    <h3 align="center">Anix</h3>
    <p> A personal anime manager
</div>

# About
Do you remember all the animes you've watched? Depending on the amount, it's an almost impossible task, so Anix came to help you quickly and intuitively. 
Manage the status of your anime, favorite and discover new ones.


## Technologies
These are the main tools, frameworks and languages that were used in this project:<br>

<div>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/postgresql-%23336791.svg?&style=for-the-badge&logo=postgresql&logoColor=white" />
  <img style='margin: 5px;' src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/SuperTest-9254ff?style=for-the-badge&logo=supertest"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Joi-FFFF00?style=for-the-badge&logo=joi&logoColor=058a5e"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens"/>
</div>

## How to Run

You can use this API in two ways, cloning this repository or testing with our deploy running on Heroku

To clone the project, run the following command:

```git
git clone https://github.com/bruno-ruotolo/Anix-Admin.git
```

Then, navigate to the project folder and run the following command:

```git
npm i
```

Finally, start the server:

```git
npm start
```

You can now access the API's endpoints locally, use the Prisma Migrations to create your database:

```git
npm prisma migrate dev
```

If you want to use the deployed API access: https://anix-ruotolo.herokuapp.com

# API Reference

Here you can check the endpoints related to the project, as well as their respective characteristics. Have Fun 😄

## Routes
### Authentication Routes

#### Register
   - POST _/signup_

   - Body  
```json
{
  "email": "user@myemail.com",
  "password": "mypassword", // >= 8 char, one letter, onde number and one special charactere
  "confirmPassword": "mypassword",
  "username": "My Name",
  "image" : "animagelink.png",
  "genderId": 0,
  "firstGenreId": 0,
  "secondGenreId": 0,
  "thirdGenreId": 0,
}
```


#### Login
- POST _/_

- Body
```json
{
  "email": "user@myemail.com",
  "password": "mypassword"
}
```
---

### Home Houter

#### Data Infos Routes

## Get all infos of an especific anime
- GET _/anime/:id_

- Header
```json
{
    "Authorization" : "Bearer <token>"
}
``` 

## Get a random anime based on the user favorite's genres
- GET _/home/foryou_

- Header
```json
{
    "Authorization" : "Bearer <token>"
}
``` 

## Get all the animes of current season
- GET _/home/season_

- Header
```json
{
    "Authorization" : "Bearer <token>"
}
``` 

## Get the most popular animes based on users' favorites
- GET _/home/popular_

- Header
```json
{
    "Authorization" : "Bearer <token>"
}
``` 

## Authors
### Bruno Ruotolo

[![GitHub](https://img.shields.io/badge/-BrunoRuotolo-black?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/bruno-ruotolo/)]([https://www.linkedin.com/in/bruno-amaral-ruotolo-295876186/](https://github.com/bruno-ruotolo/))
[![Gmail Badge](https://img.shields.io/badge/-brunoaruotolo@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:)](mailto:brunoaruotolo@gmail.com)
[![Linkedin Badge](https://img.shields.io/badge/-brunoamaralruotolo-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/bruno-amaral-ruotolo-295876186/)](https://www.linkedin.com/in/bruno-amaral-ruotolo-295876186/)
