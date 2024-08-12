import { useState, useEffect } from "react"
import Header from "./components/Header"  
import Guitar from "./components/Guitar"
import { db } from "./data/db"



function App() {

  const initialCart=()=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  
  const [data]=useState(db)
  const [cart,setCart]=useState(initialCart)

  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))//cada que cambie cart ejecuta una funcion 
  },[cart])
  //para consumir apis use effect 
  //Funcion para agregar a un carrito
  const addToCar=(item)=>{
    const isAddTo=cart.findIndex(guitar=>guitar.id===item.id)//verificamos que si en nuestro nuevo arreglo cart ya hay ese id 
    console.log(isAddTo)
    if (isAddTo>=0){
      console.log('Ya esta agreado')
      const updateCart=[...cart]
      updateCart[isAddTo].quantity++//El metodo findIndex te devuelve la poscion de un elemento cuando lo buscas, por lo que te da la posicion y ya tienes para mejor control con posiciones
      setCart(updateCart)
    }else{
      item.quantity=1
      setCart(prevCart=>[...prevCart,item])//set cart ya sabe que hace referenica a cart
      console.log('Agregando')
    }
    
  }
  const removeElement = (id) => {
    console.log(`Eliminando ${id}`);
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  };
  const increCart=(id)=>{
    console.log(`Incrementando ${id}`)
    const updatedCart= cart.map(item => {
      if (item.id === id && item.quantity<5){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item//si no se cumple la condicion pues devuelvo el mismo elemento 
    })
    setCart(updatedCart)
  }
  const decreseCart=(id)=>{
    console.log(`Quitando elemtnos ${id}`)
    const updateCart=cart.map(item=>{
      if (item.id==id && item.quantity>0){
        if (item.quantity==0){
          removeElement(item.id)
        }else {
          return{
            ...item,
            quantity: item.quantity - 1,
          }
        }
      }
      return item
    })
    setCart(updateCart)
  }
  function clearCart (){
    setCart([])
  }

  return (  
    <>
      <Header
        cart={cart}
        removeElement={removeElement}
        increCart={increCart}
        decreseCart={decreseCart}
        clearCart={clearCart}
      />
       
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar)=>(
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCar={addToCar}

              //setCart={setCart}//esta funcion cambau el state
            />
          )
          )}
        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

      
    </>
  )
}

export default App
