import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Summary } from './summary'; // Adjust the path based on your directory structure
import '@testing-library/jest-dom';
const { expect, describe, it } = require('@jest/globals');

jest.mock("../ui/stats-card", () => ({
  StatsCard: ({ title, stats }: { title: string; stats: number }) => (
    <div>
      <h3>{title}</h3>
      <p>{stats}</p>
    </div>
  ),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { title: "Users", stats: 1200 },
        { title: "Projects", stats: 75 },
        { title: "Tasks Completed", stats: 3400 },
        { title: "Teams", stats: 15 },
      ]),
  }) as unknown as Promise<Response> 
);

describe("Summary Component", () => {
  it("fetches and displays stats data", async () => {
    render(<Summary />);
    await waitFor(() => expect(screen.getByText("Users")).toBeInTheDocument());
    expect(screen.getByText("1200")).toBeInTheDocument();

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();

    expect(screen.getByText("Tasks Completed")).toBeInTheDocument();
    expect(screen.getByText("3400")).toBeInTheDocument();

    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });
});
