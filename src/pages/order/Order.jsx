import React, { useContext } from 'react'
import MyContext from '../../context/data/MyContext'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/loader/Loader'

function Order() {
  const userid = JSON.parse(localStorage.getItem('currentUser')).user.uid
  const context = useContext(MyContext)
  const { mode, loading, order } = context
  return (
    <Layout>
      {order.length > 0 ?
        (<>
        
            {
              order.filter(obj => obj.userid == userid).map((order) => {
                
                return (
                  <>
                    {
                      order.cartItems.map((item) => {
                        return (
                        
                          <>
                              <img src={item.imageUrl} alt="product-image" />
                                  <h2 >{item.title}</h2>
                                  <p>{item.description}</p>
                                  <p>{item.price}</p>
                                
                            </>
                        )
                      })
                    }
                  </>
                )
              })
            }
        </>)
        :
        (
          <h2>Not Order</h2>
        )

      }
    </Layout>
  )
}

export default Order