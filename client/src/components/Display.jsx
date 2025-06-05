import { useState } from "react";

const Display = ({con,acc})=>{
    const [data,setData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const contract = con.state.contract;
    
    const getData = async () => {
        setIsLoading(true);
        let dataArray;
        const Otheraddress = document.querySelector(".address-input").value;
        
        try {
            if (Otheraddress) {
                console.log(Otheraddress);
                dataArray = await contract.display(Otheraddress);
            } else {
                dataArray = await contract.display(acc);
            }
        } catch (e) {
            alert("You don't have access");
            setIsLoading(false);
            return;
        }
        
        const isEmpty = Object.keys(dataArray).length === 0;

        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            
            const images = str_array.map((item,i)=>{
                return(
                    <a href={item} key={i} target="_blank" rel="noopener noreferrer" className="image-card">
                        <img src={item} alt={`Shared image ${i + 1}`} />
                    </a>
                )
            });
            setData(images);
        } else {
            alert("No image to display");
        }
        setIsLoading(false);
    };
    
    return(
        <div className="display-section">
            <div className="display-controls">
                <input 
                    type="text" 
                    className="address-input"
                    placeholder="Enter wallet address (leave empty for your images)"
                />
                <button 
                    onClick={getData} 
                    disabled={isLoading}
                    className="btn btn-primary"
                >
                    {isLoading ? (
                        <>
                            <span className="loading"></span>
                            Loading...
                        </>
                    ) : (
                        "Get Images"
                    )}
                </button>
            </div>
            
            <div className="image-gallery">
                {data}
            </div>
        </div>
    )
}

export default Display;