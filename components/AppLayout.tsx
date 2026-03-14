import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Compass, House, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const isPostDetailsPage = router.pathname.includes("/post");

    return (
        <div className="relative h-screen w-screen overflow-auto md:flex md:flex-row">
            <nav className="fixed right-0 bottom-0 left-0 z-10 flex flex-row border-t border-solid border-gray-300 bg-white p-3 md:top-0 md:right-auto md:flex-col md:border-0">
                <Link href="/" className="hidden p-3 md:block">
                    <SiInstagram size={24} />
                </Link>
                <div className="flex w-12 flex-1 items-center justify-center gap-1 overflow-x-hidden hover:w-auto md:flex-col md:items-start">
                    <Link
                        href="/"
                        className="overflow-hidden rounded-lg p-3 transition hover:bg-gray-200"
                    >
                        <div className="flex w-fit items-center gap-x-3">
                            <House size={24} />
                            <p className="hidden w-36 md:block">Home</p>
                        </div>
                    </Link>
                    <Link
                        href="/explore"
                        className="overflow-hidden rounded-lg p-3 transition hover:bg-gray-200"
                    >
                        <div className="flex w-fit items-center gap-x-3">
                            <Compass size={24} />
                            <p className="hidden w-36 md:block">Explore</p>
                        </div>
                    </Link>
                    <Link
                        href="/create"
                        className="overflow-hidden rounded-lg p-3 transition hover:bg-gray-200"
                    >
                        <div className="flex w-fit items-center gap-x-3">
                            <Plus size={24} />
                            <p className="hidden w-36 md:block">Create</p>
                        </div>
                    </Link>
                </div>
            </nav>
            <div className="relative h-[calc(100vh-73px)] flex-1 overflow-y-auto p-3 md:h-full md:overflow-y-auto">
                <div
                    className={`w-full md:mx-auto md:h-full md:w-fit ${isPostDetailsPage ? "" : "md:max-w-[60.188rem]"}`}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
