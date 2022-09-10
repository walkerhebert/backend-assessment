const albums = require('./db.json')
let globalID = 5

module.exports = {
    getAlbums: (req, res) => {
        res.status(200).send(albums)
    },
    deleteAlbum: (req, res) => {
        let index = albums.findIndex(elem => elem.id === +req.params.id)
        albums.splice(index, 1)
        res.status(200).send(albums)
    },
    createAlbum: (req, res) => {
        const {album, price, imageURL} = req.body;
        let newAlbum = {
            id: globalID,
            album,
            price,
            imageURL
            
        }
        albums.push(newAlbum)
        globalID++;
        res.status(200).send(albums)
    },
    updateAlbum: (req, res) => {
        console.log(req.params.id)
        console.log(req.body.type)
        const {type} = req.body;
        let index = albums.findIndex(elem => elem.id === +req.params.id)
        if(type === 'minus' && albums[index].price > 0){
            albums[index].price -=1;
            res.status(200).send(albums)
        }else if (type === 'plus'){
            albums[index].price +=1;
            res.status(200).send(albums)
        }else {
            res.status(400).send('Invalid price')
    }
    }
}
