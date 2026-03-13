import { SiInstagram } from "@icons-pack/react-simple-icons";
import { Compass, House, Plus } from "lucide-react";

export function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-screen flex-col-reverse p-3 md:flex-row">
            <nav className="flex flex-row px-3 md:flex-col">
                <SiInstagram size={24} />
                <div className="flex flex-1 items-center justify-center gap-3 md:flex-col">
                    <House size={24} />
                    <Compass size={24} />
                    <Plus size={24} />
                </div>
            </nav>
            <div className="flex-1">
                <div className="w-full md:mx-auto md:w-[60.188rem]">
                    {children}
                </div>
            </div>
        </div>
    );
}
