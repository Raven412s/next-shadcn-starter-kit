import MultiSelect from '@/registry/default/starter-kit-ui/multi-select'
import React from 'react'

const TestingPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen text-foreground w-full'>
      <MultiSelect options={["Apple","Banana","Guava","Oranges"]} placeholder="Select fruits" label="Fruits" className='max-w-3xl w-full' optionsDropdownClassName='min-w-3xl w-full'/>
        
    </div>
  )
}

export default TestingPage
