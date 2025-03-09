import React,{useState,useEffect} from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import Login from "../Components/forms/Login";
import Register from "../Components/forms/Register";
import AddFirm from "../Components/forms/AddFirm";
import AddProduct from "../Components/forms/AddProduct";
import Welcome from "../Components/Welcome";
import AllProducts from "../Components/AllProducts";
const Landingpage=()=>{
    const [showLogin,setshowLogin]=useState(false);
    const [showLogout,setshowLogout]=useState(false);
    const [showRegister,setshowRegister]=useState(false);
    const [showFirm,setshowFirm]=useState(false);
    const [showProduct,setshowProduct]=useState(false);
    const [showWelcome,setshowWelcome]=useState(false);
    const [showAllproducts,setshowAllproducts]=useState(false);
    const [showFirmTitle,setshowFirmTitle]=useState(true);

    useEffect(()=>{
        const loginToken=localStorage.getItem("loginToken");
        if(loginToken){
            setshowLogout(true);
        }
    })
    useEffect(()=>{
        const firmName=localStorage.getItem("firmName");
        if(firmName){
            setshowFirmTitle(false);
        }
    })
    const LogoutHandler=()=>{
        confirm("Are you sure to Logout?")
        localStorage.removeItem("loginToken");
        localStorage.removeItem("firmId");
        localStorage.removeItem("firmName");
        window.location.reload();
        setshowLogout(false);
    }
   
    const showLoginHandle=()=>{
        setshowLogin(true);
        setshowRegister(false);
        setshowFirm(false);
        setshowProduct(false);
        setshowWelcome(false);
        setshowAllproducts(false);
    }
    
    const showRegisterHandle=()=>{
        setshowRegister(true);
        setshowLogin(false);
        setshowFirm(false);
        setshowProduct(false);
        setshowWelcome(false);
        setshowAllproducts(false);
    }
    
    const showFirmHandle=()=>{
        if(showLogout){
            setshowFirm(true);
        setshowRegister(false);
        setshowLogin(false);
        setshowProduct(false);
        setshowWelcome(false);
        setshowAllproducts(false);
        }
        else{
            alert("please login...")
            setshowLogin(true);
            setshowRegister(false);
        }
    }
    
    const showProductHandle=()=>{
        if(showLogout){
        setshowProduct(true);
        setshowFirm(false);
        setshowRegister(false);
        setshowLogin(false);
        setshowWelcome(false);
        setshowAllproducts(false);
        }
        else{
            alert("please login...")
            setshowLogin(true);
            setshowRegister(false);
        }
    }
   
   
    const showWelcomeHandle=()=>{
        setshowWelcome(true);
        setshowFirm(false);
        setshowRegister(false);
        setshowLogin(false);
        setshowProduct(false);
        setshowAllproducts(false);
    }
    
    
    const showAllproductsHandle=()=>{
        if(showLogout){
        setshowAllproducts(true);
        setshowWelcome(false);
        setshowFirm(false);
        setshowRegister(false);
        setshowLogin(false);
        setshowProduct(false);
        }
        else{
            alert("please login...");
            setshowLogin(true);
            setshowRegister(false);
        }
    }

    return(
        <section className="landingSection">
            <Navbar showLoginHandle={showLoginHandle} showRegisterHandle={showRegisterHandle}
            showLogout={showLogout} LogoutHandler={LogoutHandler}/>
            <div className="collectionSection">
            <Sidebar showFirmHandle={showFirmHandle} showProductHandle={showProductHandle} 
            showAllproductsHandle={showAllproductsHandle} showFirmTitle={showFirmTitle}/>
            {showLogin && <Login showWelcomeHandle={showWelcomeHandle}/>}
            {showRegister &&  <Register showLoginHandle={showLoginHandle}/>}
            {showFirm && showLogout && <AddFirm/>}
            {showProduct && showLogout &&  <AddProduct/>}
            {showWelcome && <Welcome/>}
            {showAllproducts && showLogout &&  <AllProducts/>}
            </div>
        </section>
    )
}
export default Landingpage