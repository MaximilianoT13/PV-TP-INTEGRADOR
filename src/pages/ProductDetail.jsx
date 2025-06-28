import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById, setCurrentItem, toggleFavorite } from '../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { Button } from '@radix-ui/themes';
import { useEffect } from 'react';
import { toggleUserFavorites } from '../app/usersSlice';

const ProductDetail = () => {

const { id } = useParams()
const navigate = useNavigate();
const dispatch = useAppDispatch();
const status=useAppSelector( state => state.products.statusFetchById)
const product=useAppSelector(state => state.products.currentItem)
const logged=useAppSelector(state=>state.auth.sessionUser)
//MANEJO DE PRODUCTOS
useEffect(()=>{

  if(!id) return

  if(!product || product.id !== Number(id))
    dispatch(fetchProductById(id))

},[dispatch,id,product])
  



 const isFavorite=useAppSelector( state => {
  if(logged)
    return state.auth.sessionUser.favorites.includes(Number(product.id)) ?? false
  else
    return state.products.favorites.includes(Number(product.id)) ?? false
})


  const handleToggleFavorite = () => {
    if(logged)
      dispatch(toggleUserFavorites(product.id))
    else 
      dispatch(toggleFavorite(product.id));
  };



  if(status==="loading") return <h1>cargando</h1>
  if (!product) {return <p>Producto no encontrado</p>;}
   

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>Descripción: {product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Categoría: {product.category}</p>
      <p>Calificación: {product.rating.rate}★ - ({product.rating.count} votos)</p>

      <Button onClick={handleToggleFavorite}>
        {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </Button>

      <Button onClick={() => navigate(-1)} variant="soft" size="2" color="blue">
        Volver
      </Button>
      
      <Link to={`/products/${product.id}/edit`}>Editar producto</Link>
    </div>
  )
}

export default ProductDetail