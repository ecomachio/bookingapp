import { BASE_URL } from "../constants";

class ApiService {
  public async get<T>(url?: string): Promise<T> {
    console.log("url", url);

    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const API = new ApiService();
