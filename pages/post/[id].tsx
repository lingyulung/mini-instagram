import { CircleUserRound, Heart, Smile } from "lucide-react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";

interface postDetails {
    id: string;
    imageUrl: string;
    caption: string;
    author: string;
    likes: number;
    createdAt: string;
}

interface commentItem {
    id: string;
    postId: string;
    author: string;
    text: string;
    createdAt: string;
}

interface comments {
    postId: string;
    items: commentItem[] | [];
}

export default function PostDetail({
    postDetails,
    comments,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log("POST COMMENTS: ", comments);

    const authorCaption: commentItem = {
        id: postDetails.id,
        author: postDetails.author,
        postId: postDetails.id,
        text: postDetails.caption,
        createdAt: postDetails.createdAt,
    };

    return (
        <main
            className={`mx-auto flex h-[calc(100vh-(12px+12px))] w-full rounded-md border border-solid border-gray-300`}
        >
            <div className="relative w-[47.149rem]">
                <Image
                    src={postDetails.imageUrl}
                    alt={postDetails.imageUrl}
                    fill
                    objectFit="contain"
                />
            </div>
            <div className="flex w-125 flex-col border-l border-solid border-gray-300">
                <div className="border-b border-solid border-gray-300 p-3.5 font-semibold">
                    <p>{postDetails.author}</p>
                </div>
                <div className="flex flex-1 flex-col gap-y-3.5 overflow-y-auto p-3.5">
                    <Comment data={authorCaption} />
                    {comments.items.map((comment) => (
                        <Comment data={comment} key={comment.postId} />
                    ))}
                </div>
                <div className="border-t border-gray-300 px-3.5 pt-3.5">
                    <div>
                        <Heart />
                    </div>
                </div>
                <div className="mt-3.5 flex items-center gap-x-4 border-t border-solid border-gray-300 p-3.5">
                    <Smile />
                    <input
                        type="text"
                        placeholder="Add a comment"
                        className="flex-1 focus-visible:outline-0"
                    />
                    <p>Post</p>
                </div>
            </div>
        </main>
    );
}

function Comment({ data }: { data: commentItem }) {
    const createdDate = new Date(data.createdAt);

    return (
        <div className="flex items-start gap-x-4">
            <CircleUserRound />
            <div className="flex-1">
                <p>
                    <span className="font-medium">{data.author}</span>{" "}
                    {data.text}
                </p>
                <p>
                    {createdDate.getDate()}/{createdDate.getMonth() + 1}/
                    {createdDate.getFullYear()}
                </p>
            </div>
            <div>
                <Heart />
            </div>
        </div>
    );
}

async function getPostDetails(id: string) {
    const url = `https://mini-instagram-api.mistcloud.workers.dev/api/posts/${id}`;

    try {
        if (!url) {
            throw new Error("the id does not exist");
        }

        const postReq = await fetch(url, {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
            },
        });

        if (!postReq.ok) {
            throw new Error();
        }

        const postRes: postDetails = await postReq.json();

        return postRes;
    } catch (err) {
        console.error(
            "An error has occured when retrieving the post details: ",
            err,
        );
    }
}

async function getComments(id: string) {
    const url = `https://mini-instagram-api.mistcloud.workers.dev/api/comments/${id}`;

    try {
        const commentReq = await fetch(url, {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
            },
        });

        if (!commentReq.ok) {
            throw new Error();
        }

        const commentRes: comments = await commentReq.json();

        return commentRes;
    } catch (err) {
        console.error(
            "An error has occured when retrieving comments for the post: ",
            err,
        );
    }
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    const id = ctx.params?.id;
    let postDetails: postDetails = {
        id: "",
        imageUrl: "",
        caption: "",
        author: "",
        likes: 0,
        createdAt: "",
    };
    let comments: comments = {
        postId: "",
        items: [],
    };

    if (id) {
        postDetails = (await getPostDetails(id as string)) ?? postDetails;
        comments = (await getComments(id as string)) ?? comments;
    }

    return {
        props: {
            postDetails,
            comments,
        },
    };
}
