import { useEffect,useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/store"
import { fetchProducts } from "../app/productsSlice";
import { Grid } from "@radix-ui/themes";
import ProductItem from "./ProductItem";
import Favorites from "../pages/Favorites";

function ProductList() {

  const {apiProducts,localProducts}=useAppSelector(state=>state.products)
  const state = useAppSelector(state => state.products.status)

  const products=useMemo(()=>{
    return [...localProducts,...apiProducts]
  },[localProducts,apiProducts])
  

  if(state==="loading") return <h1>cargando</h1>
  if(state==="failed") return <h1>fallo al cargar datos</h1>
  
  return (
    <>
          <Grid columns={"repeat(auto-fit, minmax(250px, 1fr))"} gap="4" maxWidth={"1200px"} justify={"center"} mx="auto">
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </Grid>
    
    </>
  )
}

export default ProductList