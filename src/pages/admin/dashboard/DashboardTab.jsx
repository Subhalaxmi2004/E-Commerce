import React,{useState,useEffect,useContext} from 'react';
import MyContext from '../../../context/data/MyContext';
import {Tab,Tabs,TabList,TabPanel} from "react-tabs";
import { Link, Navigate } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
const DashboardTab = () => {
  const context = useContext(MyContext);
    const { mode,products,getProductData,product,productsArray ,edithandle,updateProduct,deleteProduct,order,user } = context;
    console.log(products);
    const add = () =>{
      window.location.href = "/AddProduct"
    }
    const del = () =>{
      window.location.href = "/UpdateProduct"
    }
    // useEffect(() => {
    //   // This effect will run when the products data changes.
    //   getProductData();
    // }, [products]); // Watch for changes in the products state.
  
    console.log(products);
    
  
  return (
    <>
    
      <Tabs defaultIndex={0} className="">
      <TabList>
      <div className="tab">
        <Tab className="item">
          <button>Products</button>
        </Tab>
        <Tab className="item" >
          <button>Orders</button>
        </Tab>
        <Tab className="item">
          <button>Users</button>
        </Tab>
        </div>
      </TabList>
      <TabPanel>
        <h1>Product Details</h1>
        <p className="add" onClick={add}>Add Product</p>
        <thead>
          <tr>
          <div className="row_item">
            <th>
              sl.no
            </th>
            <th>
              IMAGE
            </th>
            <th>
              TITLE
            </th>
            <th>
              PRICE
            </th>
            <th>
              CATEGORY
            </th>
            <th>
              DESCRIPTION
            </th>
            <th>
              DATE
            </th>
            <th>
              ACTION
            </th>
            </div>
          </tr>
        </thead>
        {product.map((item,index) =>
        {
          const {title,price,imageUrl,category,description,date} = item;
          return(

        <tbody>
          <tr>
          <div className="row_item">
            <td>
              {index+1}
            </td>
            <td>
              {imageUrl}
            </td>
            <td>
              {title}
            </td>
            <td>
              {price}
            </td>
            <td>
              {category}
            </td>
            <td>
              {description}
            </td>
            <td>
              {date}
            </td>
            <td>
            <p id="action" onClick={() => {
               deleteProduct(item) }}>delete</p>
               <p id="action" onClick={() => {
  try {
    edithandle(item);
    del();
  } catch (error) {
    console.log(error);
  }
}}>update</p>
            </td>
            </div>
          </tr>
        </tbody>
        )})}
      </TabPanel>
      <TabPanel>
        <h1>ORDER Details</h1>
        {order && order.length>0?(
          order.map((allorder, index) => {
         return (
          <table key={index}>
        <thead>
          <tr>
          <div className="row_item">
            <th>
              Payment Id
            </th>
            <th>
              IMAGE
            </th>
            <th>
              TITLE
            </th>
            <th>
              Price
            </th>
            <th>
              Category
            </th>
            <th>
              Name
            </th>
            <th>
              Address
            </th>
            <th>
              Pincode
            </th>
           
            <th>
              Phonenumber
            </th>
           
            <th>
              Email
            </th>
            <th>
              Date
            </th>

            </div>
          </tr>
        </thead>
        {allorder.cartItems.map((item, index) => {
           const {title,description,category,imageUrl,price} = item;
           return (
        <tbody key={index}>
          <tr>
          <div className="row_item">
          
          <td>
              {allorder.paymentId}
            </td>
            <td>
              {imageUrl}
            </td>
            <td>
              {title}
            </td>
            <td>
              {price}
            </td>
            <td>
             { category}
            </td>
            <td>
              {allorder.addressInfo.name}
            </td>
            <td>
              {allorder.addressInfo.address}
            </td>
            <td>
            {allorder.addressInfo.pincode}
            </td>
           
            <td>
            {allorder.addressInfo.number}
            </td>
           
            <td>
            {allorder.email}
            </td>
            <td>
            {allorder.date}
            </td>

            </div>
          </tr>
        </tbody>

        );})}
          </table>
          );})):(<p>No orders available</p>)}                            
      </TabPanel>
      <TabPanel>
        <h1>user Details</h1>
        <table>
        <thead>
          <tr>
          <div className="row_item">
            <th>
              Sl.No
            </th>
            <th>
              Name
            </th>
            <th>
              Email
            </th>
            <th>
              Uid
            </th>
           
            <th>
              Date
            </th>
           
            </div>
          </tr>
        </thead>
        {user && user.length > 0 ? (
        user.map((item, index) => {
          const {name,uid,email,date} = item;
          return (
        <tbody key={index}>
          <tr>
          <div className="row_item">
          <td>
              {index+1}
            </td>
            <td>
              {name}
            </td>
            <td>
              {email}
            </td>
            <td>
              {uid}
            </td>
           
            <td>
              {date}
            </td>
            </div>
          </tr>
        </tbody>
        );})):(<p>No users Available</p>) }
</table>
      </TabPanel>
      </Tabs>
    </>
  )
}

export default DashboardTab
