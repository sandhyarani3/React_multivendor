import react,{useState} from "react";
import {API_PATH} from "../../helpers/APIPath";
const AddProduct=()=>{
    const [productName,setproductName]=useState("");
    const [price,setprice]=useState("");
    const [category,setcategory]=useState([]); 
    const [BestSeller,setBestSeller]=useState(false);
    const [Description,setDescription]=useState("");
    const [image,setimage]=useState(null);

    const HandleCategoryChange=async(e)=>{
      const value=e.target.value;
      if(category.includes(value)){
        setcategory(category.filter((item)=>item!==value))
      }
      else{
        setcategory([...category,value]);
      }
    }
    const HandleBestseller=async(e)=>{
        setBestSeller(e.target.value === "Yes");
    }
    const HandleImage=async(e)=>{
        setimage(e.target.files[0]);

    }

    const HandleSubmit=async(e)=>{
      e.preventDefault();
    try{
    const loginToken=localStorage.getItem("loginToken");
    const firmId=localStorage.getItem("firmId");

    if(!loginToken || !firmId){
        console.log("user not Authenticated");
        alert("Not Authenticated");
        return;
    }
      const formData=new FormData();
      formData.append("productName",productName);
      formData.append("price",price);
      formData.append("Description",Description);
      formData.append("image",image);
      formData.append("BestSeller",BestSeller)
      category.forEach((value)=>{
        formData.append("category",value);
      })
     
      const response=await fetch(`${API_PATH}/product/add-product/${firmId}`,{
        method:"POST",
        body:formData
      })
      const data=await response.json();
      if(response.ok){
        console.log(data);
        alert("product added successfully");
        setproductName("");
        setprice("");
        setcategory("");
        setBestSeller(false);
        setDescription("");
        setimage(null);

      }
    }
catch(error){
   console.log(error);
   alert("failed to add");
}
    }
    return(
        <div className="productSection">
            <form className="productForm" onSubmit={HandleSubmit}>
            <h3>Add Product</h3>
            <label>Product Name</label><br/>
            <input type="text" name="productName" value={productName} onChange={(e)=>setproductName(e.target.value)}></input> 
            <label>Price</label><br/>
            <input type="text" name="price" value={price} onChange={(e)=>setprice(e.target.value)}></input><br/>
            {/* <label>Category</label>
            <input type="text"></input> */}
            <div className="check-inp">
                <label>Category</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label>Veg</label>
                    <input type="checkbox" value="veg" checked={category.includes("veg")} onChange={HandleCategoryChange}></input>
                </div>
                <div className="checkboxContainer">
                    <label>Non-veg</label>
                    <input type="checkbox" value="Non-veg" checked={category.includes("Non-veg")} onChange={HandleCategoryChange}></input>
                </div>
                </div>
            </div>

            
            <div className="check-inp">
                <label>Bestseller</label>
                <div className="inputsContainer">
                <div className="checkboxContainer">
                    <label>Yes</label>
                    <input type="radio" name="bestseller"  value="Yes" checked={BestSeller===true} onChange={HandleBestseller}></input>
                </div>
                <div className="checkboxContainer">
                    <label>No</label>
                    <input type="radio" name="bestseller"  value="No" checked={BestSeller===false} onChange={HandleBestseller}></input>
                </div>
                </div>
            </div>
             
            <label>Product Image</label>
            <input type="file" onChange={HandleImage}></input>

            <label>Description</label>
            <input type="text" name="Description" value={Description} onChange={(e)=>setDescription(e.target.value)}></input><br></br>
             <div className="btnSubmit">
                <button type="submit">Submit</button>
             </div>

         </form>
        </div>
    )
}
export default AddProduct;