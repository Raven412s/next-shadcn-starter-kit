import MultiSelect from '@/registry/default/starter-kit-ui/multi-select'

const TestingPage = () => {
  return (
    <div className='flex items-center justify-center min-h-screen text-foreground w-full'>
      <MultiSelect variant='secondary' options={["Apple", "Banana", "Guava", "Oranges","Apple2", "Banana2", "Guava2", "Oranges2"]} placeholder="Select fruits" label="Fruits" className='max-w-xl w-full' size='sm'/>

    </div>
  )
}

export default TestingPage
