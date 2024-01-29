export type TDeliveryFeeInput = {
    "cartValue": number;
    "deliveryDistance": number;
    "numberOfItems": number;
    "orderTime": Date;
}

export type TUserInputCallback = {
    onUserInputRecieved: (data: TDeliveryFeeInput) => void;
}