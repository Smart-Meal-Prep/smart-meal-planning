const express = require('express');
const session = require('express-session');
const env = require('./config/settings.js')
const app = express();
app.use(express.json());

const db = require('./models')

//Auth session
app.use(session({
    secret: env.SECRET,//should be automatically updated over time
    resave: false,//prevent unnecessary writes to the session store
    saveUninitialized: false,//if the session was created but no data was added to it, the session will still be saved in the store.
    cookie: {
        path: '/' // Available for all paths
    }
}));

//Routes
const userRouter = require('./routes/Users');
const inventoryRouter = require('./routes/Inventory');
app.use('/user', userRouter);
app.use('/inventory', inventoryRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");//host http://localhost:3001/user
    });
});

