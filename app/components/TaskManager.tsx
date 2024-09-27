"use client"

import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { useUser } from "@clerk/nextjs";
import { api } from '@/convex/_generated/api';
import { Plus, X } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const TaskManager = () => {
  const { user, isLoaded } = useUser();
  const [newTaskName, setNewTaskName] = useState('');

  const tasks = useQuery(api.tasks.get, user?.id ? { userId: user.id } : "skip") || [];
  const addTask = useMutation(api.tasks.add);
  const updateTask = useMutation(api.tasks.update);
  const deleteTask = useMutation(api.tasks.remove);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskName.trim() && user?.id) {
      addTask({ name: newTaskName.trim(), userId: user.id });
      setNewTaskName('');
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to manage tasks.</div>;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>Manage your Pomodoro tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
          <Input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Add a new task"
            className="flex-grow"
          />
          <Button type="submit">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </form>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => updateTask({ id: task._id, completed: !task.completed })}
                className="rounded text-primary focus:ring-primary"
              />
              <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.name}</span>
              <Button variant="ghost" size="sm" onClick={() => deleteTask({ id: task._id })}>
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};