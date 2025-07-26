
import { ethers } from "ethers";
const _contractAddress = '0xB95cF47AfEa666DD6E7967927A338954FbB16FD7'; // Replace with your contract address   
const _contractABI = require('../app/assets/contract-abi.json'); // Import your contract ABI from a JSON file
export async function Connect() {
    if (typeof window.ethereum !== 'undefined') {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    console.log('MetaMask is Connected');
    return signer;
} else {
    console.log('MetaMask is not installed');
    return null;
}
}
export async function Execute(title, unlockTimeStamp, currentTimeStamp, message, user, signer) {
    const contractAddress = _contractAddress;
    const contractABI = _contractABI;
    
    console.log('Executing smart contract with ABI:', contractABI);
    const resolvedSigner = await signer;
    const contract = new ethers.Contract(contractAddress, contractABI, resolvedSigner);

    try {
        const username = 'Anonymous';
        console.log('Username:', username);
        console.log('Message:', message);   

        const fundTx = await contract.store(title, unlockTimeStamp, currentTimeStamp, message, user);
        await fundTx.wait();
        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

export async function Recieve(user, signer) {
    const contractAddress = _contractAddress; 

    const contractABI = _contractABI;
    // Use provider for read-only operations
    let provider;
    if (signer && signer.provider) {
        provider = signer.provider;
    } else if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new Error('No provider available');
    }
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {

        const result = await contract.retrieve(user);
        console.log('Retrieved value:', result);

        return result;
    } catch (error) {
        console.error('Transaction failed:', error);
        return null;
    }
}
export async function checkUnlockableCapsules(user, signer) {
    const contractAddress = _contractAddress; 

    const contractABI = _contractABI;
    // Use provider for read-only operations
    const resolvedSigner = await signer;
    const contract = new ethers.Contract(contractAddress, contractABI, resolvedSigner);

    try {

        const result = await contract.checkIfMessageUnlocked(user);
        await result.wait();
        console.log('Transaction successful');
    } catch (error) {
        console.error('Transaction failed:', error);
        return null;
    }
}
export async function GetMessage(messageId, signer) {
  const contractAddress = _contractAddress; 

    const contractABI = _contractABI;
    // Use provider for read-only operations
    let provider;
    if (signer && signer.provider) {
        provider = signer.provider;
    } else if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
    } else {
        throw new Error('No provider available');
    }
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    try {

        const result = await contract.GetMessage(messageId);
        console.log('Retrieved value:', result);

        return result;
    } catch (error) {
        console.error('Transaction failed:', error);
        return null;
    }
}