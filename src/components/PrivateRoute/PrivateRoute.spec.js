/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import { Button } from "@material-ui/core";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import * as jwtDecode from "jwt-decode";
import PrivateRoute from "./PrivateRoute";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Redirect: ({ to }) => `Redirected to ${to}`,
}));

jest.mock("jwt-decode");

function PrivatePage() {
  return <h1>Hello</h1>;
}

describe("JWT tests", () => {
  it("should redirect to login when accessToken is empty", () => {
    localStorage.setItem("auth-token", "");
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={Button} />
        {" "}
      </MemoryRouter>
    );
    expect(wrapper.exists(Button)).toBe(false);
    expect(wrapper.text().includes("Redirected to /login")).toBe(true);
    localStorage.clear();
  });

  it("should redirect to login when accessToken is invalid", () => {
    localStorage.setItem("auth-token", "someToken");
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={Button} />
        {" "}
      </MemoryRouter>
    );
    expect(wrapper.exists(Button)).toBe(false);
    expect(wrapper.text().includes("Redirected to /login")).toBe(true);
    localStorage.clear();
  });

  it("should allow user to visit private page when the accessToken is valid and user is verified", () => {
    localStorage.setItem("auth-token", "validToken");
    jwtDecode.mockImplementation(() => {
      return {
        role: "ADMIN",
        isVerified: true,
        exp: Date.now().valueOf() + 10000,
        username: "admin",
      };
    });

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={PrivatePage} />
      </MemoryRouter>
    );
    expect(wrapper.exists(PrivatePage)).toBe(true);
    localStorage.clear();
  });

  it("should take user to Login page when the accessToken is expired", () => {
    localStorage.setItem("auth-token", "validToken");
    jwtDecode.mockImplementation(() => {
      return {
        role: "ADMIN",
        isVerified: true,
        exp: Date.now().valueOf() - 100,
        username: "admin",
      };
    });

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={PrivatePage} />
      </MemoryRouter>
    );
    expect(wrapper.exists(PrivatePage)).toBe(false);
    expect(wrapper.text().includes("Redirected to /login")).toBe(true);
    localStorage.clear();
  });

  it("should redirect user to reset-password page when the accessToken is valid but the user is not verified", () => {
    localStorage.setItem("auth-token", "validToken");
    jwtDecode.mockImplementation(() => {
      return {
        role: "ADMIN",
        isVerified: false,
        exp: Date.now().valueOf() + 1000,
        username: "admin",
      };
    });

    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute component={PrivatePage} />
      </MemoryRouter>
    );
    expect(wrapper.exists(PrivatePage)).toBe(false);
    expect(wrapper.text().includes("Redirected to /reset-password")).toBe(true);
    localStorage.clear();
  });
});
