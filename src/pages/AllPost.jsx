import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import service from '../appwrite/config'


export default function AllPost() {
    const [posts, setPosts] = useState([]);

    service.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

    return (
        <>
            <div className='py-8'>

                <Container>
                    <div className='flex flex-wrap'>

                        {
                            posts.map((post) => (
                                <div key={post.$id} className='p-4 w-1/4'>
                                    <PostCard {...post} />
                                </div>

                            ))
                        }

                    </div>
                </Container>

            </div>
        </>
    )
}