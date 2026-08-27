import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getThreads } from "../services/threads.service";

export default function ThreadList() {
  const { data: threads = [], isPending, isError, error } = useQuery({
    queryKey: ["threads"],
    queryFn: getThreads
  });

  if (isPending) {
    return <section className="card"><p>Loading threads…</p></section>;
  }

  if (isError) {
    return (
      <section className="card">
        <p className="error">
          Failed to load threads: {error?.message || "Unknown error"}
        </p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="section-heading">
        <h2>Threads</h2>
        <span>{threads.length}</span>
      </div>

      <div className="thread-list">
        {threads.map((thread) => (
          <article className="thread" key={thread.id}>
            <h3>{thread.title}</h3>
            <p>{thread.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}