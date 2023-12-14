import React, { useContext,useEffect,useState } from 'react';
import MyContext from "../../context/data/MyContext";
import Layout from "../../components/layout/Layout";
import Modal from '../../components/modal/Modal';
import { useSelector ,useDispatch} from "react-redux";
import {deleteFromCart} from "../../redux/CartSlice";
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
const Cart = () => {
  const context = useContext(MyContext);
  const { mode,products} = context;
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.Cart);
  console.log("Redux State (cartItems):", cartItems);
  console.log(cartItems);
  // add to cart
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item))
    toast.success('delete g cart');
  }
  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cartItems));
  }, [cartItems])
  console.log(cartItems);
const [total, setTotal] = useState(0);
useEffect(() => {
let temp = 0;
cartItems.forEach((cartItems) =>{temp=temp+parseInt(cartItems.price)})
  console.log("Total:", temp);
setTotal(temp);
}, [cartItems]);
const shipping = parseInt(100);
const grandTotal = shipping;
console.log(grandTotal) 
const [name,setName] = useState("");
const [address,setAddress] = useState("");
const [pincode,setPincode] = useState("");
const [number,setNumber] = useState("");

const buyNow = async () =>{
  if (name === "" || address ==="" || pincode === "" || number === "") {
    return toast.error("All fields are required", {
    })
  }
const addressInfo = {
  name,
  address,
  pincode,
  number,
  date: new Date().toLocaleString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  ),};

console.log(addressInfo)
const options = {
  key: "rzp_test_kjwj5iIftnuVQW",
  key_secret: "yfSAZbhvgtpaxZNdriR6vxZ0",
  amount: parseInt(grandTotal * 100),
  currency: "INR",
  order_receipt: 'order_rcptid_' + name,
  name: "E-Shop",
  description: "for testing purpose",
  handler: function (response) {
    // console.log(response)
    toast.success('Payment Successful')
    const paymentId = response.razorpay_payment_id
    // store in firebase 
    const orderInfo = {
      cartItems,
      addressInfo,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      ),
      email: JSON.parse(localStorage.getItem("user")).user.email,
      userid: JSON.parse(localStorage.getItem("user")).user.uid,
      paymentId
    };

    try {
      const orderRef = collection(fireDB,"order")
      const docRef =  addDoc(orderRef, orderInfo);
      console.log("Document written with ID: ", docRef.id);
      toast.success('Payment Successful');
    } catch (error) {
      console.log(error)
      toast.error('Error processing order');
    }
  }
};
const pay = new window.Razorpay(options);
pay.open();
//console.log(pay)
}

  return (
    <div>
      <Layout>
        <h1>Cart Items</h1>
        {cartItems.map((item, index) => {
  if (item) {
    const { title, price, description, imageUrl } = item;
    return (
      <div className="cart">
        <div className="car" key={index}>
          <div className="car1">{imageUrl}</div>
          <div className="car2">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{price}</p>
          </div>
          <div onClick={() => deleteCart(item)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </div>
        </div>
        <div className="price">
          <div className="rice">
            <p className="sub">subtotal</p>
            <p className="sub">{total}</p>
          </div>
          <div className="rice">
            <p className="sub">shipping</p>
            <p className="sub">{shipping}</p>
          </div>
          <div className="rice">
            <p className="sub">total</p>
            <p className="sub">{grandTotal}</p>
          </div>
          
        </div>
        <Modal name={name} address={address} pincode ={pincode}
          number={number} setName={setName} setAddress={setAddress}
          setPincode={setPincode} setNumber={setNumber} buyNow ={buyNow}
        />
      </div>
    );
  }
  return null; 
})}

      </Layout>
    </div>
  );
}

export default Cart;
