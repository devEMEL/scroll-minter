import { FC, ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
    children: ReactNode;
}
const Layout: FC<Props> = ({ children }) => {
    return (
        <>
            <div className="overflow-hidden min-h-screen">
                <div className="fixed top-0 -z-10 h-full w-full">
                    <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                    {/* https://bg.ibelick.com/ */}
                </div>
                <Header />
                <div className="py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
                    {children}
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Layout;
