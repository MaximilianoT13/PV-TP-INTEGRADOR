import { fetchProducts } from '../app/productsSlice';
import ProductItem from '../components/ProductItem';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { useEffect, useMemo } from 'react';
import { Grid } from '@radix-ui/themes';
const Favorites= ()=> {
const dispatch=useAppDispatch()
const {apiProducts,localProducts,favorites,status}=useAppSelector(state=>state.products)
const logged=useAppSelector(state => state.auth.sessionUser)
useEffect(()=>{
  if(status==="idle")
  dispatch(fetchProducts())
},[dispatch,status])



  const products = useMemo(()=>{
  return [...apiProducts,...localProducts].filter(product => {

    if(logged)
      return logged.favorites.includes(product.id) ?? false
    else 
      return favorites.includes(product.id) ?? false
    
})},[apiProducts,localProducts,favorites,logged])  


if(products.length===0) return <h1>Lista de Favoritos vacia</h1>

  return (
    <Grid >
    {products.map(product => (
      <ProductItem key={product.id} product={product}/>
    ))}
    </Grid>
  );
}

export default Favorites