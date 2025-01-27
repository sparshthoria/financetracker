import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="lg:flex items-center hidden">
            <Image
                src="/logo.png"
                alt="Finance Tracker"
                width={30}
                height={30}
            />
            <p className="font-semibold text-white ml-2.5 text-2xl">
                BudgeBuddy
            </p>
            </div>
        </Link>
    );
}