import react,{useState} from "react";
import {API_PATH} from "../../helpers/APIPath";
const AddFirm=()=>{

    const [firmName,setFirmname]=useState("");  
    const [area,setArea]=useState("");
    const [category,setCategory]=useState([]);
    const [region,setRegion]=useState([]);
    const [offer,setOffer]=useState("");
    const [image,setImage]=useState(null);

    const HandleCategoryChange=(e)=>{
        const value=e.target.value;
        if(category.includes(value)){
            setCategory(category.filter((item)=>item!==value))}
        else{
            setCategory([...category,value])
        }
    }

    const HandleRegionChange=(e)=>{
        const value=e.target.value;
        if(region.includes(value)){
            setRegion(region.filter((item)=>item!==value))}
        else{
            setRegion([...region,value])
        }
    }
    const HandleImage=(e)=>{
        const image=e.target.files[0];
        setImage(image);
    }
     
    const HandleFormSubmit=async(e)=>{
        e.preventDefault();
        try {
            const loginToken=localStorage.getItem("loginToken");
            if(!loginToken){
                console.log("Authentication failed");
            }
            const formData=new FormData();
            formData.append("firmName",firmName);
            formData.append("area",area);
            category.forEach((value)=>{
                formData.append("category",value)
            });
            region.forEach((value)=>{
                formData.append("region",value)
            })
            formData.append("offer",offer);
            formData.append("image",image);
            const response=await fetch(`${API_PATH}/firm/add-firm`,{
                method:"POST",
                headers:{
                    'token':`${loginToken}`,
                    // "Content-Type":"application/json"
                },
                body:formData
            })
            const data=await response.json()
            if(response.ok){
                console.log(data);
                alert("firm added successfully");
                // setFirmname("");
                // setArea("");
                // setCategory([]);
                //   setImage(null);
                // setRegion([]);
            }
            else if(data.message=="vendor already have one firm"){
                alert("Vendor can have only one firm");
            }
            else{
                alert("failed to add");
            }
            setFirmname("");
                setArea("");
                setCategory([]);
                  setImage(null);
                setRegion([]);
            console.log(data.firmId);
            // const firmId=data.firmId;
            localStorage.setItem("firmId",data.firmId);

        } catch (error) {
            console.log(error);
            alert("failed to add");
        }
    }

    return(
        <div className="firmSection">
         <form className="productForm" onSubmit={HandleFormSubmit}>
            <h3>Add Firm</h3>
            <label>Firm Name</label><br/>
            <input type="text" name="firmname" value={firmName} onChange={(e)=>setFirmname(e.target.value)}></input> 
            <label>Area</label><br/>
            <input type="text" name="firmarea" value={area} onChange={(e)=>setArea(e.target.value)}></input><br/>
            {/* <label>Category</label>
            <input type="text"></input> */}
             <div className="check-inp">
                <label>Category</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label>veg</label>
                    <input type="checkbox" name="veg" value="veg" checked={category.includes("veg")}  onChange={HandleCategoryChange}></input>
                </div>
                <div className="checkboxContainer">
                    <label>Non-veg</label>
                    <input type="checkbox" name="Non-veg" value="Non-veg" checked={category.includes("Non-veg")}  onChange={HandleCategoryChange}></input>
                </div>
                </div>
            </div>

            {/* <label>Region</label>
            <input type="text"></input> */}
             <div className="Region-inp">
                <label>Region</label>
                <div className="RegioninputsContainer">
                <div className="RegioncheckboxContainer">
                    <label>SouthIndian</label>
                    <input type="checkbox" value="southIndian" checked={region.includes("southIndian")}  onChange={HandleRegionChange}></input>
                </div>
                <div className="RegioncheckboxContainer">
                    <label>NorthIndian</label>
                    <input type="checkbox" value="northIndian" checked={region.includes("northIndian")}   onChange={HandleRegionChange}></input>
                </div>
                <div className="RegioncheckboxContainer">
                    <label>Chinese</label>
                    <input type="checkbox" value="chinese" checked={region.includes("chinese")}   onChange={HandleRegionChange}></input>
                </div>
                <div className="RegioncheckboxContainer">
                    <label>Bakery</label>
                    <input type="checkbox" value="bakery" checked={region.includes("bakery")}   onChange={HandleRegionChange}></input>
                </div>
                </div>
            </div>

            
            <label>Offer</label>
            <input type="text" name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)}></input>
            <label>Firm Image</label>
            <input type="file"  onChange={HandleImage}></input><br></br>
             <div className="btnSubmit">
                <button type="submit">Submit</button>
             </div>

         </form>
        </div>
    )
}
export default AddFirm;  