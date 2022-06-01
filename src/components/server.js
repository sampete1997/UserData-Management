const express = require('express')
const app = express();
const db = require('./models');
const PORT = process.env.PORT || 3001;
const cors = require('cors');


app.use(cors());

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

const apiRoutes = require('./routes/apiRoutes')
const addme = require('./routes/addToDB')

app.use('/api',apiRoutes)
app.use('/api',addme)

db.sequelize.sync({}).then(() => {
    app.listen(PORT, () => {
        console.log('listning to port :', PORT);
    })
});



