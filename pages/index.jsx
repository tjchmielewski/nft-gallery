import { useState, useEffect } from 'react'
import Fetch from '../components/Fetch';
import NFTCard from '../components/NFTCard'
import styles from "../styles/index.module.css";
import { initialFetch } from '../utils/FetchNFT'
import FeaturedMoments from '../components/FeaturedMoments';


const Home = () => {
  const [NFTs, setNFTs] = useState([]);
  
  useEffect(() => {
  // Remove default fetch – Fetch.jsx will handle it
}, [])

  

  return (
  <div className={`${styles.flexCol} ${styles.main_container}`}>
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-4xl text-left">
        <h1 className="text-cyan-400 font-inter text-6xl sm:text-7xl font-black leading-tight">
            SELECT DROPS<br />
           <span className="block text-7xl sm:text-8xl">GALLERY</span>
        </h1>
        <p className="mt-6 text-3xl sm:text-2xl text-white/80 font-inter">
            A curated mix of art, sports, and crypto culture
        </p>
         <p className="mt-2 text-med sm:text-med text-white/80 font-inter">
            by T.J. Chmielewski (testing out my web3 gallery skills. I will be adding more features and collectibles soon.)
        </p>
      </div>
    </section>
    <FeaturedMoments />
    <Fetch setNFTs={setNFTs}/>
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


