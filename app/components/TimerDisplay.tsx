import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerDisplayProps {
  time: number;
  isActive: boolean;
  toggleTimer: () => void;
  resetTimer: () => void;
}

export const TimerDisplay = ({ time, isActive, toggleTimer, resetTimer }: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="text-6xl font-bold text-center mb-8 text-gray-700">{formatTime(time)}</div>
      <div className="flex justify-center space-x-4 mb-8">
        <Button onClick={toggleTimer} size="lg">
          {isActive ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </>
  );
};