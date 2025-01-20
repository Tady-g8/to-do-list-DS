import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

export default function AddTodo(){
    return (
        <form action="" className='add-todo w-8/12 mx-auto grid grid-cols-7 gap-4 my-5'>
            <span className='col-span-2'><Input placeholder='Task title...' size='md' className='w-8/12'/></span>
            <span className='col-span-4'><Input placeholder='Description...' size='md' className='w-8/12'/></span>
            <Button colorScheme='green'>Add</Button>
        </form>
    )
}