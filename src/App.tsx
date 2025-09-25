import { useEffect, useState } from "react";

export default function App() {
  const [status, setStatus] = useState<null | { ok: boolean; env: string }>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_SERVER_HEALTHZ || "http://localhost:4000/healthz";
    fetch(url).then(r => r.json()).then(d => setStatus(d)).catch(() => setStatus(null));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background text-foreground">
      <div className="rounded-2xl shadow-lg p-8 bg-muted/40 w-full max-w-xl">
        <h1 className="text-3xl font-semibold mb-2">LeetCode Buddy — Client</h1>
        <p className="opacity-80 mb-6">Vite + React + Tailwind</p>
        <div className="space-y-2 text-sm">
          <div>
            <span className="opacity-70">Server health: </span>
            <span className="font-mono">
              {status ? (status.ok ? `ok (${status.env})` : "down") : "checking..."}
            </span>
          </div>
          <ul className="list-disc pl-5 opacity-80">
            <li>Server default: <code>http://localhost:4000/healthz</code></li>
            <li>Client dev: <code>http://localhost:5173</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}