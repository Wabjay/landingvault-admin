import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { store } from '@/stores/store';

const Load = Skeleton

const SkeletonLoader = ({children, width, height}) => {
    
  const { componentLoading } = store();

  return (
    componentLoading ? <Load width={width ? width : '100%'} height={height} containerClassName="flex-1" /> : children
  )
}


export default SkeletonLoader