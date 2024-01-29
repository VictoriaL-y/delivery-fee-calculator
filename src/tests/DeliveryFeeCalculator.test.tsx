import { DeliveryFeeCalculator } from "../business/DeliveryFeeCalculator";

describe("Check if the fee calculation is correct ", () => {
    //check the delivery distance surcharge
    it("calculates a standart distance surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(10, 100, 1, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(2); // delivery distance fee is mininmum 2€
    });
    it("calculates a distance (1499m) surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(10, 1499, 1, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(3);
    });
    it("calculates a distance (1500m) surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(10, 1500, 1, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(3);
    });
    it("calculates a distance (1501m) surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(10, 1501, 1, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(4);
    });
    //check the cart value surcharge
    it("calculates a cart + standart distance surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(1.5, 100, 4, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(10.5);
    })
    it("calculates a 0 surcharge because of the cart value", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(200, 100, 9, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(0); // no surcharge because the cart value >= 200
    })
    // check the number of items surcharge
    it("calculates an items + standart distance surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(10, 100, 5, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(2.5);
    });
    it("calculates an items + standart distance surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(10, 100, 10, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(5);
    });
    it("calculates an items + standart distance surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(10, 100, 13, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(7.7); // the extra "bulk" (1,20€) fee for more than 12 is included
    });
    // check that the surgarge is not higher than 15
    it("calculates the highest surcharge", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(1, 8000, 30, new Date("Sat Jan 27 2024 18:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(15);
    });
    // if friday rush
    it("multiplies the surcharge by 1.2", () => {
        const feeValue =  new DeliveryFeeCalculator().calculateDeliveryFee(1, 500, 4, new Date("Fri Feb 02 2024 15:57:34 GMT+0100 (Central European Standard Time)"))
        expect(feeValue).toEqual(13.2);
    });
})