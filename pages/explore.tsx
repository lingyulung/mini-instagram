import { getPosts, posts } from "@/scripts/posts";
import Image from "next/image";
import { useEffect, useState } from "react";

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
