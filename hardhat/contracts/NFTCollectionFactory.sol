// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "./NFTCollection.sol";

contract NFTCollectionFactory is Ownable {
    address[] public allCollections;
    uint256 public nonce = 0;

    event CollectionCreated(address indexed  collectionAddress, string name, string symbol, address owner, uint256 timeCreated, uint256 price, uint256 maxSupply, string imageURI);
    constructor() Ownable(msg.sender) {}
    function createCollection(string memory _name, string memory _symbol, uint256 _price, uint256 _maxSupply, string memory _imageURI) external {

        bytes32 salt = keccak256(abi.encodePacked(msg.sender, nonce));
        nonce++;

        bytes memory bytecode = abi.encodePacked(type(NFTCollection).creationCode, abi.encode(_name, _symbol, _price, _maxSupply, _imageURI, msg.sender));

        address collectionAddress;
        assembly {
            collectionAddress := create2(0, add(bytecode, 32), mload(bytecode), salt)
            if iszero(extcodesize(collectionAddress)) {
                revert(0, 0)
            }
        }
        allCollections.push(address(collectionAddress));
        emit CollectionCreated(address(collectionAddress), _name, _symbol, msg.sender, block.timestamp, _price, _maxSupply, _imageURI);
    }

    function getAllCollections() external view returns (address[] memory) {
        return allCollections;
    }
    
}