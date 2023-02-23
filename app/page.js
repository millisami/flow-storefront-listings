"use client";
import "../flow/config"
import * as fcl from "@onflow/fcl"
import { useEffect, useState } from "react"
import Link from "next/link";

// Events are identified using a specific syntax defined by Flow
// A.{contractAddress}.{contractName}.{eventName}
// 
// The following two constants are the event identifiers (event keys as Flow calls them)
// for the `ListingAvailable` and `ListingCompleted` events
// for NFTStorefront V1 on Flow Mainnet
const ListingAvailableEventKey =
  "A.4eb8a10cb9f87357.NFTStorefront.ListingAvailable";
const ListingCompletedEventKey =
  "A.4eb8a10cb9f87357.NFTStorefront.ListingCompleted";

export default function Home() {
  const [availableEvents, setAvailableEvents] = useState([])
  const [completedEvents, setCompletedEvents] = useState([])

  // when the page is first loaded, subscribe/listen for new events
  useEffect(() => {
    // Listen for ListingAvailable events
    // Add new events on top, and old events in bottom
    fcl.events(ListingAvailableEventKey).subscribe(events => {
      setAvailableEvents(oldEvents => [events, ...oldEvents])
    })

    // Listen of completed events
    fcl.events(ListingCompletedEventKey).subscribe(events => {
      setCompletedEvents(oldEvents => [events, ...oldEvents])
    })
  
  }, [])
  
  return (
    <>
      <p>This is a sample project done at <a href="https://learnweb3.io/" _target="blank" rel="noreferrer">LearnWeb3</a> that shows and refreshes the Listings every 2 seconds, based upon 
        general purpose <a href="https://github.com/onflow/nft-storefront" _target="blank" rel="noreferrer">Cadence NFT Storefront Contract</a> for trading NFTs on <a href="https://flow.com/" target="_blank" rel="noreferrer">Flow</a> blockchain.
      </p>
    <div className="grid">
      <div>
        <h3>Available Listing</h3>
        {availableEvents.length === 0 
          ? <p>No Listings Available</p>
          : availableEvents.map((ae, idx) => (
            <div key={idx}>
              <p>
                Storefront: {ae.storefrontAddress}<br/>
                Listing Resource ID: {ae.listingResourceID}<br/>
                NFT Type ID: {ae.nftType.typeID}<br/>
                NFT ID: {ae.nftID}<br/>
                Token Type: {ae.ftVaultType.typeID}<br/>
                Price: {ae.price}
              </p>
              <hr/>
            </div>
          ))
        }
      </div>

      <div>
        <h3>Completed Listing</h3>
        {completedEvents.length === 0
          ? <p>No Completed Listings Available</p>
          : completedEvents.map((ce, idx) => (
            <div key={idx}>
              <p>
                Storefront Resource ID: {ce.storefrontResourceID}<br/>
                Listing Resource ID: {ce.listingResourceID}<br/>
                NFT Type ID: {ce.nftType.typeID}<br/>
                NFT ID: {ce.nftID}
              </p>
              <hr/>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )















  // <Image
  //   className={styles.logo}
  //   src="/next.svg"
  //   alt="Next.js Logo"
  //   width={180}
  //   height={37}
  //   priority
  // />

}
