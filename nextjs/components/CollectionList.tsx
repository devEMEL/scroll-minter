import {
    getTokenURI,
    imageURIToSrc,
    MakeTxCallWithAlchemy,
    truncateAddress,
    weiToEther,
} from '@/helpers';
import { AppDispatch, RootState } from '@/state/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNfts } from '../state/appStateSlice';
import { toast } from 'react-toastify';
import { ethers, parseUnits } from 'ethers';
import NFTCollection from '../abi/NFTCollection.json';
import { useEthersProvider, useEthersSigner } from '@/pages/_app';
import { useChainId } from 'wagmi';
import MintSuccessNotification from './MintSuccessNotification';
import Image from 'next/image';
import kombat from '../public/kombat-odyssey.jpeg';

const CollectionList = () => {
    // const [isVisible, setIsVisible] = useState(true);

    const items = useSelector((state: RootState) => state.appState.items);
    const loading = useSelector((state: RootState) => state.appState.loading);
    const dispatch = useDispatch<AppDispatch>();

    const mySigner = useEthersSigner();
    const myProvider = useEthersProvider();
    const chainId = useChainId();

    const getAmountMinted = (contractAddress: string) => {
        // const contract = new ethers.Contract(contractAddress, NFTCollection.abi, myProvider);
        // const tokenId = await contract._tokenIds();
        // return String(tokenId);
        console.log('hello');
        return 'hello';
    };

    const handleMintNFT = async (
        imageURI: string,
        name: string,
        contractAddress: string,
        price: number
    ) => {
        // const contract = new ethers.Contract(
        //     contractAddress,
        //     NFTCollection.abi,
        //     myProvider
        // );
        // // const tokenId = await contract._tokenIds(); !important
        // // _tokenId() selector  
        // // _tokenId() selector  (0x70a08231)
        const tokenIdHex = await MakeTxCallWithAlchemy(contractAddress, "0x70a08231");
        console.log(tokenIdHex);

        // // const maxSupply = await contract.maxSupply();
        // // const _initialImageURI = await contract._imageURI();
        // // const price_ = await contract.price()

        const nameAdd = Number(String(tokenId)) + 1;

        const metadata = {
            name: `${name} #${nameAdd}`, // next time
            description: 'My unique NFT',
            image: imageURI,
            attributes: [
                {
                    trait_type: 'Background',
                    value: 'Blue',
                },
                {
                    trait_type: 'Body',
                    value: 'Robot',
                },
                {
                    trait_type: 'Eyes',
                    value: 'Red',
                },
                {
                    trait_type: 'Mouth',
                    value: 'Smile',
                },
                {
                    trait_type: 'Hat',
                    value: 'Cap',
                },
            ],
            external_url: 'https://my-nft-project.com/nft/12345',
            animation_url: 'ipfs://QmExampleHash67890/animation.mp4',
        };
        const tokenURI = await getTokenURI(metadata);
        console.log(tokenURI);

        const mintNFTcontract = new ethers.Contract(
            contractAddress,
            NFTCollection.abi,
            mySigner
        );

        const tx = await mintNFTcontract.mintNFT(
            // 'https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreid4xdpjo2bmjiurykquhsnni5yaf44jwbkslpin6yv5eeig45wcii'

            // 'ipfs://bafkreid4xdpjo2bmjiurykquhsnni5yaf44jwbkslpin6yv5eeig45wcii',
            tokenURI,

            {
                value: BigInt(price),
            }
        );
        const response = await tx.wait();
        console.log(response);

        const contract_ = new ethers.Contract(
            contractAddress,
            NFTCollection.abi,
            myProvider
        );
        const newTokenId = (await contract_._tokenIds()).toString();
        const _imageURI = await contract_._imageURI();
        const srcImage = imageURIToSrc(_imageURI);
        console.log(String(newTokenId));
        console.log({
            newTokenId,
            srcImage,
        });
        return {
            newTokenId,
            srcImage,
        };

    };

    const mintNFT = async (
        imageURI: string,
        name: string,
        contractAddress: string,
        price: number
    ) => {
        // try {
        //     await toast.promise(handleMintNFT(imageURI, name, contractAddress, price), {
        //         pending: "Minting NFT...",
        //         success: <div className='bg-[#000000] text-white'>NFT minted successfully</div>,
        //         error: "Something went wrong. Try again.",
        //     });

        // } catch (e: any) {
        //     console.log({ e });
        //     toast.error(e?.message || "Something went wrong. Try again.");
        // } finally {
        //     //display a notification with the image

        // }
        // Try this

        // First, show the pending message

        // const nameAdd = Number(String(tokenId)) + 1;

        // const metadata = {
        //     name: `${name} #${nameAdd}`,

        const toastId = toast.loading('Minting NFT...');

        try {
            const { newTokenId, srcImage } = await handleMintNFT(
                imageURI,
                name,
                contractAddress,
                price
            );
            
            // After the minting is successful, update the toast to show the success message
            toast.update(toastId, {
                render: (
                    <div className="text-[#000000] bg-white p-4">
                        {srcImage && (
                            <div className='flex flex-col justify-center items-center'>
                                <h1 className='my-4'>NFT minted successfully...</h1>
                                
                                    <Image
                                        src={srcImage}
                                        alt="loading image"
                                        width={150}
                                        height={150}
                                        className="rounded-lg"
                                    />
                             

                                <div className="my-4 text-center">
                                    {name} #{newTokenId}
                                </div>
                            </div>
                        )}
                    </div>
                ),
                type: 'success',
                isLoading: false,
                autoClose: 5000, // Close after 5 seconds
            });
        } catch (error) {
            // In case of an error, update the toast to show an error message
            toast.update(toastId, {
                render: 'Something went wrong. Try again.',
                type: 'error',
                isLoading: false,
                autoClose: 5000, // Close after 5 seconds
            });
        }
    };

    // const setVisibility = (val: boolean) => {
    //     setIsVisible(val) // false
    // }

    useEffect(() => {
        if (loading === false) {
            // console.log(chainId);
            // console.log("LFG");
            dispatch(
                fetchNfts('https://hey-minter-api.vercel.app/api/v1/nfts?chainId=534351')
            );
        }
    });

    return (
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8 bg-[#ffffff] text-[#000000] rounded-2xl mt-10 min-h-screen overflow-x-scroll">
            <table className="shadow-2xl font-lato border-2 border-black-400 w-full">
                {/* add overflow-hidden later */}
                <thead>
                    <tr>
                        <th className="py-3 bg-gray-800 text-[#ffffff]">N</th>
                        <th className="py-3 bg-gray-800 text-[#ffffff]">
                            Image
                        </th>
                        <th className="py-3 bg-gray-800 text-[#ffffff]">
                            Name
                        </th>
                        <th className="py-3 bg-gray-800 text-[#ffffff]">
                            Address (CA)
                        </th>
                        <th className="py-3 bg-gray-800 text-[#ffffff]">
                            Price (ETH)
                        </th>
                        <th className="py-3 bg-gray-800 text-[#ffffff]">
                            Total Supply
                        </th>
                        <th className="py-3 bg-gray-800 text-[#ffffff]">
                            Mint
                        </th>
                    </tr>
                </thead>
                <tbody className="text-gray-800 text-center">
                    {items &&
                        items.map((el, index) => (
                            <tr
                                key={`${index}l`}
                                className="bg-[#ffffff] text-center"
                            >
                                <td className="py-6 px-6">{index}</td>
                                <td className="py-6 px-6">
                                    <img
                                        src={`${imageURIToSrc(el.imageURI)}`}
                                        className="w-20 rounded-lg"
                                    />
                                </td>
                                <td className="py-6 px-6">{el.name}</td>
                                <td className="py-6 px-6">
                                    {truncateAddress(el.contractAddress)}
                                </td>
                                <td className="py-6 px-6 text-[20px]">
                                    {Number(weiToEther(String(el.price)))}
                                </td>
                                <td className="py-6 px-6">{el.maxSupply}</td>
                                <td className="py-6 px-6">
                                    <button
                                        className="bg-gray-800 text-[#ffffff] py-1 px-4"
                                        onClick={() =>
                                            mintNFT(
                                                el.imageURI,
                                                el.name,
                                                el.contractAddress,
                                                el.price
                                            )
                                        }
                                    >
                                        Mint
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* <MintSuccessNotification isVisible={isVisible} setVisibility={setVisibility} /> */}


            {/* <button className='p-4 text-white bg-black' onClick={mintNFT}>mint nft</button> */}
        </div>
    );
};

export default CollectionList;
