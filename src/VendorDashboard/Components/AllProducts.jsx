import React,{useState,useEffect} from 'react'
import { API_PATH } from '../helpers/APIPath';
const AllProducts = () => {
    const [products,setproducts]=useState([]);
    const productHandler=async()=>{
        const firmId=localStorage.getItem("firmId");
        try{
        const response=await fetch(`${API_PATH}/product/${firmId}/products`);
        const productsdata=await response.json();
        setproducts(productsdata.products)
        console.log(productsdata.products);
        }
        catch(error){
           alert("failed to fetch");
           console.log(error);  
        }
    }

    const HandleDelete=async(productId)=>{
        try {
            const response=await fetch(`${API_PATH}/product/${productId}`,{
                method:"DELETE"

            })
            setproducts(products.filter(item=>item._id!==productId));
            confirm("Are you sure..want to delete?");
            alert("product deleted successfully")
        } catch (error) {
            console.log(error);
            alert("failed to delete product");
        }
    }

    useEffect(()=>{
        productHandler();
        console.log("useEffect function");
    },[])
  return (
    <div>
      {!products? (
        <p>NO PRODUCTS AVAILABLE</p>
      ):(
        <table className='products-table'>
        <thead>
            <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Delete</th>
            </tr> 
        </thead>
        <tbody>
    {products.map((item) => (
        <tr key={item._id}>
            <td>{item.productName}</td>
            <td>{item.price}</td>
            <td>
                {item.image && (
                    <img 
                        src={`${API_PATH}/uploads/${encodeURIComponent(item.image)}`} 
                        alt={item.productName} 
                        style={{ 
                            width: "100%",  // Makes image take full column width
                            maxWidth: "150px",  // Prevents image from becoming too large
                            height: "auto",  // Maintains aspect ratio
                            objectFit: "contain",  // Ensures the full image is visible
                            borderRadius: "5px", 
                            display: "block", 
                            margin: "auto"
                        }} 
                    />
                )}
            </td>
            <td>
                <button onClick={()=>HandleDelete(item._id)}>Delete</button>
            </td>
        </tr>
    ))}
</tbody>

        </table>
      )}
    </div>
  )
}

export default AllProducts
