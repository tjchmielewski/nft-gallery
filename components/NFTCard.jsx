import { useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'

const NFTCard = ({ nft }) => {

    const [copied, setCopied] = useState(false);

    const image = nft.media[0].gateway;

    const placeholderImage = './no-image-icon.png';

    const onImageError = (e) => {
        e.target.src = placeholderImage
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(nft.contract.address).then(
          () => {
            setCopied(true);
            // changing back to default state after 2 seconds.
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          },
          (err) => {
            console.log("failed to copy", err.message);
          }
      );
      };

    return (
        <div className="flex flex-col bg-[#222528] border-transparent rounded-t-3xl border-4 hover:border-[#FEDA04] transform transition duration-700 ease-out ">
            <div className="">
                <img className="object-contain h-128 w-full" src={image ? image : placeholderImage} alt="cover image"
                onError={onImageError}></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3">
                <div className="">
                    <h2 className="text-xl font-bold text-white">{ nft.title ? nft.title : `#${nft.id.tokenId.substr(nft.id.tokenId.length - 4)}`}</h2>
                    <p className="text-[#FEDA04] font-medium">Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}</p>
                    <div className="flex items-center">
                        <p className="text-[#A7A8A9]" >{`
                            Collection: 
                            ${nft.contract.address.substr(0,4)}...${nft.contract.address.substr(nft.contract.address.length - 4)}
                        `}</p>
                        <button 
                            className={`relative flex items-center justify-center text-white ml-2 
                                hover:rounded-md focus:rounded-md h-8 w-8 bg-transparent 
                                ${ copied ? 'hover:border-green-500' : 'hover:border-[#A7A8A9]'} hover:border-2  
                                ${ copied ? 'focus:ring-green-500' : 'focus:ring-[#A7A8A9]'} focus:ring-2`} 
                            onClick={() => copyToClipboard()}>
                                {
                                    copied ? <BsCheck size={'1.5rem'} className='text-green-500'/> : <BiCopy size={'1.5rem'} className='text-[#A7A8A9]'/>
                                }  
                                
                        </button>
                        {
                            copied ? 
                            <>
                                <span className='text-[#A7A8A9] font-semibold ml-4'>Copied</span>
                            </> : ''
                        } 
                    </div>
                </div>

                <div className="flex-grow mt-2">
                    <p className="text-[#7A7C7E] line-clamp-2">{nft.description}</p>
                </div>
            </div>
            <div className="flex justify-center mt-auto mb-4 pt-4">
                <a className="py-2 bg-[#fde03d] font-semibold w-1/2 text-center rounded-md text-gray-900 cursor-pointer hover:scale-105 transform transition duration-300 ease-out" target='_blank' href={`https://etherscan.io/token/${nft.contract.address}`}>View on etherscan</a>
            </div>
        </div>
    )
}

export default NFTCard