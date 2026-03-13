import { getPosts, postItem, posts } from "@/scripts/posts";
import { Heart } from "lucide-react";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// async function getMorePosts(cursorDate:Date) {

//   try {
//     const newPosts = await getPosts(cursorDate);

//     if (newPosts)
//   } catch (err) {
//     console.error('An error has occured when retrieving new posts: ',err);
//   }

// }

export default function Home({
    initialPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const [postData, setPostData] = useState<posts>(initialPosts);

    const getMorePosts = useCallback(async (cursorDate: Date) => {
        const newPosts = await getPosts(cursorDate);

        if (newPosts) {
            setPostData((prev) => ({
                ...newPosts,
                items: [...prev.items, ...newPosts.items],
            }));
        }
    }, []);

    console.log(initialPosts);

    useEffect(() => {
        console.log("THIS USE EFFECT JUST RUN");
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.disconnect();
                getMorePosts(postData.nextCursor);
            }
        });

        if (LoadingElement.current) {
            observer.observe(LoadingElement.current);
        }
    }, [getMorePosts, postData]);

    const LoadingElement = useRef<HTMLParagraphElement>(null);

    return (
        <main className="flex flex-col gap-y-5">
            {postData?.items.map((post) => (
                <Post data={post} key={post.id} />
            ))}
            {postData.hasMore && <p ref={LoadingElement}>Loading</p>}
        </main>
    );
}

function Post({ data }: { data: postItem }) {
    return (
        <article className="w-117">
            <div className="p-3">
                <p>{data.author}</p>
            </div>
            <div className="relative max-h-117 max-w-117 overflow-hidden rounded-md">
                <Image
                    src={data.imageUrl}
                    alt={data.id}
                    height={468}
                    width={468}
                    style={{ width: "100%", height: "auto" }}
                />
            </div>
            <div className="p-3">
                <div className="flex items-center gap-x-2">
                    <Heart size={24} />
                    <p>{data.likes}</p>
                </div>
            </div>
            <div className="px-3 pt-0 pb-3">
                <p>
                    <span className="font-semibold">{data.author}</span>{" "}
                    {data.caption}
                </p>
            </div>
        </article>
    );
}

export async function getServerSideProps() {
    const emptyIntialPosts: posts = {
        items: [],
        nextCursor: "",
        hasMore: false,
    };

    const initialPosts = await getPosts();

    return {
        props: {
            initialPosts: initialPosts ?? emptyIntialPosts,
        },
    };
}
