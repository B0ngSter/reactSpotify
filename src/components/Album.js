import React from 'react'

export const Album = ({token, setScreen, album, screen}) => {
  return (
        
    <div className='bg-black '>
        {
        album.map((catagory, i) => (
            <div key={i}>
                <img src={catagory.images[0].url} className="p-2" />
                <div>
                    <p className="font text-white pl-2" >{ catagory.name }</p>
                </div>
                <div>
                    <p className="font text-white pl-2">{ catagory.newDescription }</p>
                </div>
            </div>
         )) 
        }
    </div>
  )
}
export default Album;
