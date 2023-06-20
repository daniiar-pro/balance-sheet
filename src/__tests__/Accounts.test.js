import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import App from "../App";

jest.mock("axios");

describe("Accounts", () => {
  const mockAccounts = [
    {
      id: 1,
      name: "Account 1",
      currency: "USD",
      profitLoss: 1000,
      accountType: "Savings",
    },
    {
      id: 2,
      name: "Account 2",
      currency: "EUR",
      profitLoss: -500,
      accountType: "Checking",
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockAccounts });
  });

  it("renders the table with accounts data", async () => {
    const { getByText } = render(<App />);

    // Wait for the data to be loaded and rendering to complete
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    await waitFor(() => {
      // Check table headers
      expect(getByText("Name")).toBeInTheDocument();
      expect(getByText("Profit & Loss")).toBeInTheDocument();
      expect(getByText("Account Type")).toBeInTheDocument();

      // Check account data
      expect(getByText("Account 1")).toBeInTheDocument();
      expect(getByText("USD 1000")).toBeInTheDocument();
      
      expect(getByText("Account 2")).toBeInTheDocument();
      expect(getByText("EUR -500")).toBeInTheDocument();
     
    });
  });
});

