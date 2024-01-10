import PageHeader from "./PageHeader";
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@/utils/tests/setupTests';


describe("PageHeader", () => {
    it("renders", () => {
        render(<PageHeader />);
    });
});
