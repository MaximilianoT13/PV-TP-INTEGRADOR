import { Box, Card, Inset, Strong, Text } from '@radix-ui/themes'
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import { setCurrentItem } from '../app/productsSlice'
import { useAppDispatch,useAppSelector } from '../hooks/store'
import { useEffect } from 'react'

function ProductItem({ product }) {

const dispatch=useAppDispatch()
const logged=useAppSelector(state => state.auth.sessionUser)

const isFavorite=useAppSelector( state => {
  if(logged)
    return state.auth.sessionUser.favorites.includes(Number(product.id)) ?? false
  else
    return state.products.favorites.includes(Number(product.id)) ?? false
})
  return (
    <Box position={"relative"}>
      <FavoriteButton productId={product.id} isFavorite={isFavorite} />
      <Card size="2" style={{ height: "100%" }} asChild>
        
        <Link to={`/products/${product.id}`}   
           onClick={()=>dispatch(setCurrentItem(product))}
           >

          <Inset clip="padding-box" side="top" pb="current">
            <img
              src={product.image}
              alt="Bold typography"
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: 180,
                backgroundColor: "var(--gray-5)",
              }}
            />
          </Inset>
          <Text as="p" size="3">
            <Strong>{product.title}</Strong>
          </Text>
          <Text size="2" color="gray">
            Rating: {product.rating.rate}
          </Text>
          <Text size="2" color="gray">
            Price: ${product.price}
          </Text>
        </Link>
      </Card>
    </Box>
  )
}

export default ProductItem