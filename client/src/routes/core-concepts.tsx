import { BackButton } from "@/components/back-button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/core-concepts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="pt-24 space-y-4  p-6 rounded-lg">
      <BackButton />
      <h2 className="text-2xl font-bold">Core concepts</h2>

      <div>
        <h3 className="text-lg font-bold">1. What are side effects?</h3>
        <p>
          In React, a side effect is any operation that affects something
          outside the scope of the current component function. These are
          operations that don't directly relate to rendering the UI but are
          necessary for your application to function properly.
        </p>
        <h4 className="text-md font-bold mt-4 mb-2">
          Common Examples of Side Effects:
        </h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Data fetching (API calls, database queries)</li>
          <li>
            Setting up subscriptions (WebSocket connections, event listeners)
          </li>
          <li>Manually changing the DOM (focusing elements, scrolling)</li>
          <li>Timers (setTimeout, setInterval)</li>
          <li>Logging or analytics</li>
          <li>Updating document title</li>
          <li>Local storage operations</li>
        </ul>

        <h4 className="text-md font-bold mt-4 mb-2">
          Why Side Effects Matter in React
        </h4>
        <p>
          React components should be pure functions when it comes to rendering -
          given the same props and state, they should always render the same
          output. Side effects break this purity because they can:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-4 mb-2">
          <li>Cause unpredictable behavior</li>
          <li>Make components harder to test</li>
          <li>Lead to memory leaks if not cleaned up properly</li>
        </ol>

        <p>React provides the useEffect hook to handle side effects properly</p>
      </div>

      <div>
        <h3 className="text-lg font-bold">2. What are Mutations?</h3>
        <p>
          In React, a mutation refers to directly modifying or changing an
          existing object, array, or other data structure rather than creating a
          new one. This is a critical concept because React relies on
          immutability for efficient rendering and state management.
        </p>

        <h4 className="text-md font-bold mt-4 mb-2">
          Why Mutations are Problematic in React
        </h4>
        <p>
          React uses reference equality checks to determine when components
          should re-render. If you mutate an object directly, the reference
          stays the same, so React thinks nothing has changed and won't trigger
          a re-render.
        </p>

        <h4 className="text-md font-bold mt-4 mb-2">The Immutable Approach</h4>
        <p>
          Instead of mutating, create new objects/arrays with the desired
          changes
        </p>
      </div>
    </div>
  );
}
