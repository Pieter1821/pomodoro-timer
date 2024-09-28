import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function About() {
  return (
    <Card className="mt-8 mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl">About the Pomodoro Technique</CardTitle>
        <CardDescription className="text-base sm:text-lg">Boost your productivity and focus</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section aria-labelledby="what-is-pomodoro">
          <h2 id="what-is-pomodoro" className="text-xl font-semibold mb-2">What is the Pomodoro Technique?</h2>
          <p className="text-sm sm:text-base">
            The Pomodoro Technique is a time management method developed by
            Francesco Cirillo in the late 1980s. It uses a timer to break down work into
            intervals, traditionally 25 minutes in length, separated by short breaks.
            These intervals are named pomodoros, after the tomato-shaped kitchen timer
            that Cirillo used as a university student.
          </p>
        </section>

        <section aria-labelledby="popularity-adoption">
          <h2 id="popularity-adoption" className="text-xl font-semibold mb-2">Popularity and Adoption</h2>
          <p className="text-sm sm:text-base">
            The technique has been widely popularized by dozens of apps and
            websites providing timers and instructions. Its closely related to
            concepts such as timeboxing and iterative and incremental development
            used in software design, and has been adopted in pair programming contexts.
          </p>
        </section>

        <section aria-labelledby="core-principles">
          <h2 id="core-principles" className="text-xl font-semibold mb-2">Core Principles</h2>
          <p className="text-sm sm:text-base">
            The technique is based on the idea that frequent breaks can improve
            mental agility. Proponents say it enhances focus and reduces the anxiety
            that comes from feeling we have to work continuously.
          </p>
        </section>

        <section aria-labelledby="benefits-for-developers">
          <h2 id="benefits-for-developers" className="text-xl font-semibold mb-2">Benefits for Developers</h2>
          <ul className="list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
            <li>Improves focus and concentration</li>
            <li>Reduces interruptions and distractions</li>
            <li>Increases motivation and productivity</li>
            <li>Helps to manage time more effectively</li>
            <li>Reduces burnout and fatigue</li>
          </ul>
        </section>

        <p className="mt-6 text-center font-medium text-sm sm:text-base">
          Start using our Pomodoro timer to implement this powerful technique in your workflow!
        </p>
      </CardContent>
    </Card>
  )
}