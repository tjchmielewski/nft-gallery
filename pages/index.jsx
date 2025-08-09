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
    <header className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-6 py-4 bg-black text-white">
      <div className="flex items-center space-x-1">
        <img src="/logo.svg" alt="tj34 logo" className="h-8 w-auto" />
        <span className="text-xl sm:text-2xl font-bold text-white">.x</span>
      </div>
    </header>

    <main className="pt-16">
      <section className="py-1">
    <div className="w-full max-w-7xl mx-auto px-4 text-left">
      <h1 className="text-blue-400 font-inter text-6xl sm:text-7xl font-black leading-tight">
        SELECT DROPS
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full px-4 max-w-7xl mx-auto mb-16">


      {Array.isArray(NFTs) && NFTs.map((nft, idx) => (
  <NFTCard key={idx} nft={nft} />
))}
    </div>
    </main>
  </div>
  
)

}

export default Home


