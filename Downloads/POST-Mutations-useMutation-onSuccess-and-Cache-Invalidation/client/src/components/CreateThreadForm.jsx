import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createThread } from "../services/threads.service";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createThread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
      setTitle("");
      setBody("");
    }
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({ title, body });
  }

  return (
    <section className="card">
      <h2>Post a thread</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Thread title"
          />
        </label>

        <label>
          Body
          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="What's on your mind?"
            rows="5"
          />
        </label>

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Posting…" : "Post thread"}
        </button>

        {mutation.isError && (
          <p className="error" role="alert">
            {mutation.error?.response?.data?.message ||
              mutation.error?.message ||
              "Something went wrong."}
          </p>
        )}
      </form>
    </section>
  );
}