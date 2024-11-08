
import { store } from "@/stores/store"
import { Oval } from "react-loader-spinner"



const Loading = ({width = 56, height = 56, color="#21AB68"}) => {

  const { componentLoading } = store()


  return (
    componentLoading ?
    // <div className="flex flex-col justify-center items-center bg-modalBlur absolute right-0 z-[350]">
    <div className="flex flex-col justify-center items-center bg-modalBlur absolute top-0 right-0 z-[350] w-full h-full"> 
        <Oval
          height={height}
          width={width}
          color={color}
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#4F7D54"
          strokeWidth={5}
          strokeWidthSecondary={5}
        />
      </div>
      : undefined
  )
}

export default Loading