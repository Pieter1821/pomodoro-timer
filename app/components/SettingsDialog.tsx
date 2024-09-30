"use client "


import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useUser } from "@clerk/nextjs";
import { api } from '@/convex/_generated/api';
import { Settings } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SettingsDialogProps {
  settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  };
}

export const SettingsDialog = ({ settings: initialSettings }: SettingsDialogProps) => {
  const { user } = useUser();
  const updateSettings = useMutation(api.settings.update);
  const [localSettings, setLocalSettings] = useState(initialSettings);
  const [open, setOpen] = useState(false);

  const handleChange = (key: string, value: string) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    updateSettings({ 
      userId: user?.id ?? '', 
      settings: localSettings
    }).then(() => {
      setOpen(false);
    }).catch(error => {
      console.error("Failed to update settings:", error);
     
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Timer Settings</DialogTitle>
          <DialogDescription>Adjust the duration for each mode (in minutes).</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.entries(localSettings).map(([key, value]) => (
            <div key={key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={key} className="text-right">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
              <Input
                id={key}
                type="number"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};