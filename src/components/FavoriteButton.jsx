import { Button } from '@radix-ui/themes'
import { useAppDispatch } from '../hooks/store'
import { toggleFavorite } from '../app/productsSlice'
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'

function FavoriteButton({productId,isFavorite}) {
const dispatch=useAppDispatch()


  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
      <Button size="2" onClick={()=>dispatch(toggleFavorite(productId))}>
        {!isFavorite ? (<>
         <HeartIcon/>
        </>) : (
          <HeartFilledIcon/>
        )}
       
      </Button>
    </div>
  )
}
export default FavoriteButton