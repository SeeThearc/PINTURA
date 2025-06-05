import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";
import Display from "./components/Display";
import { DataContext } from "./context/Context";
import { useContext, useState } from "react";

export default function App(){
  const [openModal,setOpenModal] = useState(false);
  const con = useContext(DataContext);
  const contract = con.state.contract;
  const acc=con.acc;
  
  return(
    <div className="app-container">
      <header className="header">
        <h1 className="app-title">PINTURA</h1>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={con.connectWallet}>
            Connect Wallet
          </button>
          {!openModal && (
            <button className="btn btn-secondary" onClick={()=>setOpenModal(true)}>
              Share Access
            </button>
          )}
          {acc && (
            <div className="account-info">
              {acc.slice(0, 6)}...{acc.slice(-4)}
            </div>
          )}
        </div>
      </header>

      {openModal && (
        <div className="modal-overlay">
          <Modal setOpenModal={setOpenModal} contract={contract} acc={acc} />
        </div>
      )}

      <div className="main-content">
        <div className="card upload-card">
          <h2 className="card-title">Upload Image</h2>
          <FileUpload con={con} acc={acc}/>
        </div>

        <div className="card">
          <h2 className="card-title">View Images</h2>
          <Display con={con} acc={acc}/>
        </div>
      </div>
    </div>
  )
}
