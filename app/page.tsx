"use client"



import  { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { api } from  '../convex/_generated/api';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Plus } from 'lucide-react';
import About from '../app/components/about';
import { TaskManager } from '../app/components/TaskManager';
import { TimerDisplay } from '../app/components/TimerDisplay';
import { SettingsDialog } from '../app/components/SettingsDialog';

const PomodoroTimer = () => {
  const { user, isSignedIn } = useUser();
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [currentMode, setCurrentMode] = useState('pomodoro');
  const [showAbout, setShowAbout] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  type Settings = {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  }

  const settings: Settings = useQuery(api.settings.get, isSignedIn ? { userId: user.id } : 'skip') || {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(settings[currentMode as keyof typeof settings] * 60);
  };

  const changeMode = (mode: string) => {
    setCurrentMode(mode);
    setTime(settings[mode as keyof typeof settings] * 60);
    setIsActive(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 font-sans p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Pomodoro Timer</h1>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          )}
        </div>
        <Tabs defaultValue="pomodoro" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pomodoro" onClick={() => changeMode('pomodoro')}>Pomodoro</TabsTrigger>
            <TabsTrigger value="shortBreak" onClick={() => changeMode('shortBreak')}>Short Break</TabsTrigger>
            <TabsTrigger value="longBreak" onClick={() => changeMode('longBreak')}>Long Break</TabsTrigger>
          </TabsList>
        </Tabs>
        <TimerDisplay
          time={time}
          isActive={isActive}
          toggleTimer={toggleTimer}
          resetTimer={resetTimer}
        />
        <div className="flex justify-between">
          <SettingsDialog settings={settings} />
          <Button variant="outline" onClick={() => setShowAbout(!showAbout)}>
            <Info className="mr-2 h-4 w-4" />
            About
          </Button>
          <Button variant="outline" onClick={() => setShowTasks(!showTasks)}>
            <Plus className="mr-2 h-4 w-4" />
            Tasks
          </Button>
        </div>
        {showAbout && <About />}
        {showTasks && isSignedIn && <TaskManager />}
      </div>
    </div>
  );
};

export default PomodoroTimer;
