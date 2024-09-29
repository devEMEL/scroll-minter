// import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import Link from 'next/link';
import kombatOdysseyImg from '../public/kombat-odyssey.jpeg';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
    // Use the useAccount hook to store the user's address
    const { address, isConnected } = useAccount();
    const { data: ethBalance } = useBalance({ address, chainId: 534351 }); // 11155111 sepolia

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // If the user is connected and has a balance, display the balance
    useEffect(() => {
        if (isConnected && ethBalance) {
            // setDisplayBalance(true);
            // return;
        }
    }, [ethBalance, isConnected]);

    const handleToggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="bg-[#ffffff] font-lato">
            <header className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8 text-[#000000]">
                <nav className="flex justify-between itens-center">
                    <div>
                        {/* LOGO IMG AND NAME (img w-16 or so) */}
                        <h2 className="flex gap-2">
                            <Link href="/" className="hover:text-gray-500">
                                Scroll Minter
                            </Link>
                            <Image
                                src={kombatOdysseyImg}
                                className="w-5 h-5 rounded-full h-auto"
                                alt=""
                            />
                        </h2>
                    </div>
                    <div
                        className={
                            isMobileMenuOpen
                                ? 'md:static absolute bg-[#ffffff] md:min-h-fit min-h-[30vh] left-0 top-[7%] md:w-auto w-full flex md:items-center px-5 py-10 md:py-0'
                                : 'md:static absolute bg-[#ffffff] md:min-h-fit min-h-[30vh] left-0 top-[-100%] md:w-auto w-full flex md:items-center px-5 py-10 md:py-0'
                        }
                    >
                        <ul className="flex md:flex-row flex-col items-center md:gap-[4vw] gap-4">
                            <li>
                                <Link href="/" className="hover:text-gray-500">
                                    Collections
                                </Link>
                            </li>
                            <li>
                                {/* <Link href="/profile" className="hover:text-gray-500">My Profile</Link> */}
                                <p className="text-gray-500">My Profile</p>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-6">
                        <ConnectButton />
                        <div className="md:hidden" onClick={handleToggleMenu}>
                            {isMobileMenuOpen ? (
                                <XMarkIcon width="25" cursor="pointer" />
                            ) : (
                                <Bars3Icon width="25" cursor="pointer" />
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
}
