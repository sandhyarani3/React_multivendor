import React,{useState} from "react";
import {API_PATH} from "../../helpers/APIPath";
const Register=({showLoginHandle})=>{
    const [username,setusername]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(true);

    const handleSubmit=async(e)=>{
        e.preventDefault();
    try {
        const response=await fetch("http://localhost:5000/vendor/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({username,email,password})
        }
        )
        const data=await response.json();
        console.log(data);
        if(response.ok){
            console.log(data);
            setusername("");
            setemail("");
            setpassword("");
            alert("Registered Successfully");
            showLoginHandle();
        }
    } catch (error) {
        console.log(error);
        alert("registration failed");
    }
}
    return(
        <div className="registerSection">
             <form className="authForm" onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label>Username</label><br/>
            <input type="text" name="username" value={username} placeholder="Enter your name" onChange={(e)=>{setusername(e.target.value)}} required></input>
                <label>Email</label><br/>
                <input type="email" name="email" value={email} placeholder="Enter your email" onChange={(e)=>{setemail(e.target.value)}} required></input>
                <label>Password</label><br/>
                <input type="password" name="password" value={password} placeholder="Enter your password" onChange={(e)=>{setpassword(e.target.value)}} required></input>
                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
export default Register;