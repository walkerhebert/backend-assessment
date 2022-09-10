const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const albumsContainer = document.querySelector('#albums-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/albums`

const albumsCallback = ({ data: album }) => displayAlbums(album)
const errCallback = err => console.log(err)

const getAllAlbums = () => axios.get(baseURL).then(albumsCallback).catch(errCallback)
const createAlbum = body => axios.post(baseURL, body).then(albumsCallback).catch(errCallback)
const deleteAlbum = id => axios.delete(`${baseURL}/${id}`).then(albumsCallback).catch(errCallback)
const updateAlbum = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(albumsCallback).catch(errCallback)


function submitHandler(e) {
    e.preventDefault()

    let album = document.querySelector('#album')
    let price = document.querySelector('#price')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        album: album.value,
        price: price.value, 
        imageURL: imageURL.value

    }

    createAlbum(bodyObj)

    album.value = ''
    price.value = ''
    imageURL.value = ''

}

function createAlbumCard(album) {
    const albumCard = document.createElement('div')
    albumCard.classList.add('album-card')

    albumCard.innerHTML = `<img alt='album cover image' src=${album.imageURL} class="album-cover-image"/>
    <p class="address">${album.album}</p>
    <div class="btns-container">
        <button onclick="updateAlbum(${album.id}, 'minus')">-</button>
        <p class="album-price">$${album.price}</p>
        <button onclick="updateAlbum(${album.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteAlbum(${album.id})">delete</button>
    `


    albumsContainer.appendChild(albumCard)
}

function displayAlbums(arr) {
    albumsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createAlbumCard(arr[i])
    }
}


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)

form.addEventListener('submit', submitHandler)

getAllAlbums()
