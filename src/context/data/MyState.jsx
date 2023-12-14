import React, { useState,useEffect } from 'react'
import MyContext from "./MyContext";
import { fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp,setDoc,deleteDoc,doc,addDoc,getDocs, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const MyState = (props) => {
  const [mode,setMode] = useState("light");
  const toggleMode = () =>{
    
  if(mode ==="light"){
    setMode("dark");
    console.log(mode);
    
    //document.body.style.backgroundColor = "red"
  }
  else{
    setMode("light")
  console.log(mode);
//document.body.style.backgroundColor = 'green';
  }}
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({
    
      title: "",
      price: "",
      id: uuidv4(),
      imageUrl: "",
      category: "",
      description: "",
      time: Timestamp.now(), 
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
});
// const [productsArray, setProductsArray] = useState([]);
// useEffect(() => {
//   // When the products data changes, update the productsArray
//   setProductsArray(Object.values(products));
// }, [products]);
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    setLoading(true);
    try {
    const productRef = collection(fireDB, "products");
      await addDoc(productRef, products)
      console.log(products);
      toast.success("Product Added successfully");
      getProductData();
    
      setTimeout(() => {
        window.location.href ="./Dashboard"
      }, 800);
      setProducts("")
      setLoading(false)
      

  
     // CloseModal()

      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    
  }

  const [product, setProduct] = useState([]);
  const getProductData = async () =>{
    setLoading("true")
    try{
      const q = query(collection(fireDB,"products"),
      orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    getProductData();
  }, []);

  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      
      await setDoc(doc(fireDB, "products", products.id), products);
      console.log(products);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      window.location.href = '/dashboard'
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      console.log(error);
      setLoading(false)
    }
  }
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  useEffect(() => {
    getProductData();
    getOrderData()

  }, []);
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        
      });
      setUser(usersArray);
      console.log(usersArray)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }




  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);
  return (
    <div>
<MyContext.Provider value={{mode,toggleMode,loading,loading,setLoading,products,setProducts,addProduct,getProductData,product,edithandle,updateProduct,deleteProduct,user}}>{
  props.children
}</MyContext.Provider>
    </div>
  )
}

export default MyState
