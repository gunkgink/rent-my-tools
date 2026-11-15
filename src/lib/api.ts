import "server-only";
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
export async function api<T>(
  path: string,
  token?: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(
      `${process.env.BACKEND_URL || "http://localhost:5000"}/api/v1${path}`,
      {
        method,
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: AbortSignal.timeout(12000),
      },
    );
  } catch {
    throw new ApiError(
      "Could not reach the equipment service. Check the backend and try again.",
      503,
    );
  }
  let data: { success: boolean; data: T; error?: string };
  try {
    data = await response.json();
  } catch {
    throw new ApiError("The service returned an unreadable response.", 502);
  }
  if (!response.ok || !data.success)
    throw new ApiError(
      response.status >= 500
        ? "The service could not complete this action. Check the values and try again."
        : data.error || "This action could not be completed.",
      response.status,
    );
  return data.data;
}
