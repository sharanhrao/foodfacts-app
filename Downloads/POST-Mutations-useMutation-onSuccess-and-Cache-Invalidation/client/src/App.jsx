import React from "react";
import CreateThreadForm from "./components/CreateThreadForm";
import ThreadList from "./components/ThreadList";

export default function App() {
  return (
    <main className="container">
      <header>
        <p className="eyebrow">Threadbase</p>
        <h1>POST Mutations</h1>
        <p className="subtitle">
          Create a thread, invalidate the cache, and watch the list update.
        </p>
      </header>

      <CreateThreadForm />
      <ThreadList />
    </main>
  );
}