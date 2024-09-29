import Link from 'next/link';
import { DiscordIcon, TwitterIcon } from './Icons';

type Props = {
    className?: string;
};

const navigation = [
    {
        name: 'Twitter Icon',
        href: 'https://x.com/Kombat_Odyssey',
        icon: TwitterIcon,
    },
    {
        name: 'Discord Icon',
        href: 'https://discord.com/invite/QKvwARq5',
        icon: DiscordIcon,
    },
];

export default function Footer() {
    return (
        <footer className=" text-[#ffffff] font-lato">
            <div className="mx-auto max-w-7xl py-6 px-5 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center space-x-6 md:order-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className=" hover:text-forest mt-5"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.icon()}
                        </Link>
                    ))}
                </div>
                <p className="text-center mt-4 tracking-widest">
                    A product of Kombat Odyssey
                </p>
            </div>
        </footer>
    );
}
