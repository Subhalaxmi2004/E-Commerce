import React,{useContext} from 'react'
import MyContext from "../../../context/data/MyContext"
const AddProduct = () => {
  const context = useContext(MyContext);
  const{products,setProducts, addProduct} = context;
  return (
    <>
    <div className="pro">
      <h1>Add Product</h1>
      <input className="input_item"type="text" placeholder="Product Title" name="title" value={products.title} onChange={(e)=>{setProducts({...products,title:e.target.value})}}/>
      <input className="input_item" type="text" placeholder="Product Price" name="price" value={products.price} onChange={(e)=>{setProducts({...products,price:e.target.value})}} />
      <input className="input_item"type="text" placeholder="Product ImageUrl" name="imagrUrl" value={products.imageUrl} onChange={(e)=>{setProducts({...products,imageUrl:e.target.value})}}/>
      <input className="input_item" type="text" placeholder="Product Category" name="category" value={products.category} onChange={(e)=>{setProducts({...products,category:e.target.value})}}/>
      <input className="input_item" id="textarea"type="text" placeholder="Product Title" name="description" value={products.description} onChange={(e)=>{setProducts({...products,description:e.target.value})}}/>
      <button class="bot" onClick={addProduct}>Add Product</button>
      </div>
    </>
  )
}

export default AddProduct
