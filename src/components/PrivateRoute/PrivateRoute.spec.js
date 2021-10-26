import * as React from "react";
import { Button } from "@material-ui/core";
import { mount } from "enzyme";
import { screen } from "@testing-library/react";
import PrivateRoute from "./PrivateRoute";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	Redirect: ({ to }) => `Redirected to ${to}`,
}));

// jest.mock("jwt-decode", () => {
// 	module.exports = (token, options) => {
// 		options = options || {};
// 		var pos = options.header === true ? 0 : 1;
// 		return JSON.parse(base64_url_decode(token.split(".")[pos]));
// 	};
// });

jest.mock("jwt-decode", () => () => ({
	role: "ADMIN",
	isVerified: true,
	exp: Date.now().valueOf() + 1,
	username: "admin",
}));
function TestComponent() {
	return <h1>Hello</h1>;
}

describe("JWT tests", () => {
	it("should redirect to login when accessToken is empty", () => {
		localStorage.setItem("auth-token", "");
		const wrapper = mount(
			<MemoryRouter>
				<PrivateRoute component={Button} />{" "}
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
				<PrivateRoute component={Button} />{" "}
			</MemoryRouter>
		);
		expect(wrapper.exists(Button)).toBe(false);
		expect(wrapper.text().includes("Redirected to /login")).toBe(true);
		localStorage.clear();
	});

	it.only("should redirect to reset password when accessToken is valid", async () => {
		// jest.mock("./PrivateRoute", () => ({
		// 	verify: jest.fn()
		// }));
		// const verify = jest.spyOn(PrivateRoute.prototype, "verify");
		// verify.mockReturnValue({ isTokenValid: true, isUserVerified: true });
		localStorage.setItem("auth-token", "validToken");
		// verify.mockReturnValue({ isTokenValid: true, isUserVerified: true });
		const wrapper = await mount(
			<MemoryRouter>
				<PrivateRoute component={TestComponent} />
			</MemoryRouter>
		);
		screen.debug();
		// expect(wrapper.exists(TestComponent)).toBe(true);
		// expect(wrapper.text().includes(`Redirected to ${path}`)).toBe(true);
		localStorage.clear();
	});
});
