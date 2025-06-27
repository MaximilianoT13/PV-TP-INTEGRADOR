import { Avatar, DropdownMenu, TabNav, Text,Flex, Dialog } from '@radix-ui/themes';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logoutSession } from '../app/usersSlice';
import { useEffect } from 'react';
const Navbar = () => {

const dispatch=useDispatch()
const navigate=useNavigate()
const logged=useSelector(state=>state.auth.sessionUser)
const users=useSelector(state => state.auth.users)

useEffect(()=>{
if(logged){
  console.log(logged)
  
}
else 
 console.log(users)
},[logged])


const logOut=()=>{
  dispatch(logoutSession())
  alert("Sesion cerrada")
  navigate("/user/login")
}

  return (
    <>

    <Flex align={"center"} justify={"between"}>
      <Text>Pagina</Text>  
  

    <TabNav.Root size="2" color="indigo" className='bg-white shadow-md' justify={"center"}>
      
      <TabNav.Link asChild active >
          <NavLink to="/" >
            <Text size="5" weight="bold" color="indigo">Home</Text>
          </NavLink>
      </TabNav.Link>
      <TabNav.Link asChild active>
          <NavLink to="/products/add" >
            <Text size="5" weight="bold" color="indigo">Crear Producto</Text>
          </NavLink>
      </TabNav.Link>
      <TabNav.Link asChild active>
          <NavLink to="/favorites" >
            <Text size="5" weight="bold" color="indigo">Favoritos</Text>
          </NavLink>
      </TabNav.Link>
      <TabNav.Link asChild active>
          <NavLink to="/about">
            <Text size="5" weight="bold" color="indigo">Acerca De</Text>
          </NavLink>
      </TabNav.Link>


    </TabNav.Root>
     
     <DropdownMenu.Root>
       <DropdownMenu.Trigger>
        <button style={{ outline: 'none', border: 'none', background: 'transparent' }}>
        <Avatar variant="soft" src='https://openclipart.org/image/800px/247319'/>
        </button>
       </DropdownMenu.Trigger>
       <DropdownMenu.Content>
        {logged ? (
          <>
          <DropdownMenu.Item onClick={logOut}>
            <Text>Cerrar Sesion</Text>
          </DropdownMenu.Item>
          </>
        ) : (
          <>
          <DropdownMenu.Item>
             <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/user/login">INICIAR SESION</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/user/add">REGISTRARSE</Link>
          </DropdownMenu.Item>
          </>
      )}
       
       </DropdownMenu.Content>
     </DropdownMenu.Root>


  
      
      
   </Flex>
    </>
  );
};

export default Navbar;