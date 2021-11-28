import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import {rest} from "msw"
import {setupServer} from 'msw/node'
import App from "./App";
import {firstPage} from './tests/mockJson'
import TicketRow from "./components/TicketRow";
import {BrowserRouter as Router} from "react-router-dom"
import TicketDetail from "./components/TicketDetail";
import Home from "./components/Home";
import Error from "./components/Error";

const server = setupServer(
  rest.get('/api/tickets', (req, res, ctx) => {
    return res(ctx.json({greeting: "hello there"}))
    // return res(ctx.json(firstPage))
  }),
)

// establish API mocking before all tests
// beforeAll(() => server.listen())
// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => server.resetHandlers())
// // clean up once the tests are done
// afterAll(() => server.close())

test("App.js: render name of app", () => {
  const { getByText } = render(<App />);
  const header = getByText(/Zendesk Tickets Viewer/i);
  expect(header).toBeInTheDocument();
});

test("TicketRow.js: render content", () => {
  const { getByText } = render(<Router><TicketRow ticket={{id: 1, subject: "test subject"}} /></Router>);
  const content = getByText(/Ticket ID 1: test subject/i);
  expect(content).toBeInTheDocument();
});

test("Error.js: render content", () => {
  const { getByText } = render(<Error errMsg={{message: "test message"}} />);
  const content = getByText(/test message/i);
  expect(content).toBeInTheDocument();
});

// test("Home.js: render content", async() => {
//   const { getByText } = render(<Home />);
//   await waitFor(() => screen.getByRole('p'))

//   expect(screen.getByRole('button')).toHaveTextContent('Prev Page')
//   // expect(screen.getByRole('button')).toBeDisabled()
//   // const content = getByText(/Ticket ID 1: test subject/i);
//   // expect(content).toBeInTheDocument();
// });






