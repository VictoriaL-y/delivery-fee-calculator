import "../styles/DeliveryFeeDisplay.css";

export default function DeliveryFeeDisplay({ fee }: { fee: number }) {
    console.log("the delivery fee is " + fee + "€");
    return (<div className="delivery-fee-display-wrapper"><p className="delivery-fee-display" data-testid="fee">Total: {fee}€</p></div>)
}