import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';
import styles from "../styles/NFTCard.module.css";

// --- helpers ---
const normalizeUrl = (u) => {
  if (!u) return '';
  if (u.startsWith('ipfs://')) return `https://ipfs.io/ipfs/${u.slice(7)}`;
  if (u.startsWith('ar://'))   return `https://arweave.net/${u.slice(5)}`;
  return u;
};

const toDecimalTokenId = (tid) => {
  if (!tid) return '';
  const s = String(tid);
  // convert 0x... to decimal; if already decimal, keep as-is
  return s.startsWith('0x') ? BigInt(s).toString(10) : s;
};

const pickMedia = (nft) => {
  const m = nft?.media?.[0] || {};
  const fromMediaGateway = (m.gateway && m.gateway.trim()) || '';
  const fromMediaThumb   = (m.thumbnail && m.thumbnail.trim()) || '';

  // DraftKings/Reignmakers often put the video in metadata.image
  const metaImg =
    nft?.metadata?.image ||
    nft?.metadata?.image_url ||
    nft?.rawMetadata?.image ||
    '';

  const normalizedMeta = normalizeUrl(String(metaImg).trim());
  const isVideo = normalizedMeta.toLowerCase().endsWith('.mp4');

  if (isVideo) {
    return {
      type: 'video',
      src: normalizedMeta,
      poster: fromMediaThumb || fromMediaGateway || ''
    };
  }

  // Otherwise prefer media.gateway, then normalized metadata image
  const imgSrc = fromMediaGateway || normalizedMeta;
  return { type: 'image', src: imgSrc };
};

const shortToken = (hex) => {
  if (!hex) return '';
  const s = String(hex);
  return s.slice(s.length - 4);
};

// --- component ---
const NFTCard = ({ nft }) => {
  const [copied, setCopied] = useState(false);

  const placeholderImage = '/no-image-icon.png'; // ensure this exists in /public
  const media = pickMedia(nft);

  const onMediaError = (e) => {
    if (e?.currentTarget?.tagName === 'VIDEO') {
      e.currentTarget.outerHTML = `<img src="${placeholderImage}" alt="fallback" />`;
    } else {
      e.currentTarget.src = placeholderImage;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(nft.contract.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const idShort = shortToken(nft?.id?.tokenId);
  const title = nft?.title || `#${idShort}`;
  const addr = nft?.contract?.address || '';
  const chain = nft?._chain === 'polygon' ? 'polygon' : 'ethereum';

  // Scanners
  const scanHost = chain === 'polygon' ? 'https://polygonscan.com' : 'https://etherscan.io';
  const scanUrl  = `${scanHost}/token/${addr}`;

  // OpenSea (expects decimal token ID)
  const openseaChain = chain === 'polygon' ? 'matic' : 'ethereum';
  const tokenIdDec = toDecimalTokenId(nft?.id?.tokenId || '');
  const openseaUrl = `https://opensea.io/assets/${openseaChain}/${addr}/${tokenIdDec}`;

  const collectionShort = `${addr.slice(0,4)}...${addr.slice(-4)}`;

  const rawDesc =
    nft?.description ??
    nft?.metadata?.description ??
    nft?.rawMetadata?.description ??
    '';
  const description = typeof rawDesc === 'string' ? rawDesc : '';

  return (
    <div className={`${styles.flexCol} ${styles.nft_container}`}>
      <div className={styles.mediaBox}>
        {media.type === 'video' ? (
          <video
            src={media.src}
            poster={media.poster || placeholderImage}
            muted
            loop
            playsInline
            autoPlay
            controls={false}
            onError={onMediaError}
            className={styles.media}
          />
        ) : (
          <img
            src={media.src || placeholderImage}
            alt={title}
            onError={onMediaError}
            className={styles.media}
          />
        )}
      </div>

      <div className={`${styles.flexCol} ${styles.nft_textContainer}`}>
        <div>
          <h2>{title}</h2>
          {idShort && <p>Id: {idShort}</p>}
          <div>
            <p>{`Collection: ${collectionShort}`}</p>
            <button
              className={`${styles.nft_button} ${copied ? styles.nft_button_copied : styles.nft_button_not_copied}`}
              onClick={copyToClipboard}
              aria-label="Copy contract address"
            >
              {copied ? <BsCheck size="1.5rem" className={styles.text_green}/> : <BiCopy size="1.5rem" className={styles.text_gray}/>}
            </button>
            {copied && <span>Copied</span>}
          </div>
        </div>

        <div className={styles.nft_textDescription}>
          <p>{description}</p>
        </div>
      </div>

      <div
        className={styles.nft_link}
        style={{ paddingLeft: '1rem', paddingRight: '1rem', gap: '0.5rem', flexDirection: 'column' }}
      >
        {/* Outline buttons that fill width */}
        <a
          className="w-full text-center font-semibold border border-gray-400 rounded-md py-2 hover:scale-[1.02] transition"
          target="_blank"
          rel="noopener noreferrer"
          href={openseaUrl}
          style={{ color: 'white' }}
        >
          View on OpenSea
        </a>
        <a
          className="w-full text-center font-semibold border border-gray-400 rounded-md py-2 hover:scale-[1.02] transition"
          target="_blank"
          rel="noopener noreferrer"
          href={scanUrl}
          style={{ color: 'white' }}
        >
          {chain === 'polygon' ? 'View on Polygonscan' : 'View on Etherscan'}
        </a>
      </div>
    </div>
  );
};

export default NFTCard;
