import React, {useContext} from 'react'
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/data/MyContext";
import HeroSection from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard"
import Testimonial from "../../components/testimonial/Testimonial"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../../redux/CartSlice';


const Home = () => {
  const context = useContext(MyContext)
  console.log(context);
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
  return (
    <div>
      <Layout>
      
      <div className="flex gap-5 justify-center">
        <button onClick={()=> addCart()}>add</button>
        <button onClick={()=> deleteCart()}>del</button>
      </div>
      <HeroSection/>
      <Filter/>
      <ProductCard/>
      <Testimonial/>
      </Layout>
    </div>
  )
}

export default Home;
