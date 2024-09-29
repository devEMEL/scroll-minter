// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    string public _imageURI;
    uint256 public price = 0;
    uint256 public maxSupply = 0;
    uint256 public _tokenIds;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _price,
        uint256 _maxSupply,
        string memory _initialImageURI,
        address owner
    ) 
    ERC721(_name, _symbol)
    Ownable(owner) {
        price = _price;
        maxSupply = _maxSupply;
        _imageURI = _initialImageURI;
    }

    function mintNFT(string memory _tokenURI) public payable {
        require(_tokenIds <= maxSupply, "Not enough NFTs left");
        require(msg.value >= price, "Insufficient Ether sent");
        uint256 newItemId = _tokenIds++;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
    }

    function getAllNTFs(address owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }

    function updatePrice(uint256 _newPrice) external onlyOwner{
        price = _newPrice;
    }

    function updateSupply(uint256 _newSupply) external onlyOwner{
        maxSupply = _newSupply;
    }

    function updateTokenURI(string memory _newImageURI) external onlyOwner{
        _imageURI = _newImageURI;
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }




}