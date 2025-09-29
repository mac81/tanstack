import { HTTPException } from "hono/http-exception";

export async function fetchData<T>(url: string): Promise<T> {
  const delay = Math.floor(Math.random() * 1500) + 500;

  const hasQueryParam = url.includes("?");

  const response = await fetch(
    `${url}${hasQueryParam ? "&" : "?"}delay=${delay}`
  );

  // Randomly throw an error (10% chance)
  if (Math.random() < 0.1) {
    throw new HTTPException(500, { message: "Random simulated error" });
  }

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}

export async function postData<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Randomly throw an error (10% chance)
  if (Math.random() < 0) {
    throw new HTTPException(500, { message: "Random simulated error" });
  }

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
