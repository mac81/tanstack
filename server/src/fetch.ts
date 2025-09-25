export async function fetchData<T>(url: string): Promise<T> {
  const delay = Math.floor(Math.random() * 1500) + 500;

  const urlWithError =
    Math.random() < 0.1 ? "https://dummyjson.com/http/500" : url;

  const hasQueryParam = url.includes("?");

  const response = await fetch(
    `${urlWithError}${hasQueryParam ? "&" : "?"}delay=${delay}`
  );

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

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
