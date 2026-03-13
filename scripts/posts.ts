export interface postItem {
    id: string;
    imageUrl: string;
    caption: string;
    author: string;
    likes: number;
    createdAt: string;
}

export interface posts {
    items: postItem[];
    nextCursor: Date;
    hasMore: boolean;
}

export async function getPosts(cursor?: Date) {
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