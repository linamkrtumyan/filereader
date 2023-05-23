import React from 'react'

function Table({f}: any) {
  return (
    <tr>
      {Object.values(f).map((a) => {
        if(a) {
          return (
            //@ts-ignore
            <td>{a}</td>
          )
        }
      
      })}
    </tr>
  )
}

export default Table