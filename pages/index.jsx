import { useState, useEffect } from 'react'
import NFTCard from '../components/NFTCard'

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
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <div className='flex justify-center items-center w-full'>
          <div className="flex flex-col w-full justify-center items-center px-auto">
            <p className='text-[#FEDA04] pb-2'>Wallet address</p>
            <input 
              disabled={fetchForCollection} 
              className='w-4/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:text-gray-50' 
              onChange={(e)=>{setWalletAddress(e.target.value)}} 
              value={wallet} 
              type={"text"} 
              placeholder="Add your wallet address"></input>
          </div>
          <div className="flex flex-col w-full justify-center items-center px-auto">
            <p className='text-[#FEDA04] pb-2'>Collection address</p>
            <input 
              className='w-4/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:text-gray-50' 
              onChange={(e)=>{setCollectionAddress(e.target.value)}} 
              value={collection} 
              type={"text"} 
              placeholder="Add the collection address"></input>
          </div>
        </div>
      
        <label className="text-white pt-4 flex items-center">
          <input className="mr-2 w-4 h-4 text-[#FEDA04] bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2" onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"}/>Fetch for collection
        </label>
        <button className={"disabled:opacity-50 font-bold text-black bg-[#FEDA04] px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
          () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            } else {
              fetchNFTs()
            }
          }
        }>Let's go! </button>
      </div>
      <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
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


