const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment } = require('./controller2')
const { getFortune } = require('./controller2')

// const controller = require('./controller');

const {getAlbums, createAlbum, updateAlbum, deleteAlbum} = require('./controller')

// const { getAlbums } = require('./controller2')


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);

app.get('/api/albums', getAlbums)
app.put('/api/albums/:id', updateAlbum)
app.post('/api/albums', createAlbum)
app.delete('/api/albums/:id', deleteAlbum)



app.listen(4000, () => console.log("Server running on 4000"));
