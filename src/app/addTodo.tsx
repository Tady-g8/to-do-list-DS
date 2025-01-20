import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

import { useState } from 'react';
import { addTask } from './actions';

export default function AddTodo(){

    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 

        if (!taskTitle || !description) {
            alert("Both fields are required");
            return;
        }

        const completed = 0;
        const created_at = new Date().toString();

        const task = {
            title: taskTitle,
            desc: description,
            completed,
            created_at
        }; 

        try {
            await addTask(task);
            setTaskTitle('');
            setDescription('');
        } catch (error) {
            console.error("Failed to add task", error);
        } finally {
            window.location.reload(); 
        }
    }

    return (
        <form onSubmit={handleSubmit} className="add-todo w-8/12 mx-auto grid grid-cols-7 gap-4 my-5">
            <span className="col-span-2">
                <Input
                    placeholder="Task title..."
                    value={taskTitle}
                    onChange={handleTitleChange}
                    bg="gray.50" 
                    borderRadius="md" 
                />
            </span>
            <span className="col-span-4">
                <Input
                    placeholder="Description..."
                    value={description}
                    onChange={handleDescriptionChange}
                    bg="gray.50" 
                    borderRadius="md" 
                />
            </span>
            <Button colorScheme="green" type="submit">Add</Button>
        </form>
    );
}