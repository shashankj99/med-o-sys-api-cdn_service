const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use(express.urlencoded({ extended: true }));

// accept the json request with a memory limit of max 50 mb.
app.use(express.json({ limit: "50mb" }));

// registering all the routes
app.use('/', routes);

// listen to the port 5000
app.listen(35801, () => {
    console.log(`listening to the post 35801`);
});
