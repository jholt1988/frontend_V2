
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MaintenanceRequestsList from "./MaintenanceRequestsList";
import { fetchMaintenanceRequests } from "../../services/apiService";

jest.mock("../../services/apiServiceapiService", () => ({
    fetchMaintenanceRequests: jest.fn(),
}));

describe("MaintenanceRequestsList Component", () => {
    test("renders maintenance requests correctly", async () => {
        const mockData = [
            { id: 1, issue: "Leaky faucet", status: "Pending" },
            { id: 2, issue: "Broken heater", status: "In Progress" },
        ];
        fetchMaintenanceRequests.mockResolvedValue(mockData);

        render(<MaintenanceRequestsList />);

        expect(screen.getByText("Loading maintenance requests...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText("Leaky faucet - Pending")).toBeInTheDocument();
            expect(screen.getByText("Broken heater - In Progress")).toBeInTheDocument();
        });
    });

    test("displays an error message on API failure", async () => {
        fetchMaintenanceRequests.mockRejectedValue(new Error("Failed to fetch data"));

        render(<MaintenanceRequestsList />);

        await waitFor(() => {
            expect(screen.getByText("Error: Failed to fetch data")).toBeInTheDocument();
        });
    });
});
