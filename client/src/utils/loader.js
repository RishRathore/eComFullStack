import { Circles } from "react-loader-spinner";
import React from 'react'

function Loader() {
  return (
    <div className="m-auto w-50 h-50"><Circles
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="circles-loading"
    wrapperStyle={{alignItems: "center", justifyContent:"center"}}
    wrapperClass=""
    visible={true}
  />
  </div>
  )
}

export default Loader

