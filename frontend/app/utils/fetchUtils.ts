export const authenticatedFetch = async (
    url: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = localStorage.get("token")
    if (!token) {
      throw new Error("No authentication token provided");
    }
  
    const defaultHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    const fetchOptions: RequestInit = {
      ...options,
      method: options.method ?? "GET", 
      credentials: "include",
      headers: {
        ...defaultHeaders,
        ...options.headers, 
      },
    };
  
    return fetch(url, fetchOptions);
  };
  