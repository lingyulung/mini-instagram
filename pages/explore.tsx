import Image from "next/image";
import { useEffect, useState } from "react";

interface postItem {
    id: string;
    imageUrl: string;
    caption: string;
    author: string;
    likes: number;
    createdAt: Date;
}

interface posts {
    items: postItem[];
    nextCursor: Date;
    hasMore: boolean;
}

async function getPosts(cursor?: Date) {
    let url = "https://mini-instagram-api.mistcloud.workers.dev/api/posts";

    if (cursor) {
        url += `?cursor=${cursor}`;
    }

    try {
        const req = await fetch(url, {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
            },
        });

        if (!req.ok) {
            throw new Error();
        }

        const response: posts = await req.json();

        return response;
    } catch (err) {
        console.error("An error has occured when retrieving the posts: ", err);
    }
}

export default function Explore() {
    const [posts, setPosts] = useState<posts>();

    useEffect(() => {
        const postRes = getPosts();

        postRes.then((res) => {
            if (res) {
                setPosts(res);
            }
        });
    }, []);

    return (
        <main className="grid-rows-auto grid grid-cols-3 gap-px">
            {posts?.items.map((post) => (
                <article key={post.id} className="relative h-80 w-[20rem]">
                    <Image src={post.imageUrl} alt={post.id} fill />
                    {/* <img src={post.imageUrl} alt={post.id} /> */}
                </article>
            ))}
        </main>
    );
}
