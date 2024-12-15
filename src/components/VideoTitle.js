import React from 'react'

const VideoTitle = ({ title, overview }) => {
    return (
        <div className='pt-[20%] px-12 absolute text-white bg-gradient-to-r from-black w-[100%] aspect-video'>
            <h1 className='text-3xl font-bold'>{title}</h1>
            <p className='py-4 text-md w-1/4'>{overview}</p>
            <div className='py-4'>
                <button className='bg-white text-black px-12 py-3 text-xl rounded-md hover:bg-opacity-80'>Play</button>
                <button className='bg-gray-500 text-white px-12 py-3 text-xl rounded-md mx-2 bg-opacity-50 hover:bg-opacity-40'>More Info</button>
            </div>
        </div>
    )
}

export default VideoTitle