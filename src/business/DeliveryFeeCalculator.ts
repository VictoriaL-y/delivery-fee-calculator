import moment from "moment";
export class DeliveryFeeCalculator {

    public calculateDeliveryFee(cartValue: number, deliveryDistance: number, numberOfItems: number, orderTime: Date): number {
        if (cartValue >= 200) return 0 // there's no delivery fee

        const deliveryFee =
            (this.getCartValueSurcharge(cartValue)
                + this.getDistanceSurcharge(deliveryDistance)
                + this.getItemsAmountSurcharge(numberOfItems)
            ) * this.getTimeSurcharge(orderTime);

        if (deliveryFee > 15) return 15 // the delivery fee can never be more than 15€
        return Number.parseFloat(deliveryFee.toFixed(2));
    }

    private getCartValueSurcharge(cartValue: number) {
        let cartValueSurcharge = 0;
        if (cartValue < 10) cartValueSurcharge = 10 - cartValue;
        console.log("the cart surcharge is " + cartValueSurcharge + "€");
        return cartValueSurcharge;
    }

    private getDistanceSurcharge(deliveryDistance: number): number {
        let distanceSurcharge = 2;
        if (deliveryDistance > 1000) distanceSurcharge = Math.ceil(deliveryDistance / 500);
        console.log("the distance surcharge is " + distanceSurcharge + "€");
        return distanceSurcharge;
    }

    private getItemsAmountSurcharge(numberOfItems: number): number {
        let numberOfItemsSurcharge = 0;
        if (numberOfItems >= 5) numberOfItemsSurcharge = (numberOfItems - 4) * 0.5;
        if (numberOfItems > 12) numberOfItemsSurcharge += 1.2; // an extra "bulk" fee
        console.log("the items surcharge is " + numberOfItemsSurcharge + "€");
        return numberOfItemsSurcharge;
    }

    private getTimeSurcharge(orderTime: Date): number {
        let orderTimeSurcharge = 1;
        if (moment(orderTime).format('dddd') === "Friday") {
            const hours = Number.parseInt(moment(orderTime).format("HH"));
            if (hours >= 15 && hours <= 19) orderTimeSurcharge = 1.2;
        };
        console.log("the time surcharge is " + orderTimeSurcharge + "x");
        return orderTimeSurcharge;
    }
}