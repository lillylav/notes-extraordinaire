import express, { static, urlencoded, json } from 'express';
const apiRoutes = require('./routes/apiRoutes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// link the public folder so the page can use the client-side HTML, CSS, and JavaScript
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// use modularized code in routes/apiRoutes/index.js to display routes without api
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// listening event at the port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});