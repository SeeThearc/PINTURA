import { useEffect } from "react";

const Modal = ({setOpenModal,contract,acc})=>{

    useEffect(()=>{
        const accessList = async()=>{
            const addressList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = addressList;
            for(let i=0;i<options.length;i++){
                let opt = options[i];
                let e1 = document.createElement("option");
                e1.textContent = opt[0];
                e1.value=opt[0];
                select.appendChild(e1);
            }
        };
        contract && accessList();
    },[])

    const sharing = async() =>{
        const address = document.querySelector(".address-input").value;
        await contract.allow(address);
        console.log("access given");
        setOpenModal(false);
    }

    const revoke = async() =>{
        const selectElement = document.querySelector("#selectNumber");
        const selectedAddress = selectElement.value;
        
        if(selectedAddress && selectedAddress !== ""){
            await contract.disallow(selectedAddress);
            console.log("disallowed:", selectedAddress);
            
            const selectedOption = selectElement.querySelector(`option[value="${selectedAddress}"]`);
            if(selectedOption){
                selectedOption.remove();
            }

            selectElement.value = "";
        } else {
            console.log("Please select an address to revoke");
        }
    }

    return(
        <div className="modal">
            <h3 className="modal-title">Manage Access Permissions</h3>
            
            <div className="modal-section">
                <h4>Grant Access</h4>
                <input 
                    type="text" 
                    placeholder="Enter wallet address" 
                    className="address-input"
                />
            </div>
            
            <div className="modal-section">
                <h4>Revoke Access</h4>
                <select id="selectNumber" className="select-box">
                    <option value="">Select address to revoke access</option>
                </select>
            </div>
            
            <div className="modal-actions">
                <button 
                    onClick={()=>setOpenModal(false)} 
                    className="btn btn-secondary"
                >
                    Cancel
                </button>
                <button onClick={sharing} className="btn btn-primary">
                    Grant Access
                </button>
                <button onClick={revoke} className="btn btn-danger">
                    Revoke Access
                </button>
            </div>
        </div>
    )
}

export default Modal;