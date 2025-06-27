
import { useEffect, useState,useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct, editProduct, fetchProductById, setCurrentItem } from '../app/productsSlice' 
import { useLocation, useNavigate,useParams } from 'react-router-dom'
import { Card,Flex,Box, Button, TextField, TextArea,Grid,Heading} from '@radix-ui/themes'
import { useAppSelector } from '../hooks/store'

function FormProduct() {

const dispatch = useDispatch()
const navigate = useNavigate()
const { id } = useParams()
const product=useAppSelector(state => state.products.currentItem)
const status=useAppSelector(state=> state.products.statusFetchById)
const location = useLocation()
const addMode = location.pathname === "/products/add" || false


useEffect(()=>{

  if(!id) return

  if(!product || product.id !== Number(id))
    dispatch(fetchProductById(id))

},[dispatch,id,product])
  

const defaultProd={
  title: "",
  price: "",
  description: "",
  category: "",
  image: ""
}

const [prod, setProd] = useState(defaultProd)



useEffect(()=>{
  if(!addMode && product)
    setProd(product)
},[addMode,id,product])

const handleChange=(e)=>{
  const {name,value}=e.target;
  setProd(prev=>({...prev,[name]: value}))
}
const handleSubmit=(e)=>{
   e.preventDefault()

   if(addMode){
      dispatch(addProduct({id: Date.now(), price: parseFloat(prod.price), local:true ,rating: {rate: 0, count: 0}, ...prod}))
      setProd(defaultProd)
      navigate("/")
   }
   else 
   {
      dispatch(editProduct(prod))
      navigate(`/products/${prod.id}`)
      setProd(defaultProd)
   }
}

  if(!addMode && !product) return <h1>Producto no encontrado</h1>
  if(!addMode && status==="loading") return <h1>Cargando</h1>
  if(!addMode && status==="failed") return <h1>Error al cargar</h1>
    

  return (
  <Card style={{marginTop: "5rem"}}>

  <Grid columns={{initial: "1", md: (addMode ? "2" : "1") }}>
    
  {addMode ? (<><Flex justify="center" style={{padding: "5px"}}>
    <img  
    src="https://cloudcommercepro.com/wp-content/uploads/2020/09/marketplace-hero.jpg"
    width="80%"
    height="auto"
    ></img>
    </Flex></>) : []}

    <Flex direction="column" align="center" justify="center" >    
    <form onSubmit={handleSubmit}>

<Flex align="center" justify="center" m="4"  width="360px" minWidth="0" >

    <Heading >{addMode ? "AGREGAR PRODUCTO" : "EDITAR PRODUCTO"}</Heading>

</Flex>
    <label htmlFor='title'>Titulo</label>
    <TextField.Root

    id='title' 
    name='title' 
    value={prod.title}
    onChange={handleChange}
    required
    />
 
    <label htmlFor='price'>Precio</label>
    <TextField.Root 
    id='price' 
    name='price'
    type='number'
    value={prod.price}
    onChange={handleChange}
    min="5"
    step="0.01"
    required
    />
    <label htmlFor='description'>Descripcion</label>
    <TextArea 
    id='description' 
    name='description'
    value={prod.description}
    onChange={handleChange}
    required
    />

    <label htmlFor='category'>Categoria</label>
    <TextField.Root 
    id='category' 
    name='category'
    value={prod.category}
    onChange={handleChange}
    required
    />

    <label htmlFor='image'>Imagen(url)</label>
    <TextField.Root 
    id='image' 
    name='image'
    type='url'
    value={prod.image}
    onChange={handleChange}
    required
    />
     {(!addMode && prod.image) ? (
    <img 
    src={prod.image} 
    alt='error'
    onError={e=> e.currentTarget.src = "https://static.thenounproject.com/png/504708-200.png"}/>
    ) 
    : 
    []}
<Flex align="center" justify="between" mt="4" style={{padding: "20px"}}>
    <Button style={{ width: "40%", height: "35px" }} type='submit'>Agregar</Button>
    <Button> Cancelar</Button>
</Flex>
   </form>  
  </Flex> 

    
   </Grid>
</Card>
  )
}

export default FormProduct