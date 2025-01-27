"use client"

import { NavButton } from "./nav-button"
import { usePathname, useRouter } from "next/navigation"
import { useMedia } from "react-use"

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { Button } from "./ui/button"
import { Menu, Home, FileText, CreditCard, Tag } from "lucide-react"
import Image from "next/image"

const routes = [
    {
        href: "/",
        label: "Overview",
        icon: <Home className="h-5 w-5" />
    },
    {
        href: "/transactions",
        label: "Transactions",
        icon: <FileText className="h-5 w-5" />
    },
    {
        href: "/accounts",
        label: "Accounts",
        icon: <CreditCard className="h-5 w-5" />
    },
    {
        href: "/categories",
        label: "Categories",
        icon: <Tag className="h-5 w-5" />
    },
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMedia("(max-width: 1024px)", false);

    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    }

    if (isMobile) {
        return (
            <>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <div
                            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition p-2 rounded-md cursor-pointer"
                        >
                            <Menu className="h-5 w-5" />
                        </div>
                    </SheetTrigger>
                    <SheetContent side="left" className="px-2 bg-white min-w-[220px] max-w-[260px]">
                        <Image
                            src="/logo-2.png"
                            height={30}
                            width={30}
                            alt="logo"
                        />
                        <nav className="flex flex-col gap-y-2 pt-6">
                            {
                                routes.map(({ href, label, icon }) => (
                                    <Button
                                        variant={href === pathname ? "secondary" : "ghost"}
                                        key={href}
                                        onClick={() => { onClick(href) }}
                                        className="w-full justify-start"
                                    >
                                        {icon}
                                        <span className="ml-2 text-md">{label}</span>
                                    </Button>
                                ))
                            }
                        </nav>
                    </SheetContent>
                </Sheet>
            </>
        );
    }

    return (
        <div className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
            {
                routes.map(({ href, label }, index) => (
                    <NavButton 
                    key={index} 
                    label={label}
                    href={href}
                    isActive={pathname === href}
                    />
                ))
            }
        </div>
    );
}

