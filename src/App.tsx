import { useState } from 'react';
import { TDeliveryFeeInput } from "./models/types";
import DeliveryFeeInputForm from "./presentation/components/DeliveryFeeInputForm";
import DeliveryFeeDisplay from "./presentation/components/DeliveryFeeDisplay";
import { DeliveryFeeCalculator } from './business/DeliveryFeeCalculator';
import './App.css';

function App() {

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  // a call back method to send user input data (json format) from the DeliveryFeeInputForm to the CalculateDeliveryFee method
  const onUserInputRecieved = (data: TDeliveryFeeInput): void => {
    setDeliveryFee(new DeliveryFeeCalculator().calculateDeliveryFee(data.cartValue, data.deliveryDistance, data.numberOfItems, data.orderTime));
    console.log("got the delivery fee");
  }

  return (
    <div className="App">
      <div className="calculator-container" data-testid="calculator-container">
        <header className="header" data-testid="header">
          Delivery Fee Calculator
        </header>
        <DeliveryFeeInputForm onUserInputRecieved={onUserInputRecieved} />
        <DeliveryFeeDisplay fee={deliveryFee} />
      </div>
    </div>
  );
}

export default App;
