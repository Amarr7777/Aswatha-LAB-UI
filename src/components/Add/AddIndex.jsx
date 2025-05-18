import React from 'react'
import AddNewParameter from './AddNewParameter'
import AddNewUnit from './AddNewUnit'
import AddNewTest from './AddNewTest'

export default function AddIndex() {
  return (
    <div className="flex flex-col gap-2 w-full">
        {/* <AddNewTest/> */}
        {/* parameter */}
        <AddNewParameter />
        {/* Unit */}
        <AddNewUnit />
      </div>
  )
}
