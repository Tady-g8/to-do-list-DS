import { getData } from "./actions"
import { Button } from '@chakra-ui/react'

import { useEffect, useState } from 'react';

export default function TodoList() {
    interface Todo {
        id: number;
        title: string;
        description: string;
    }

    const [data, setData] = useState<Todo[] | null>(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getData();
                const todos: Todo[] = result.map((item) => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='todo-list w-8/12 mx-auto'>
            {data?.map((todo: Todo) => (
                <div key={todo.id} className='todo-item mx-auto my-2 p-2 grid grid-cols-5 gap-4'>
                    <div className="col-span-3 border border-gray-300 p-2 rounded-md">
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                    </div>
                    <Button colorScheme='blue'>Complete</Button>
                    <Button colorScheme='red'>Delete</Button>
                </div>
            ))}
        </div>
    );
}

/*
    <ul>
        {data?.map((todo: { id: number; title: string }) => (
            <li key={todo.id}>{todo.title}</li>
        ))}
    </ul>
*/