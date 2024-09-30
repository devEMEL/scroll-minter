import { ethers, parseEther, parseUnits, toNumber } from 'ethers';
import Blockies from 'react-blockies';

import { FileObject, PinataSDK } from 'pinata';
import { Network, Alchemy } from 'alchemy-sdk';

export const SCROLL_SEPOLIA_CA = '0x97a66F607166CdEc36cfe29407320b631765596b';

   // Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.SCROLL_SEPOLIA, // Replace with your network.
};
const alchemy = new Alchemy(settings);


const IMAGE_SAMPLE =
    'https://maroon-major-crawdad-175.mypinata.cloud/ipfs/bafkreiaiqqqnwyvi5gksqfwsqihdt7izf5fklnbehal7elyusducquwq6i';

const pinata = new PinataSDK({
    pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
    pinataGateway: 'maroon-major-crawdad-175.mypinata.cloud',
});

export const identiconTemplate = (address: string) => {
    return (
        <Blockies
            size={14} // number of pixels square
            scale={4} // width/height of each 'pixel'
            className="identicon border-2 border-white rounded-full" // optional className
            seed={address} // seed used to generate icon data, default: random
        />
    );
};

export const truncateAddress = (
    address: string,
    startLength = 6,
    endLength = 4
) => {
    if (!address) return '';
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};

export const imageURIToSrc = (imageURI: string) => {
    let imageSrc;
    if (imageURI.includes('//')) {
        imageSrc = `https://maroon-major-crawdad-175.mypinata.cloud/ipfs/${imageURI.split('//')[1]}`;
    } else {
        imageSrc = IMAGE_SAMPLE;
    }

    return imageSrc;
};

export const etherToWei = (amountInEther: string) => {
    return ethers.parseEther(amountInEther);
};

export const weiToEther = (amountInWei: string) => {
    return ethers.formatEther(amountInWei);
};

export const getImageURI = async (imageFile: FileObject) => {
    const upload = await pinata.upload.file(imageFile);
    console.log(`ipfs://${upload.IpfsHash}`);
    return `ipfs://${upload.IpfsHash}`;
};

export const getTokenURI = async (metadata: object) => {
    const upload = await pinata.upload.json(metadata);
    console.log(`ipfs://${upload.IpfsHash}`);
    return `ipfs://${upload.IpfsHash}`;
};

    // Define function that handles the creation of a product through the marketplace contract
export const MakeTxCallWithAlchemy = async(to: string, data: any) => {
    console.log("testing alchemy");
    const tx = {
        to,
        data
    };
    const response = alchemy.core.call(tx);
    console.log(response);
    return response;

}

export const MakeTxSendWithAlchemy = async(to:`0x${string}`| undefined , data:string, address:`0x${string}`| undefined, chainId: number, signer: any, value?: any) => {
    console.log("testing alchemy");

    let tx = {
        to,
        value: value ? parseEther(value.toString()) : toNumber(0),
        gasLimit: toNumber("21000"),
        maxPriorityFeePerGas: parseUnits("5", "gwei"),
        maxFeePerGas: parseUnits("20", "gwei"),
        nonce: await alchemy.core.getTransactionCount(
            address as string,
            "latest"
          ),
        type: 2,
        chainId,
    };

    const txResponse = await signer.sendTransaction(tx);
    console.log('Transaction Response:', txResponse);
    return txResponse;

}

// const hexString = await response;
// const address = "0x" + hexString.slice(-40);
// console.log(address);

