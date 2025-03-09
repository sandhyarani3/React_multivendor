import react from "react";

const Sidebar=({showFirmHandle,showProductHandle,showAllproductsHandle,showFirmTitle})=>{
    return(
        <div className="sidebarSection">
         <ul>
            {showFirmTitle ? <li onClick={showFirmHandle}>Add Firm</li>:""}
            <li onClick={showProductHandle}>Add Product</li>
            <li onClick={showAllproductsHandle}>All Products</li>
            <li>User Details</li>
         </ul>
        </div>
    )
}
export default Sidebar;