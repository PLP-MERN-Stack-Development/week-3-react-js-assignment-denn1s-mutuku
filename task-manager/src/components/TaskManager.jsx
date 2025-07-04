    // src/components/TaskManager.jsx
    import React, { useState, useEffect } from 'react';
    import { Button } from './ui/button'; // Corrected import path for shadcn/ui Button

    /**
     * Custom hook for managing tasks with localStorage persistence
     */
    const useLocalStorageTasks = () => {
      // Initialize state from localStorage or with empty array
      const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        try {
          return savedTasks ? JSON.parse(savedTasks) : [];
        } catch (error) {
          console.error("Failed to parse tasks from localStorage:", error);
          return []; // Return empty array on parse error
        }
      });

      // Update localStorage when tasks change
      useEffect(() => {
        try {
          localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
          console.error("Failed to save tasks to localStorage:", error);
        }
      }, [tasks]);

      // Add a new task
      const addTask = (text) => {
        if (text.trim()) {
          setTasks([
            ...tasks,
            {
              id: Date.now(),
              text,
              completed: false,
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      };

      // Toggle task completion status
      const toggleTask = (id) => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          )
        );
      };

      // Delete a task
      const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
      };

      return { tasks, addTask, toggleTask, deleteTask };
    };

    /**
     * TaskManager component for managing tasks
     */
    const TaskManager = () => {
      const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
      const [newTaskText, setNewTaskText] = useState('');
      const [filter, setFilter] = useState('all');

      // Filter tasks based on selected filter
      const filteredTasks = tasks.filter((task) => {
        if (filter === 'all') return true;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true; // Fallback for 'all'
      });

      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        addTask(newTaskText);
        setNewTaskText('');
      };

      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Task Manager</h2>

          {/* Task input form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a new task..."
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />
              <Button type="submit" variant="default">
                Add Task
              </Button>
            </div>
          </form>

          {/* Filter buttons */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={filter === 'all' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'active' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilter('active')}
            >
              Active
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setFilter('completed')}
            >
              Completed
            </Button>
          </div>

          {/* Task list */}
          <ul className="space-y-2">
            {filteredTasks.length === 0 ? (
              <li className="text-gray-500 dark:text-gray-400 text-center py-4">
                No tasks found
              </li>
            ) : (
              filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <span
                      className={`${
                        task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    aria-label="Delete task"
                  >
                    Delete
                  </Button>
                </li>
              ))
            )}
          </ul>

          {/* Task stats */}
          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>
              {tasks.filter((task) => !task.completed).length} tasks remaining
            </p>
          </div>
        </div>
      );
    };

    export default TaskManager;
    