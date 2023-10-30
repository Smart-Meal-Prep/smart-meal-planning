const express = require('express');
const session = require('express-session');
const app = express();
app.use(express.json());

const db = require('./models')

//Auth session

//Routes
const userRouter = require('./routes/Users');
app.use('/user', userRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");//host http://localhost:3001/user
    });
});

