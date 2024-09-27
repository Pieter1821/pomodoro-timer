
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>About the Pomodoro Technique</CardTitle>
        <CardDescription>Boost your productivity and focus</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo in the late 1980s. The technique uses a timer to
          break down work into intervals, traditionally 25 minutes in length,
          separated by short breaks. These intervals are named pomodoros, the
          plural in English of the Italian word pomodoro (tomato), after the
          tomato-shaped kitchen timer that Cirillo used as a university student.
        </p>
        <p>
          The technique has been widely popularized by dozens of apps and
          websites providing timers and instructions. Closely related to
          concepts such as timeboxing and iterative and incremental development
          used in software design, the method has been adopted in pair
          programming contexts.
        </p>
        <p>
          The technique is based on the idea that frequent breaks can improve
          mental agility. Proponents of the method say that it improves mental
          agility and focus, and that it can help to reduce the anxiety that
          comes from feeling that we have to work continuously.
        </p>
        <h4 className="font-semibold mb-2">
            Benefits for Developers
        </h4>
        <ul className="list-disc list-inside">
          <li>Improves focus and concentration</li>
          <li>Reduces interruptions and distractions</li>
          <li>Increases motivation and productivity</li>
          <li>Helps to manage time more effectively</li>
          <li>Reduces burnout and fatigue</li>
        </ul>

        <p className="mt-4">
            By using this pomodoro-timer , you can easily implement this powerful technique into your workflow.
        </p>
      </CardContent>
    </Card>
  );
}
