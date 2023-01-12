import { useState, useEffect } from 'react'
import NFTCard from '../components/NFTCard'
import styles from "../styles/index.module.css";

const Home = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false)

  const api_key = process.env.API_KEY;
  const requestOptions = {
    method: 'GET'
  };
  
  const fetchNFTs = async() => {
    let nfts; 
    console.log("fetching nfts");
    const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    
    console.log('baseURL', baseURL);
     
    if (!collection.length) {
    
      const fetchURL = `${baseURL}?owner=${wallet}`;
  
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      /**
       * The "5B%5D" string right after the "contractAddresses" parameters specifies 
       * that the "contractAddresses" parameter is an array and not a simple string. 
       * This is because you could actually filter by multiple "contractAddresses", not just one.
       */
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
    }
  
    if (nfts) {
      console.log("nfts:", nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  const fetchNFTsForCollection = async () => {
    if (collection.length) {
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      }
    }
  }

  useEffect(() => {
    (async () => {
      // Collection Bored Ape
      const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
        if (nfts) {
          console.log("NFTs in collection:", nfts)
          setNFTs(nfts.nfts)
        }
    })()
  }, [])
  

  return (
    <div className={`${styles.flexCol} ${styles.main_container}`}>
      <div className={`${styles.flexCol} ${styles.container}`}>
        <div className={`${styles.flex}`}>
          <div className={`${styles.flexCol}`}>
            <p>Wallet address</p>
            <input 
              disabled={fetchForCollection} 
              onChange={(e)=>{setWalletAddress(e.target.value)}} 
              value={wallet} 
              type={"text"} 
              placeholder="Add your wallet address"></input>
          </div>
          <div className={`${styles.flexCol}`}>
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
        <button onClick={
          () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }
        }>Let's go! </button>
      </div>
      <div className={styles.gridContainerNFT}>
        {
          NFTs.length && NFTs.map((nft, idx) => {
            return (
              <NFTCard key={idx} nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home


