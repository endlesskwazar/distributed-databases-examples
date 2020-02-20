const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

const Wish = new mongoose.model('Wish', new mongoose.Schema({
    title: String
}));

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/wishes', async (req, res) => {
    const {title} = req.body;
    try {
        const wish = await Wish.create({title});
        return res.json(wish);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

app.get('/api/wishes', async (req, res) => {
    try {
        const wishes = await Wish.find();
        return res.send(wishes);
    }
    catch(e) {
        res.status(400).send(e);
    }
});

http.createServer(app).listen(process.env.API_PORT, () => {
    console.log('Api server is started');
});