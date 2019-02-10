'use strict';

const express = require('express');
const mongoose = require('mongoose');


// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
	mongoose.connect('mongodb://mongo:27017/test', {useNewUrlParser: true});

	const Cat = mongoose.model('Cat', { name: String });
	const kitty = new Cat({ name: 'Zildjian' });
	kitty.save().then(() => res.send(JSON.stringify(kitty)));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
