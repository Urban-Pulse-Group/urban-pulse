export const authenticatedFetch = async (
    url: string,
    token: string | null,
    options: RequestInit = {}
  ): Promise<Response> => {
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
  