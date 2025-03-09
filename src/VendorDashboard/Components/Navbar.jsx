import react from "react";

const Navbar=({showLoginHandle,showRegisterHandle,showLogout,LogoutHandler})=>{
    console.log(showLoginHandle);
    const firmName=localStorage.getItem("firmName");
    return(
        <div className="navSection">
            <div className="company">
                VendorDashboard
            </div>
            <div className="FirmName">
                {firmName}
            </div>
            <div className="userAuth">
                {!showLogout ? 
                <>
                <span onClick={showLoginHandle}>Login/</span>
                <span onClick={showRegisterHandle}>Register</span></>
                :<span onClick={LogoutHandler}>Logout</span>}
                
            </div>
        </div>
    )
}
export default Navbar;

