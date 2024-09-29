import AddCollectionModal from '@/components/AddCollectionModal';
import CollectionList from '@/components/CollectionList';
import Head from 'next/head';

// Export the Home component
export default function Home() {
    return (
        <div>
            <Head>
                <link
                    rel="shortcut icon"
                    href="favicon.ico"
                    type="image/x-icon"
                />
                <title>Scroll Minter</title>
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                ></meta>
            </Head>
            <AddCollectionModal />
            <CollectionList />
        </div>
    );
}
