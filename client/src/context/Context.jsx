import { createContext, useState } from "react";
import abi from "../artifacts/drive.json";
import { ethers } from "ethers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [acc, setAcc] = useState("Not connected");

  const connectWallet = async () => {
    try {
      const contractABI = abi.abi;
      const contractAddress = "0xe3dF083F24C1ab893a9A272B087CaC879aCEa28f"; 
      
      if (window.ethereum) {
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        setAcc(account[0]);
        setState({ provider, signer, contract });
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.log(error);
    }
  };
return (
    <DataContext.Provider value={{ 
      state, 
      acc, 
      connectWallet,
    }}>
      {children}
    </DataContext.Provider>
  );
};