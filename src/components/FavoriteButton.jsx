import { Button } from '@radix-ui/themes'
import { useAppDispatch, useAppSelector } from '../hooks/store'
import { toggleFavorite } from '../app/productsSlice'
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons'
import { toggleUserFavorites } from '../app/usersSlice'

function FavoriteButton({productId,isFavorite}) {
const dispatch=useAppDispatch()
const logged=useAppSelector(state => state.auth.sessionUser)

const handleToggleFavorite=(id)=>{
  if(logged)
    dispatch(toggleUserFavorites(id))
  else 
    dispatch(toggleFavorite(id))
}
  return (
    <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
      <Button size="2" onClick={()=>handleToggleFavorite(productId)}>
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