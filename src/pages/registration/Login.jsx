import React,{useState , useContext,useEffect, useNavigate} from "react";
import { toast } from 'react-toastify';
import {NavLink} from 'react-router-dom'
import MyContext from '../../context/data/MyContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth,fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Image from "./left.png"
import Loader from '../../components/loader/Loader';
const Login = () => {
  const context = useContext(MyContext)
  const { loading, setLoading } = context;
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const [type,settype] = useState("password");
    const [lower,setlower] = useState(false);
    const [upper,setupper] = useState(false);
    const [number,setnumber] = useState(false);
    const [char,setchar] = useState(false);
    const [eightchar,seteightchar] = useState(false);
    const [passVali, setpassVali] = useState("");
    const [isValid, setIsValid] = useState(false)
   const handleChange = (value) =>{
        const lower = new RegExp('(?=.*[a-z])');
        const upper = new RegExp('(?=.*[A-Z])');
        const number = new RegExp('(?=.*[0-9])');
        const char = new RegExp('(?=.*[!@#\$%/^&*])');
        const eightchar = new RegExp('(?=.{8,})');
        if(lower.test(value)) {
            setlower(true);
        }
        else{
            setlower(false);
        }
        if(upper.test(value)){
            setupper(true);
        }
        else{
            
            setupper(false);
        }
        if(number.test(value)){
            setnumber(true);
        }
        else{
            
            setnumber(false);
        }
        if(char.test(value)){
            setchar(true);
        }
        else{
            
            setchar(false);
        }
        if(eightchar.test(value)){
            seteightchar(true);
        }
        else{
            
            seteightchar(false);
        }
        const isLowerValid = lower.test(value);
  const isUpperValid = upper.test(value);
  const isNumberValid = number.test(value);
  const isCharValid = char.test(value);
  const isEightCharValid = eightchar.test(value);
  setlower(isLowerValid);
  setupper(isUpperValid);
  setnumber(isNumberValid);
  setchar(isCharValid);
  seteightchar(isEightCharValid);
  const isValid =
    isLowerValid && isUpperValid && isNumberValid && isCharValid && isEightCharValid;
    setIsValid(isValid);
      if (isValid) {
        setpassVali("");
      } else {
        setpassVali("Password is invalid"); 
      }
    };
   // const [lowerColor, setLowerColor] = useState(false);
    //const [upperColor, setUpperColor] = useState(false);
    //const [numberColor, setNumberColor] = useState(false);
    //const [charColor, setCharColor] = useState(false);
    //const [eightCharColor, setEightCharColor] = useState(false);
    const[fullname,setFullName] = useState({
        fname:"",
        email:"",
        password:"",
        Confirmp:"",

    });
    const [email,setemail] = useState("");
    const inputEvent = (event) => {
        const { value, name } = event.target;
        if (name === "email") {
          setemail(value); 
          emailValidate(); 
        } else if (name === "confirmp") {

          setFullName((preValue) => ({
            ...preValue,
            [name]: value,
          }));
          cpValidate();
        } else if (name === "password") {
          setFullName((preValue) => ({
            ...preValue,
            [name]: value,
          }));
          handleChange(value);
         // const hasLowercase = /[a-z]/.test(value);
         // const hasUppercase = /[A-Z]/.test(value);
          //const hasNumber = /[0-9]/.test(value);
          //const hasSpecialChar = /[!@#\$%/^&*]/.test(value);
          //const hasEightChars = value.length >= 8;
          //setLowerColor(hasLowercase);
          //setUpperColor(hasUppercase);
          //setNumberColor(hasNumber);
          //setCharColor(hasSpecialChar);
          //setEightCharColor(hasEightChars);
        } else {
          setFullName((preValue) => ({
            ...preValue,
            [name]: value,
          }));
        }
      };
    const onSubmit = (event) =>{
        event.preventDefault();
        console.log(fullname);
        if (fullname.password !== fullname.confirmp) {
            setConfirm("Passwords are not same");
          } else {
            setConfirm("");}
          }
    
    const [confirm,setConfirm] = useState("");
   const cpValidate = () =>{
    if(fullname.password !== fullname.confirmp){
        setConfirm("passwords are not same");}
        else{
            setConfirm("");
        }
    }
const [message,setMessage] = useState("");
const emailValidate = () => {
  const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regEx.test(email) && email !== "") {
    setMessage("Email is not valid");
  } else if (/[A-Z]/.test(email)) {
    setMessage("Email cannot contain uppercase letters");
  } else {
    setMessage("");
  }
};
useEffect(() => {
  if (isValid) {
    setpassVali(""); 
  } else {
    setpassVali("Password is invalid");
  }
}, [isValid]);
//const navigate = useNavigate();
const login = async () => {
  setLoading(true);
  try {
    const result = await signInWithEmailAndPassword(auth,email,fullname.password)
    //localStorage.setItem('user',JSON.stringify(result));
    toast.success("Login Succesfully");
    localStorage.setItem("user" , JSON.stringify(result))
    setTimeout(function(){
      window.location.href="/Home"
  }, 1000);
   // navigate("/")
    setLoading(false)
  } catch (error){
    console.log(error);
    toast.error("login Failed");
    setLoading(false)
  }
 
};
const final = () =>{
  console.log("fuiuuiniy");
  if (fullname.fname === "" || email === "" || fullname.password === "") {
    return toast.error("All fields are required");
  }
  if((!regEx.test(email) && email !== "")|| (/[A-Z]/.test(email))||(fullname.password !== fullname.confirmp)||(!(isValid))){
    return toast.error("validations  required");
  }
  else{
    console.log("gjji");
    login();
  }
}

 return(
    <>
    <div className="box">
    <div className="left">
      <img src={Image}/>
    </div>
    <div className="right">
<form onSubmit={onSubmit}>
            <h1>Login Your Account</h1>
            <div className="sign_item">
        <p>Full Name</p>
        <input type="text"
        placeholder="Full Name"
        name='fname'
        onChange={inputEvent} 
            value={fullname.fname}
        />
        </div>
        <div className="sign_item">
        <p>Email</p>
        <input type="email"
        placeholder="email"
        name='email'
        onChange={inputEvent}
            value={email}
        />
        <span className="email-error">{message}</span>
        </div>
        <div className="sign_item">
        <p>Password</p>
        <input type="password"
        placeholder="Password (at least 8 character)"
        name='password'
        onChange={inputEvent} 
            value={fullname.password}
            className={isValid?'valid':'invalid'}
        />
          {passVali && !isValid && (
        <span className="xr">{passVali}</span>
      )}
        </div>
        <div className="sign_item">
        <p>Confirm Password</p>
        <input type="password"
        placeholder=" Confirm Password"
        name='confirmp'
        onChange={inputEvent} 
            value={fullname.confirmp}
        />
        
        <span className="cp">{confirm}</span>
    </div>
         <button className="signup_submit"type="submit" onClick={final}>Login Your Account</button>
        </form>
        <div className="sign_end">
    Dont have an account?<NavLink to="/">SignUp</NavLink></div>
    
    </div>
    </div>
   </> 
  )
}

export default Login
