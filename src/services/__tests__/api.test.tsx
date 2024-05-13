/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { API } from "../api";
import { SEED_FILE_URL } from "../../constants";
import { afterEach } from "node:test";

function createFetchResponse(data: any) {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
}

function createFetchError() {
  return new Promise((resolve, reject) =>
    reject(new Error("HTTP error! status: 404"))
  );
}

const propertyListResponse = {
  properties: [
    {
      id: 1,
      name: "Beach House",
      price: 1000,
      description: "A beautiful beach house",
      location: "Miami, FL",
      capacity: 10,
      categories: ["house"],
      rooms: 4,
      bathrooms: 3,
      bookedDates: [],
      welcomeMessage:
        "Welcome to the Beach House! Enjoy the sun, sand, and sea.",
      image:
        "https://a0.muscache.com/im/pictures/miso/Hosting-53371567/original/f154c3a2-8d7f-4e3d-8d64-12f3d1591f3c.jpeg?im_w=720",
      secondaryImages: [
        "https://a0.muscache.com/im/pictures/miso/Hosting-53371567/original/1af7cbf4-bfc5-4035-a6f0-91befa2c1ff7.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53371567/original/4581d44b-1d93-4c20-8d97-01835c71d8b4.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53371567/original/4581d44b-1d93-4c20-8d97-01835c71d8b4.jpeg?im_w=720",
        "https://a0.muscache.com/im/pictures/miso/Hosting-53371567/original/34cd5c1d-4712-4bd6-8159-11527ed90734.jpeg?im_w=720",
      ],
    },
  ],
};

describe("ApiService", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it("should fetch data successfully from the API", async () => {
    (fetch as any).mockResolvedValue(createFetchResponse(propertyListResponse));

    const data = await API.get(SEED_FILE_URL);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(propertyListResponse);
  });

  it("should throw an error when the fetch fails", async () => {
    (fetch as any).mockResolvedValue(createFetchError());

    await expect(API.get(SEED_FILE_URL)).rejects.toThrow(
      "HTTP error! status: 404"
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
