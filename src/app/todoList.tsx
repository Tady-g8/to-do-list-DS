import { getData, deleteTask, completeTask } from "./actions"
import { Button, Input } from '@chakra-ui/react'
import LoadingCircle from "./spinner";
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

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
        return <div className="w-10/12 mx-auto">
            <LoadingCircle />
        </div>;
    }

    if (!data || data.length === 0) {
        return (
            <div className="w-10/12 mx-auto text-center py-12">
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                    <svg 
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                        />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks found</h3>
                    <p className="mt-2 text-gray-500">Get started by creating your first task!</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='todo-list w-10/12 mx-auto'>

            <Input 
                placeholder='Search tasks' 
                size='md' 
                className='w-8/12'
                onChange={(e) => setSearchTerm(e.target.value)}
                border="1px solid gray"
                focusBorderColor='green.600'
            />

            {data?.filter(todo => todo.completed === 0).filter(todo => 
                todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                todo.description.toLowerCase().includes(searchTerm.toLowerCase())
            ).sort((a, b) => b.id - a.id).map((todo: Todo, index) => (
                <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className='todo-item mx-auto my-2'
                >
                    <div key={todo.id} className='todo-item mx-auto my-2'>
                        <div className="w-full border border-gray-300 p-2 rounded-md">
                            <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 border-b border-gray-300">
                                <h3 className="my-auto col-span-3 md:col-span-4 lg:col-span-5 text-3xl mb-1">{todo.title}</h3>
                                <div className="col-span-2 grid grid-cols-2 gap-2">
                                    <Button colorScheme="green" size="sm" variant="outline" onClick={() => {
                                        completeTask(todo.id);
                                        window.location.reload();
                                    }}><CheckIcon /></Button>
                                    <Button colorScheme='red' size="sm" variant="outline" onClick={() => {
                                        deleteTask(todo.id);
                                        window.location.reload();
                                    }}><CloseIcon /></Button>
                                </div>
                            </div>
                            <p className="mt-4">{todo.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}

            {data?.filter(todo => todo.completed === 1).filter(todo => 
                todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                todo.description.toLowerCase().includes(searchTerm.toLowerCase())
            ).sort((a, b) => b.id - a.id).map((todo: Todo, index) => (
                <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className='todo-item mx-auto my-2'
                >
                    <div key={todo.id} className='todo-item mx-auto my-2'>
                        <div className="w-full border border-gray-300 p-2 rounded-md">
                            <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-7 border-b border-gray-300">
                                <h3 className="my-auto col-span-3 md:col-span-4 lg:col-span-5 text-3xl mb-1 line-through text-gray-700">{todo.title}</h3>
                                <span className="col-span-2 grid grid-cols-2 gap-2">
                                    <span></span>
                                    <Button colorScheme='red' size="sm" variant="outline" onClick={() => {
                                        deleteTask(todo.id);
                                        window.location.reload();
                                    }}><CloseIcon /></Button>
                                </span>
                            </div>
                            <p className="mt-4 line-through text-gray-600">{todo.description}</p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}


