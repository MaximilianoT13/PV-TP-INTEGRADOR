
import { NavLink } from "react-router-dom"
import { Text,TabNav } from "@radix-ui/themes"
const PrivateRoutes=({isActive})=>{

return(
    <>
      <TabNav.Link asChild active={isActive}>
          <NavLink to="/products/add" >
            <Text size="5" weight="bold" color="indigo">Crear Producto</Text>
          </NavLink>
      </TabNav.Link>
    <TabNav.Link asChild active={isActive}>
        <NavLink to="/about">
            <Text size="5" weight="bold" color="indigo">Acerca De</Text>
        </NavLink>
    </TabNav.Link>
   
    </>
)
}

export default PrivateRoutes