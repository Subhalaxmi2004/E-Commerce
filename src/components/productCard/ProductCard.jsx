import React, { useContext, useEffect } from 'react';
import MyContext from '../../context/data/MyContext';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import {addToCart} from "../../redux/CartSlice";
import { toast } from 'react-toastify';
const ProductCard = () => {
  const context = useContext(MyContext);
  const { mode, products,product} = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.Cart);

  const addCart = (product) =>{
    dispatch(addToCart(product))
    toast.success("add To Cart");
    console.log(cartItems);
  }
  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <>
    
      <h1>Our Latest Collection</h1>
      <div className="outercard">
        {product.map((item, index) => {
          const {id, title, price, description, imageUrl } = item;
          return (
            
            <div className="chil" key={index}>
              <div className="chi">{imageUrl}</div>
              <div className="ch">
                <p>E-Shop</p>
                <p>{title}</p>
                <p>{price}</p>
                <p>{description}</p>
                <button onClick={()=>addCart(item)
                }>Add to Cart</button>
              </div>
            </div>
          );
        })}
      </div>
    
    </>
  );
};

export default ProductCard;
