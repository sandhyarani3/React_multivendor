import react,{useState} from "react";

const Login=({showWelcomeHandle})=>{
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");

    const HandleLogin=async(e)=>{
        e.preventDefault();
        try{
        const response=await fetch("http://localhost:5000/vendor/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password})
        }
        )
        const data=await response.json();
        if(response.ok){
            // console.log(data);
            alert("login successful");
            localStorage.setItem("loginToken",data.token);
            setemail("");
            setpassword("");
            showWelcomeHandle();
            
        }
        const vendorId=data.vendorId;
        console.log(vendorId);
        const vendorResponse=await fetch(`http://localhost:5000/vendor/single-vendor/${vendorId}`);
        const vendordata=await vendorResponse.json();
        if(vendorResponse.ok){
            console.log(vendordata.firmId);
            const firmName=vendordata.vendor.firm[0].firmName;
            console.log(firmName);
            localStorage.setItem("firmId",vendordata.firmId);
            localStorage.setItem("firmName",`${firmName}`);
            window.location.reload();
        }
        // else{
        //     alert("Authentication failed");
        // }
    }
    catch(error){
       console.log(error);
       alert("invalid email or password");
    }
}
    return(
        <div className="loginSection">
            <form className="authForm" onSubmit={HandleLogin}>
            <h3>Vendor Login</h3>
                <label>Email</label><br/>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setemail(e.target.value)}} required></input>
                <label>Password</label><br/>
                <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required></input>
                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Login;