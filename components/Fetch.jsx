import React, {useState, useEffect} from 'react'
import styles from "../styles/FetchClean.module.css";
import { fetchNFTs, fetchNFTsForCollection } from '../utils/FetchNFT'
import Modal from './Modal';
import { useAccount, useDisconnect } from 'wagmi'

function Fetch({setNFTs}) {
  // Application Hooks
  const [wallet, setWalletAddress] = useState("0x8D3ecF2A22122F4E599b1bA868706dFd8CA62Fe5");
  const [collection, setCollectionAddress] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [isOpen, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);

  // Wagmi Hooks
  const { address } = useAccount();
  const { disconnect } = useDisconnect()

  const handleClick = async () => {
    let nfts;
    if (fetchForCollection) {
      nfts = await fetchNFTsForCollection(collection)
    } else {
      nfts = await fetchNFTs(wallet, collection)
    }
    setNFTs(nfts);
  }

  const disconnectWallet = () => {
    disconnect()
    setWalletAddress('')
  }

  useEffect(() => {
    if(address) {
      setConnected(true);
      setWalletAddress(address);
    } else {
      setConnected(false);
    }
  }, [address])
  useEffect(() => {
  const loadNFTs = async () => {
    const nfts = await fetchNFTs(wallet, collection);
    setNFTs(nfts);
  };

  if (wallet && !fetchForCollection) {
    loadNFTs();
  }
}, [wallet, fetchForCollection]);


  return (
    <>
      <div className={styles.container}>
        <div className={styles.flex}>
          
        </div>
      
        {isOpen && <Modal close={() => {setOpen(false)}} setWalletAddress={setWalletAddress}/>}
      </div>
    </>
  )
}

export default Fetch