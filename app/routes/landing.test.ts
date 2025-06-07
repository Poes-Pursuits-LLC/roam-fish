import { createRoutesStub } from "react-router";
import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LandingPage from "./landing";
import { test } from "vitest";

test("LoginForm renders error messages", async () => {
const Stub = createRoutesStub([
    {
      path: "/",
      Component: LandingPage,
      loader: () => ({
        getDestinationsPromise: Promise.resolve([]),
        userId: null,
      }),
    },
  ]);

  render(<Stub initialEntries={["/"]} />);

  userEvent.click(screen.getByText("Login"));
  await waitFor(() => screen.findByText("Login"));
});
