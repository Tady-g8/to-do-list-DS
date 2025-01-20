import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react'

export default function SearchBar() {
    return (
        <form action="" className='search-bar w-8/12 mx-auto grid grid-cols-5 gap-4'>
            <span className='col-span-4'><Input placeholder='Search tasks' size='md' className='w-8/12'/></span>
            <Button colorScheme='blue'>Search</Button>
        </form>
    )
}