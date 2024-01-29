import { render } from "@testing-library/react";
import DeliveryFeeDisplay from "../presentation/components/DeliveryFeeDisplay";

describe(DeliveryFeeDisplay, () => {
    it("displays correct initial value", () => {
        const { getByTestId } = render(<DeliveryFeeDisplay fee={0}/>)
        const feeValue = getByTestId("fee").textContent;
        expect(feeValue).toEqual("Total: 0€");
    })
})