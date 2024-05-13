import { SEED_FILE_URL } from "../constants";

class ApiService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async get<T>(_url?: string): Promise<T> {
    const response = await fetch(SEED_FILE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export const API = new ApiService();
