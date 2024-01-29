import { render, fireEvent, screen, getByRole, getByTestId } from "@testing-library/react";
import DeliveryFeeInputForm from "../presentation/components/DeliveryFeeInputForm";
import { act } from "react-dom/test-utils";
import moment from "moment";

describe("Check if the input validation works correctly", () => {
    describe("All the inputs are correct", () => {
        it("renders no errors (cart value, delivery distance, number of items are correct + the order time was setting by default)", async () => {
            HTMLCanvasElement.prototype.getContext = jest.fn();
            const mockOnSubmit = jest.fn();
            const { getByTestId } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
            const cartValueInput = getByTestId("cartValue");
            const deliveryDistanceInput = getByTestId("deliveryDistance");
            const numberOfItemsInput = getByTestId("numberOfItems");
            await act(async () => {
                fireEvent.change(cartValueInput, { target: { value: "9" } });
                fireEvent.change(deliveryDistanceInput, { target: { value: "100" } });
                fireEvent.change(numberOfItemsInput, { target: { value: "4" } });
            });
            await act(async () => {
                fireEvent.click(screen.getByText("Calcuate delivery fee"));
            });
            expect(mockOnSubmit).toHaveBeenCalled();
        });
        it("renders no errors, althrough the entered order time has already passed", async () => {
            HTMLCanvasElement.prototype.getContext = jest.fn();
            const mockOnSubmit = jest.fn();
            const { getByTestId } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
            const cartValueInput = getByTestId("cartValue");
            const deliveryDistanceInput = getByTestId("deliveryDistance");
            const numberOfItemsInput = getByTestId("numberOfItems");
            const orderTime = getByTestId("orderTime").querySelector("input")!;
            await act(async () => {
                fireEvent.change(cartValueInput, { target: { value: "9" } });
                fireEvent.change(deliveryDistanceInput, { target: { value: "100" } });
                fireEvent.change(numberOfItemsInput, { target: { value: "4" } });
                fireEvent.change(orderTime, { target: { value: "2023-12-01T15:29" } });
            });
            await act(async () => {
                fireEvent.click(screen.getByText("Calcuate delivery fee"));
            });
            expect(orderTime.value.replace("T", " ")).toMatch(moment(new Date()).format("YYYY-MM-DD HH:mm")); // the date was changed automatically to the current one
            expect(mockOnSubmit).toHaveBeenCalled();
        });
    })
    describe("renders an error, can't get the data", () => {
        describe("One input is incorrect", () => {
            it("cart value is incorrect", async () => {
                HTMLCanvasElement.prototype.getContext = jest.fn();
                const mockOnSubmit = jest.fn();
                const { getByTestId, container } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
                const cartValueInput = getByTestId("cartValue");
                const deliveryDistanceInput = getByTestId("deliveryDistance");
                const numberOfItemsInput = getByTestId("numberOfItems");

                await act(async () => {
                    fireEvent.change(cartValueInput, { target: { value: "ghjj" } }); // incorrect value
                    fireEvent.change(deliveryDistanceInput, { target: { value: "100" } });
                    fireEvent.change(numberOfItemsInput, { target: { value: "4" } });
                });
                await act(async () => {
                    fireEvent.click(screen.getByText("Calcuate delivery fee"));
                });
                expect(container.innerHTML).toMatch("This input is a number only");
                expect(mockOnSubmit).not.toHaveBeenCalled();
            });
            it("delivery distance is incorrect", async () => {
                HTMLCanvasElement.prototype.getContext = jest.fn();
                const mockOnSubmit = jest.fn();
                const { getByTestId, container } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
                const cartValueInput = getByTestId("cartValue");
                const deliveryDistanceInput = getByTestId("deliveryDistance");
                const numberOfItemsInput = getByTestId("numberOfItems");

                await act(async () => {
                    fireEvent.change(cartValueInput, { target: { value: "4" } });
                    fireEvent.change(deliveryDistanceInput, { target: { value: "hffg" } }); // incorrect value
                    fireEvent.change(numberOfItemsInput, { target: { value: "4" } });
                });
                await act(async () => {
                    fireEvent.click(screen.getByText("Calcuate delivery fee"));
                });
                expect(container.innerHTML).toMatch("This input is a whole number only");
                expect(mockOnSubmit).not.toHaveBeenCalled();
            });
            it("number of items is incorrect", async () => {
                HTMLCanvasElement.prototype.getContext = jest.fn();
                const mockOnSubmit = jest.fn();
                const { getByTestId, container } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
                const cartValueInput = getByTestId("cartValue");
                const deliveryDistanceInput = getByTestId("deliveryDistance");
                const numberOfItemsInput = getByTestId("numberOfItems");

                await act(async () => {
                    fireEvent.change(cartValueInput, { target: { value: "4" } }); 
                    fireEvent.change(deliveryDistanceInput, { target: { value: "200" } });
                    fireEvent.change(numberOfItemsInput, { target: { value: "gfd" } }); // incorrect value
                });
                await act(async () => {
                    fireEvent.click(screen.getByText("Calcuate delivery fee"));
                });
                expect(container.innerHTML).toMatch("This input is a whole number only");
                expect(mockOnSubmit).not.toHaveBeenCalled();
            });
        });
        describe("One input is missing", () => {
            it("cart value is missing)", async () => {
                HTMLCanvasElement.prototype.getContext = jest.fn();
                const mockOnSubmit = jest.fn();
                const { getByTestId, container } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
                const cartValueInput = getByTestId("cartValue");
                const deliveryDistanceInput = getByTestId("deliveryDistance");
                const numberOfItemsInput = getByTestId("numberOfItems");
    
                await act(async () => {
                    fireEvent.change(cartValueInput, { target: { value: "" } }); // incorrect value
                    fireEvent.change(deliveryDistanceInput, { target: { value: "100" } });
                    fireEvent.change(numberOfItemsInput, { target: { value: "4" } });
                });
                await act(async () => {
                    fireEvent.click(screen.getByText("Calcuate delivery fee"));
                });
                expect(container.innerHTML).toMatch("This field is required");
                expect(mockOnSubmit).not.toHaveBeenCalled();
            });
            it("delivery distance is missing)", async () => {
                HTMLCanvasElement.prototype.getContext = jest.fn();
                const mockOnSubmit = jest.fn();
                const { getByTestId, container } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
                const cartValueInput = getByTestId("cartValue");
                const deliveryDistanceInput = getByTestId("deliveryDistance");
                const numberOfItemsInput = getByTestId("numberOfItems");
    
                await act(async () => {
                    fireEvent.change(cartValueInput, { target: { value: "4" } }); // incorrect value
                    fireEvent.change(deliveryDistanceInput, { target: { value: "" } });
                    fireEvent.change(numberOfItemsInput, { target: { value: "4" } });
                });
                await act(async () => {
                    fireEvent.click(screen.getByText("Calcuate delivery fee"));
                });
                expect(container.innerHTML).toMatch("This field is required");
                expect(mockOnSubmit).not.toHaveBeenCalled();
            });
            it("number of items is missing", async () => {
                HTMLCanvasElement.prototype.getContext = jest.fn();
                const mockOnSubmit = jest.fn();
                const { getByTestId, container } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
                const cartValueInput = getByTestId("cartValue");
                const deliveryDistanceInput = getByTestId("deliveryDistance");
                const numberOfItemsInput = getByTestId("numberOfItems");
    
                await act(async () => {
                    fireEvent.change(cartValueInput, { target: { value: "4" } }); // incorrect value
                    fireEvent.change(deliveryDistanceInput, { target: { value: "200" } });
                    fireEvent.change(numberOfItemsInput, { target: { value: "" } });
                });
                await act(async () => {
                    fireEvent.click(screen.getByText("Calcuate delivery fee"));
                });
                expect(container.innerHTML).toMatch("This field is required");
                expect(mockOnSubmit).not.toHaveBeenCalled();
            });
            it("order time is missing", async () => {
                HTMLCanvasElement.prototype.getContext = jest.fn();
                const mockOnSubmit = jest.fn();
                const { getByTestId, container } = render(<DeliveryFeeInputForm onUserInputRecieved={mockOnSubmit} />);
                const cartValueInput = getByTestId("cartValue");
                const deliveryDistanceInput = getByTestId("deliveryDistance");
                const numberOfItemsInput = getByTestId("numberOfItems");
                const orderTime = getByTestId("orderTime").querySelector("input")!;
                await act(async () => {
                    fireEvent.change(cartValueInput, { target: { value: "4" } }); // incorrect value
                    fireEvent.change(deliveryDistanceInput, { target: { value: "200" } });
                    fireEvent.change(numberOfItemsInput, { target: { value: "4" } });
                    fireEvent.change(orderTime, { target: { value: "" } });
                });
                await act(async () => {
                    fireEvent.click(screen.getByText("Calcuate delivery fee"));
                });
                expect(container.innerHTML).toMatch("This field is required");
                expect(mockOnSubmit).not.toHaveBeenCalled();
            });
        });
    });

})

