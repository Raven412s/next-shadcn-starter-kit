import Link from "next/link";
import { AiTwotoneBuild } from "react-icons/ai";
import { cn } from "@/lib/utils"
import NavbarActionBlock from "../blocks/NavbarActionBlock";
import { buttonVariants } from "../ui/button";

const Navbar = () => {
    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-sm bg-background/75 border-b border-border",
            "flex items-center justify-between h-16 px-4 md:px-8 lg:px-12"
        )}>
            <div id={"logo"} className="flex items-center gap-8">
                <AiTwotoneBuild color={`var(--color-primary)`} floodColor={`var(--color-primary)`} fill={`var(--color-primary)`} className="size-12 " />
                <span className="hodden lg:block font-bold text-lg w-max">Starter Kit</span>
            </div>
            <nav className="flex items-center h-24 gap-4">
                <Link href={"/"} className="text-sm font-medium hover:underline underline-offset-4">Home</Link>
                <Link href={"/docs/installation"} className="text-sm font-medium hover:underline underline-offset-4">Docs</Link>
                <Link href={"/docs/components"} className="text-sm font-medium hover:underline underline-offset-4">Components</Link>
            </nav>
            <div id="get-started" className="flex items-center gap-4">
                <Link href={"/docs/getting-started"} className={cn(buttonVariants({ variant: "default", size: "default" }), "")}>Get Started</Link>
                <NavbarActionBlock />
            </div>
        </header>
        

    )
}

export default Navbar
