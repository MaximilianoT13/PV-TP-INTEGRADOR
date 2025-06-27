import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById, setCurrentItem, toggleFavorite } from '../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { Button } from '@radix-ui/themes';
import { useEffect } from 'react';

const ProductDetail = () => {

  const { id } = useParams()
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector((state) => state.products.currentItem)  

  const local=useAppSelector((state)=>state.products.localProducts.find((e)=> e.id === Number(id)))
  const api=useAppSelector((state)=>state.products.apiProducts.find((e)=> e.id === Number(id)))

   const isFavorite = useAppSelector(state =>
    product ? state.products.favorites.includes(Number(product.id)) : false
  );

  useEffect(()=>{
  
    if(!product)
   {   if(api){
      dispatch(setCurrentItem(api))
      return}

       if(local){
      dispatch(setCurrentItem(local))
      return }
    
    dispatch(fetchProductById(id))
   }
  },[id,product])


 
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };
  if (!product) {
    return <p>Producto no encontrado</p>;
  }

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