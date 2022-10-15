import React from "react";
// import Album from './components/album.js'

export const Category = ({categories, token, setAlbum, setScreen }) => {
  // <>
    //     {
    //     screen === 'album' ? <Album categories={categories} token={token} setScreen={setScreen} screen={screen} /> : null
    //     }
    // </>
  const handleClick = async (i) => {
    const genreId = categories[i].id
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=20`, {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token }
    })
    const data = await result.json()
    const Dgenere = [...data.playlists.items]
    Dgenere.forEach((key) => {
      if (key.description.length>50) {
        key.newDescription = key.description.substring(0, 50)
      }
    })
    setAlbum([...Dgenere])
    debugger
    setScreen('album')
  }
  return (
    <div className="App flex row justify-center flex-wrap">
      {categories.map((catagory, i) => (
        <div className='m-5' key={i} onClick={() => handleClick(i)}>
          <p className='absolute p-5 text-white'>
             { catagory.name }
          </p>
          <img src={catagory.icons[0].url} alt="" />
        </div>
      ))}
    </div>
  )
}
export default Category;
