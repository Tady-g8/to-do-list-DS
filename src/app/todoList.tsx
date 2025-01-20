import { getData, deleteTask, completeTask } from "./actions"
import { Button, Input } from '@chakra-ui/react'
import LoadingCircle from "./spinner";

import { useEffect, useState } from 'react';

export default function TodoList() {
    interface Todo {
        id: number;
        title: string;
        description: string;
        completed: number;
    }

    const [data, setData] = useState<Todo[] | null>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData();
                const todos: Todo[] = result.map((item) => ({
                    id: item.id,
                    title: item.title,
                    description: item.desc,
                    completed: item.completed,
                }));
                setData(todos);
            } catch (err) {
                setError(`Failed to fetch data: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="w-8/12 mx-auto">
            <LoadingCircle />
        </div>;
    }

    if (data === null){
        return <div>No data</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='todo-list w-8/12 mx-auto'>

            <Input 
                placeholder='Search tasks' 
                size='md' 
                className='w-8/12'
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {data?.filter(todo => 
                todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                todo.description.toLowerCase().includes(searchTerm.toLowerCase())
            ).map((todo: Todo) => (
                todo.completed === 0 ?(
                    <div key={todo.id} className='todo-item mx-auto my-2'>
                        <div className="w-full border border-gray-300 p-2 rounded-md">
                            <div className="grid grid-cols-5 border-b border-gray-300">
                                <h3 className="my-auto col-span-3 text-3xl mb-1">{todo.title}</h3>
                                <div className="col-span-2 grid grid-cols-2 gap-2">
                                    <Button colorScheme='blue' size="sm" onClick={() => {
                                        completeTask(todo.id);
                                        window.location.reload();
                                    }}>Complete</Button>
                                    <Button colorScheme='red' size="sm" onClick={() => {
                                        deleteTask(todo.id);
                                        window.location.reload();
                                    }}>Delete</Button>
                                </div>
                            </div>
                            <p className="mt-4">{todo.description}</p>
                        </div>
                    </div>
                ) : (
                    <div key={todo.id} className='todo-item mx-auto my-2'>
                        <div className="w-full border border-gray-300 p-2 rounded-md">
                            <div className="grid grid-cols-5 border-b border-gray-300">
                                <h3 className="my-auto col-span-4 text-3xl mb-1 line-through text-gray-600">{todo.title}</h3>
                                <Button colorScheme='red' size="sm" onClick={() => {
                                    deleteTask(todo.id);
                                    window.location.reload();
                                }}>Delete</Button>
                            </div>
                            <p className="mt-4 line-through text-gray-600">{todo.description}</p>
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}