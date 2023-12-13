<p align="center">
  <img src="https://github.com/Smart-Meal-Prep/smart-meal-planning/blob/main/front-end/src/assets/cooking_logo.png?raw=true" width="400" alt="logo"/>
</p>

---

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Boostrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## Table of Contents

1. [What is smart meals ?](#what-is-smart-meals)
2. [Installation](#installation)
3. [Tests](#tests)
4. [Env variables](#env-variables)
5. [Contributors](#contributors)
6. [Acknowledgement](#acknowledgement)

## <a name="what-is-smart-meals"> What is Smart Meals ?</a>
Smart Meals revolutionizes meal planning! Our web app simplifies everything from ingredient management to meal creation. Easily add items to your inventory and generate a personalized meal list. Sorted by strength, discover the most efficient meals based on matched ingredients, cutting down on costs and waste. Try it out and elevate your meal experience! 🌟

#### Want to checkout the website ? <a href="https://smart-meal-prep.github.io/smart-meal-planning/" target="_blank">**Heres the link ☀️**</a>.

## <a name="installation">Installation</a>

To install this project, you will need to have the following on your machine :

![NPM](https://img.shields.io/badge/-npm-black?style=for-the-badge&logoColor=white&logo=npm&color=CE0201)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

Then, run the following commands :

```bash
# Install dependencies for client-side
./front-end
npm install

# Install dependencies for back-end
./server
npm install

# Start client-side 
cd ../front-end
npm run start

# Run server-side
cd ../server
npm run start
```

The above command will start the app and watch for changes on local.

### <a name="tests"> Test </a>

To run the tests available in this project, run the following commands in each respected environment

```bash
# Run test command
./front-end
npm run test

# Run test command
./server
npm run test

```
## <a name="env-variables">Env variables</a>

You can create a `.env` file in the `./server` directory to override the default values when starting the app locally with `npm run start` command.
Please also change the server listening port to listen on your local port number as well as ***changing the REST API URL calls to your localhost*** in `./front-end/config/fetch.js` and allowing your localhost as a origin for cors in `./server/index.js`

Environment variables are :

|        Name         |               Description               | Required | Default value |                   Limitations                    |
|:-------------------:|:---------------------------------------:|:--------:|:-------------:|:------------------------------------------------:|
|       `HOST`        | Database key |    ✅     |  ❌  |          Can't be empty string           |
|       `PORT`        | Database port |    ✅     |    ❌     | Must be a number  |
|   `USER_NAME`   |  Database key  |    ✅     |       ❌       |  Can't be empty string   |
|   `PASSWORD`   |        Database key        |    ✅     |       ❌       |              Can't be empty string               |
|   `DATABASE`   |           Database key          |    ✅     |  ❌  | Can't be empty string |
|   `SECRET`   |          Cors secret key          |    ✅     |       ❌       |              Can't be empty string               |


## <a name="contributors">Contributors</a>
This project is part of our CTP curriculum for cohort 9. Thank you to all those who contributed to making this project come to life.

[//]: contributor-faces
<a href="https://github.com/DFLotus"><img src="https://avatars.githubusercontent.com/u/92601176?v=4" title="DF-Lotus" width="50" height="50"></a>
<a href="https://github.com/matteoSaputo"><img src="https://avatars.githubusercontent.com/u/80838566?v=4" title="Matteo-Saputo" width="50" height="50"></a>

[![GitHub contributors](https://img.shields.io/github/contributors/Smart-Meal-Prep/smart-meal-planning.svg)](https://github.com/Smart-Meal-Prep/smart-meal-planning/graphs/contributors)
## <a name="acknowledgement">Acknowledgement</a>
<a href="https://github.com/CUNYTechPrep"><img src="https://avatars.githubusercontent.com/u/28817068?s=200&v=4" title="Matteo-Saputo" width="50" height="50"></a>


