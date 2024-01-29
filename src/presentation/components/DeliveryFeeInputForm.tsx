import { TDeliveryFeeInput, TUserInputCallback } from "../../models/types";
import { useForm } from "react-hook-form";
import { DateTimePicker } from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { Controller } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "../styles/DeliveryFeeInputForm.css";

export default function DeliveryFeeInputForm({ onUserInputRecieved }: TUserInputCallback) {

    const {
        register,
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<TDeliveryFeeInput>();

    const onCalculateButtonClicked = (data: TDeliveryFeeInput) => {
        console.log("got the data from the delivery fee form");
        onUserInputRecieved(data);
    };

    return (
        <form onSubmit={handleSubmit(onCalculateButtonClicked)} data-testid="form">
            <label htmlFor="cartValue"><FontAwesomeIcon icon={faCartShopping} /> Cart Value (€)</label>
            <input {...register("cartValue", {
                required: "This field is required",
                pattern: {
                    value: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
                    message: "This input is a number only"
                }
            })}
                id="cartValue"
                data-testid="cartValue"
                placeholder="Enter the amount, e.g. 20"
            />
            {errors["cartValue"] && <p data-testid="error-cartValue" className="error">{errors["cartValue"].message}</p>}

            <label htmlFor="deliveryDistance"><FontAwesomeIcon icon={faRoute} /> Delivery distance (m)</label>
            <input {...register("deliveryDistance", {
                required: "This field is required",
                pattern: {
                    value: /^[0-9]*$/,
                    message: "This input is a whole number only"
                }
            })}
                id="deliveryDistance"
                data-testid="deliveryDistance"
                placeholder="Enter the distance, e.g. 900"
            />
            {errors["deliveryDistance"] && <p data-testid="error-deliveryDistance" className="error">{errors["deliveryDistance"].message}</p>}

            <label htmlFor="numberOfItems"><FontAwesomeIcon icon={faList} /> Amount of items</label>
            <input {...register("numberOfItems", {
                required: "This field is required",
                pattern: {
                    value: /^[0-9]*$/,
                    message: "This input is a whole number only"
                }
            })}
                id="numberOfItems"
                data-testid="numberOfItems"
                placeholder="Enter the amount, e.g. 1"
            />
            {errors["numberOfItems"] && <p data-testid="error-numberOfItems" className="error">{errors["numberOfItems"].message}</p>}

            <label htmlFor="orderTime"><FontAwesomeIcon icon={faClock} /> Time</label>
            <Controller
                name={"orderTime"}
                control={control}
                defaultValue={new Date()}
                rules={{
                    required: "This field is required",
                }}
                render={({ field: { onChange, value } }) => {
                    return (
                        <DateTimePicker
                            data-testid={"orderTime"}
                            onChange={onChange}
                            value={value} format="dd-MM-y hh:mm a"
                            minDate={new Date()}
                            disableClock={true}
                        />
                    );
                }}
            />
            {errors["orderTime"] && <p data-testid="error-orderTime" className="error">{errors["orderTime"].message}</p>}
            <input data-testid="submit" type="submit" value="Calcuate delivery fee" onClick={() => {
                // if user entered into the input field a date, that has already passed
                if (getValues("orderTime") !== null && getValues("orderTime") < new Date()) {
                    setValue("orderTime", new Date());
                }
            }} />
        </form>
    );
}