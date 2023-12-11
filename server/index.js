const express = require('express');
const session = require('express-session');
const hidden_secret = require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());

const db = require('./models')

//Auth session
app.use(session({
    secret: hidden_secret.SECRET,//should be automatically updated over time
    resave: false,//prevent unnecessary writes to the session store
    saveUninitialized: false,//if the session was created but no data was added to it, the session will still be saved in the store.
    cookie: {
        path: '/' // Available for all paths
    }
}));

//Allow cookies in front-end
app.use(cors({
    origin: ['http://localhost:3000', 'https://smart-meal-prep.github.io/smart-meal-planning/'], // Specify the allowed origin
    credentials: true, // Allow credentials (cookies)
}));

//Routes
const userRouter = require('./routes/Users');
const inventoryRouter = require('./routes/Inventory');
const profileRouter = require('./routes/Profile');
const recipeRouter = require('./routes/Recipes');
app.use('/user', userRouter);
app.use('/inventory', inventoryRouter);
app.use('/profile', profileRouter);
app.use('/recipes', recipeRouter);

//Port
const port = process.env.PORT || 3001;

db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);//host http://localhost:3001/user
    });
});

