const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./auth/basicAuth');




routes = require('./routes')(auth);

app.get('/', auth,  (req, res) => {
    res.send(200, 'Authenticated');
});

app.use(bodyParser.json());
app.use('/api', routes.unprotected);
app.use('/api', auth, routes.protected);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
