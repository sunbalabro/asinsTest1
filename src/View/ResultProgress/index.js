import React from 'react'

export const ResultProgress = ({data}) => {
  return(
    <div  style={{ width: '90%', height: '50px', position: 'relative', marginLeft:"25px" }} >
    {data.map((x, i) => <div key={i} style={{ backgroundColor: `${x.color}`, width: `${x.val}%`, height: '20px'}} className='resultProgress' ></div>)}
  </div>
   )

 }