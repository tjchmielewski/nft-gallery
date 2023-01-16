import React, {useState} from 'react'
import styles from "../styles/Modal.module.css";
import { useAccount, useConnect } from 'wagmi'
import Image from 'next/image'

function Modal({close}) {
  const { connector: activeConnector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

  const walletIcons = (walletName) => walletName === "MetaMask" ? "/mm.png" : "/cbw.png";

  return (
    <>  
      <div className={styles.modal}
        onClick={() => {
          // close modal when outside of modal is clicked
          close();
        }}>
        <div className={`${styles.flexCol} ${styles.modal_content}`} 
          onClick={e => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}>
          <h1>Select Wallet:</h1>
          {connectors.map((connector) => (
            <button
              className={styles.button_modal}
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => {
                connect({ connector });
                close();
              }}
            >
              <Image className={styles.image_button} height={50} width={50} src={walletIcons(connector.name)} alt={"Wallet"} />
              <p>{connector.name}</p>
              {isLoading &&
                pendingConnector?.id === connector.id &&
                ' (connecting)'}
            </button>
          ))}
          {error && <div>{error.message}</div>}
        </div>
      </div> 
    </>
  )
}

export default Modal