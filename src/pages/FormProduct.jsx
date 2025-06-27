
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../app/productsSlice' 
import { useNavigate } from 'react-router-dom'
import { Text,Card,Flex,Box, Button, TextField, TextArea,Grid,Heading} from '@radix-ui/themes'
function FormProduct() {

const dispatch=useDispatch()
const navigate=useNavigate()

const defaultProd={
  title: "",
  price: "",
  description: "",
  category: "",
  image: ""
}

const [prod, setProd] = useState(defaultProd)


const handleChange=(e)=>{
  const {name,value}=e.target;
  setProd(prev=>({...prev,[name]: value}))
}
const handleSubmit=(e)=>{
   e.preventDefault()
   dispatch(addProduct({id: Date.now(), price: parseFloat(prod.price), rating: {rate: 0, count: 0}, ...prod}))
   setProd(defaultProd)
   navigate("/")

}
  return (
  <Card style={{marginTop: "5rem"}}>
  <Grid columns={{initial: "1", md:"2"}}>
  <Flex justify="center" style={{padding: "5px"}}>
    <img  
    src="https://cloudcommercepro.com/wp-content/uploads/2020/09/marketplace-hero.jpg"
    width="80%"
    height="auto"
    ></img>
</Flex>
<Flex direction="column" align="center" justify="center" >
      <form onSubmit={handleSubmit}>

   <Flex align="center" justify="center" m="4"  width="360px" minWidth="0" >

    <Heading >AGREGAR PRODUCTO</Heading>

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