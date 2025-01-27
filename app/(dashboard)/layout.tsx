"use client"

import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header'), { ssr: false });

type Props = {
    children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
    return (
        <>  
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
        </>
    );
};

export default DashboardLayout;
