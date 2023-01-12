import React, {useState} from 'react'
import styles from "../styles/Fetch.module.css";
import { fetchNFTs, fetchNFTsForCollection } from '../utils/FetchNFT'

function Fetch({setNFTs}) {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [fetchForCollection, setFetchForCollection] = useState(false)

  const handleClick = async () => {
    let nfts;
    if (fetchForCollection) {
      nfts = await fetchNFTsForCollection(collection)
    } else {
      nfts = await fetchNFTs(wallet, collection)
    }
    setNFTs(nfts);
  }

  return (
    <>
      <div className={styles.container}>
          <div className={styles.flex}>
            <div>
              <p>Wallet address</p>
              <input 
                disabled={fetchForCollection} 
                onChange={(e)=>{setWalletAddress(e.target.value)}} 
                value={wallet} 
                type={"text"} 
                placeholder="Add your wallet address"></input>
            </div>
            <div>
              <p>Collection address</p>
              <input
                onChange={(e)=>{setCollectionAddress(e.target.value)}} 
                value={collection} 
                type={"text"} 
                placeholder="Add the collection address"></input>
            </div>
          </div>
        
          <label>
            <input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"}/>Fetch for collection
          </label>
          <button onClick={handleClick}>Let's go!</button>
      </div>
    </>
  )
}

export default Fetch