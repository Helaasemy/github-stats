import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Summary } from './summary'; // Adjust the path based on your directory structure
import { StatsCard } from '../ui/stats-card'; // Import the StatsCard for the mock

const { expect, describe, it } = require('@jest/globals');

// Mock StatsCard component to simplify the testing process
jest.mock("../ui/stats-card", () => ({
  StatsCard: ({ title, stats }: { title: string; stats: number }) => (
    <div>
      <h3>{title}</h3>
      <p>{stats}</p>
    </div>
  ),
}));

describe("Summary Component", () => {
  it("displays provided stats data", () => {
    const statsData = [
      { title: "Users", stats: 1200 },
      { title: "Projects", stats: 75 },
      { title: "Tasks Completed", stats: 3400 },
      { title: "Teams", stats: 15 },
    ];

    render(<Summary statsData={statsData} />); // Pass statsData as a prop

    // Check if all titles and stats are rendered correctly
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();

    expect(screen.getByText("Tasks Completed")).toBeInTheDocument();
    expect(screen.getByText("3400")).toBeInTheDocument();

    expect(screen.getByText("Teams")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });
});
