// utils/FetchNFT.js

// ========= ENV KEYS =========
// ETH key is REQUIRED (we fall back to your older var names if needed)
const ETH_KEY =
  process.env.NEXT_PUBLIC_ALCHEMY_ETH_API_KEY ||
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || // legacy
  process.env.API_KEY;                       // very old fallback

// POLYGON key is OPTIONAL.
// Can be either an Alchemy key (e.g. "abc123") or a full URL (e.g. QuickNode).
const POLY_KEY = process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_API_KEY || "";

// Helpers
const isUrl = (v = "") => /^https?:\/\//i.test(v);
const isAlchemyUrl = (v = "") => /g\.alchemy\.com\/v2\//i.test(v);
const requestOptions = { method: "GET" };

// ========= POLYGON ALLOW LIST (lowercase) =========
const allowedPolygonContracts = [
  "0x67f4732266c7300cca593c814d46bee72e40659f", // ZED RUN
  "0xa9a6a3626993d487d2dbda3173cf58ca1a9d9e9f", // Unstoppable Domains
  "0xb77030a7e47a5eb942a4748000125e70be598632", // Unlock Membership
  "0x59b25ab069a9134463d588ee40f803665d0cf4b0", // Reignmakers (DraftKings)
  "0x22dd2d9e9a4279834c928e2e71c68a17d1d09f12"  // Pablo Stanley
].map(a => a.toLowerCase());

// ========= BASE URL BUILDER =========
// Returns a base URL string like ".../getNFTs/" or null if that chain should be skipped.
// Throws if ETH key missing (since ETH is required).
const getBaseURL = (network, method) => {
  const key = network === "polygon" ? POLY_KEY : ETH_KEY;

  if (!key) {
    if (network === "polygon") {
      if (typeof window !== "undefined") {
        console.warn("⚠️ Polygon key missing; skipping polygon fetches.");
      }
      return null; // skip polygon gracefully
    }
    throw new Error(
      "Missing Ethereum Alchemy API key. Set NEXT_PUBLIC_ALCHEMY_ETH_API_KEY (or NEXT_PUBLIC_ALCHEMY_API_KEY / API_KEY)."
    );
  }

  // If it's already a URL, only proceed if it's an Alchemy NFT API URL.
  // (QuickNode RPC URLs WON'T work with Alchemy's /getNFTs endpoints.)
  if (isUrl(key)) {
    if (!isAlchemyUrl(key)) {
      if (typeof window !== "undefined") {
        console.warn(
          `⚠️ ${network} key is a full URL that is NOT an Alchemy NFT API endpoint. ` +
          `Skipping ${network} fetches. (Got: ${key})`
        );
      }
      return null;
    }
    // It's an Alchemy NFT API URL already
    const trimmed = key.replace(/\/+$/g, "");
    return `${trimmed}/${method}/`;
  }

  // Key is a raw Alchemy key string
  const host =
    network === "polygon"
      ? `https://polygon-mainnet.g.alchemy.com/v2/${key}`
      : `https://eth-mainnet.g.alchemy.com/v2/${key}`;
  return `${host}/${method}/`;
};

// ========= HELPERS =========
const tag = (arr, chain) => (arr || []).map(n => ({ ...n, _chain: chain }));

const debugReignmakers = (nfts) => {
  nfts.forEach(nft => {
    if (nft.contract?.address?.toLowerCase() === "0x59b25ab069a9134463d588ee40f803665d0cf4b0") {
      console.log("🟣 Reignmakers NFT:", nft.title || nft.metadata?.name || nft.rawMetadata?.name);
      console.log("media.gateway:", nft.media?.[0]?.gateway);
      console.log("media.thumbnail:", nft.media?.[0]?.thumbnail);
      console.log("metadata.image:", nft.metadata?.image);
      console.log("metadata.image_url:", nft.metadata?.image_url);
      console.log("rawMetadata.image:", nft.rawMetadata?.image);
    }
  });
};

// ========= FETCH BY WALLET =========
export const fetchNFTs = async (wallet, collection = "", network = "ethereum") => {
  console.log(`Fetching NFTs on ${network}...`);
  const baseURL = getBaseURL(network, "getNFTs");
  if (!baseURL) return []; // chain disabled (e.g., polygon with non-Alchemy URL)

  try {
    let json;
    if (!collection.length) {
      const url = `${baseURL}?owner=${wallet}&withMetadata=true`;
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw new Error(`Alchemy ${network} getNFTs: ${res.status}`);
      json = await res.json();

      if (network === "polygon" && json?.ownedNfts) {
        json.ownedNfts = json.ownedNfts.filter(nft =>
          allowedPolygonContracts.includes(nft.contract?.address?.toLowerCase?.())
        );
      }
    } else {
      const url = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}&withMetadata=true`;
      const res = await fetch(url, requestOptions);
      if (!res.ok) throw new Error(`Alchemy ${network} getNFTs: ${res.status}`);
      json = await res.json();
    }

    const tagged = tag(json?.ownedNfts || [], network);
    if (network === "polygon") debugReignmakers(tagged);
    return tagged;
  } catch (err) {
    console.error(`[fetchNFTs ${network}]`, err);
    return [];
  }
};

// ========= FETCH BY COLLECTION =========
export const fetchNFTsForCollection = async (collection, network = "ethereum") => {
  if (!collection?.length) return [];

  const baseURL = getBaseURL(network, "getNFTsForCollection");
  if (!baseURL) return []; // chain disabled

  try {
    const url = `${baseURL}?contractAddress=${collection}&withMetadata=true`;
    const res = await fetch(url, requestOptions);
    if (!res.ok) throw new Error(`Alchemy ${network} getNFTsForCollection: ${res.status}`);
    const json = await res.json();

    const tagged = tag(json?.nfts || [], network);
    if (network === "polygon") debugReignmakers(tagged);
    return tagged;
  } catch (err) {
    console.error(`[fetchNFTsForCollection ${network}]`, err);
    return [];
  }
};

// ========= FETCH BOTH NETWORKS (polygon optional) =========
export const fetchAllNetworksNFTs = async (wallet, collection = "") => {
  const ethNFTs = await fetchNFTs(wallet, collection, "ethereum");
  const polyNFTs = await fetchNFTs(wallet, collection, "polygon"); // returns [] if polygon disabled
  return [...ethNFTs, ...polyNFTs];
};

// ========= SAMPLE INITIAL ETH FETCH =========
export const initialFetch = async () => {
  const baseURL = getBaseURL("ethereum", "getNFTsForCollection");
  const url = `${baseURL}?contractAddress=0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D&withMetadata=true`;
  const res = await fetch(url, requestOptions);
  if (!res.ok) return [];
  const json = await res.json();
  return tag(json?.nfts || [], "ethereum");
};
