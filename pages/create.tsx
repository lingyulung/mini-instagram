import { Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

async function postImage(author: string, caption: string, file: File) {
    try {
        const url =
            "https://mini-instagram-api.mistcloud.workers.dev/api/posts";

        const formData = new FormData();

        formData.append("author", author);
        formData.append("caption", caption);
        formData.append("image", file);

        const postImgReq = await fetch(url, {
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY ?? "",
            },
            method: "POST",
            body: formData,
        });

        if (!postImgReq.ok) {
            throw new Error();
        }

        return true;
    } catch (err) {
        console.error("An error has happen when uploading the image: ", err);
    }
}

export default function Create() {
    const [file, setFile] = useState<File>();
    const fileInput = useRef<HTMLInputElement>(null);
    const authorInput = useRef<HTMLInputElement>(null);
    const captionInput = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        if (file && authorInput.current && captionInput.current) {
            postImage(
                authorInput.current.value,
                captionInput.current.value,
                file,
            );
        }
    }

    return (
        <div className="flex h-full w-full items-center justify-center">
            <main
                className={`flex h-[50.938rem] w-full flex-col items-center rounded-lg border border-solid border-gray-300 transition ${file ? "md:w-auto" : "md:w-[53.438rem]"}`}
            >
                <h1 className="w-full border-b border-solid border-gray-300 p-3 text-center">
                    Create new post
                </h1>
                <div className="flex w-full flex-1 overflow-hidden">
                    <div className="relative flex h-full shrink-0 flex-col items-center justify-center gap-y-3 md:w-[53.438rem]">
                        {file ? (
                            <Image
                                src={URL.createObjectURL(file)}
                                alt="uploaded image"
                                fill
                                objectFit="contain"
                            />
                        ) : (
                            <>
                                <Upload />
                                <p>Drag photos and videos here</p>
                                <button
                                    type="button"
                                    className="active: cursor-pointer rounded-md bg-blue-700 px-4 py-[0.438rem] text-white"
                                    onClick={() => {
                                        if (fileInput.current) {
                                            fileInput.current.click();
                                        }
                                    }}
                                >
                                    Select from computer
                                </button>
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInput}
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files.length > 0
                                        ) {
                                            setFile(e.target.files[0]);
                                        }
                                    }}
                                />
                            </>
                        )}
                    </div>
                    <div className="flex h-full w-81 flex-col justify-between border-l border-solid border-gray-300 p-3">
                        <div>
                            <p className="mt-3 font-medium">Author</p>
                            <input
                                type="text"
                                placeholder="Add a author name"
                                className="mt-3 w-full border-b border-solid border-gray-300 focus-visible:outline-0"
                                ref={authorInput}
                            />

                            <p className="mt-3 font-medium">Caption</p>
                            <input
                                type="text"
                                placeholder="Add a caption"
                                className="mt-3 w-full border-b border-solid border-gray-300 focus-visible:outline-0"
                                ref={captionInput}
                            />
                        </div>
                        <div>
                            <button
                                className="active: float-right cursor-pointer rounded-md bg-blue-700 px-4 py-[0.438rem] text-white"
                                onClick={handleSubmit}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
