import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, title, featuredImage }) {


    return (
        <>
            <Link to={`/post/${$id}`}>
            <div className="bg-gray-700 shadow-md p-4 rounded-lg">
                    <div className='w-full justify-center mb-4'>
                        <img src={service.getFilePreview(featuredImage)} alt={title} className='rounded-xl' />
                    </div>
                    <h2 className='text-xl font-bold'
                    >
                        {title}
                    </h2>
                </div>
            </Link>
        </>
    )
}