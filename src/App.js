import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import './App.css';
import Category from './components/Category.js'
import Album from './components/Album.js'

function App() {
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(null);
  const [screen, setScreen] = useState('categories');
  const [album, setAlbum] = useState([]);
  useEffect(() => {
    const APIController = (function () {
      const clientId = 'd6f431c3b2fa4a86a10afc4e079cd74d'
      const clientSecret = '112a67adb9ed4a07ad38c7cd13783c73'
      const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret)
          },
          body: 'grant_type=client_credentials'
        })
        const data = await result.json()
        return data.access_token
      }
      const _getGenres = async (token) => {
        // const result = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', { // recommendations
        const result = await fetch('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
        // const result = await fetch('https://api.spotify.com/v1/search?q=fear%20on%20fire&type=track', { // search box
        // const result = await fetch('https://api.spotify.com/v1/browse/new-releases?country=IN&offset=0&limit=40', { //new releases
          method: 'GET',
          headers: { Authorization: 'Bearer ' + token }
        })
        const data = await result.json()
        console.log(data)
        return data.categories.items
      }
      return {
        getToken () {
          return _getToken()
        },
        getGenres (token) {
          return _getGenres(token)
        }
      }
    })()
    const APPController = (function (APICtrl) {
      const loadGenres = async () => {
        const token = await APICtrl.getToken()
        // eslint-disable-next-line no-unused-vars
        const genres = await APICtrl.getGenres(token)
        setCategories([...genres])
        setToken(token)
      }
      return {
        init () {
          console.log('App is starting')
          loadGenres()
        }
      }
    })(APIController)
    APPController.init()
  }, [])
  return (
    <div className='bg-black '>
      <p className='text-white'>
        {screen}
      </p>
      {screen === 'categories'
          ? <Category categories={categories} token={token} setAlbum={setAlbum} setScreen={setScreen} />
          : <Album  album={album} token={token} setScreen={setScreen} screen={screen} />
        }
    </div>
  );
}

export default App;
