import React from 'react'

function ComponentPreview({Component}:{Component?: React.ReactNode}) {
  return (
    <div className='flex items-center justify-center p-10 border border-dashed rounded-md border-border min-h-96 w-full'>
      {Component}
    </div>
  )
}

export default ComponentPreview
