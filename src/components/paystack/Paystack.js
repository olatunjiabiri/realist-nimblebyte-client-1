import React, { useState } from "react";
import "./Paystack.css";
// import { usePaystackPayment } from "react-paystack";
import PaystackPop from "@paystack/inline-js";


const Paystack = () => {
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [email, setEmail] = useState("");

	const PayWithPayStack = (e) => {
		e.preventDefault()
		const paystack = new PaystackPop()
		paystack.newTransaction({
			key: "pk_test_6970b3ab22034b9a72ff64c8ffd57e9df76ecb4a",
			name,
			amount: amount * 100,
			email,
			onSuccess(transaction){
				let message= `Payment Complete! Reference ${transaction.reference}`
				alert(message);
				setName("");
				setEmail("");
				setAmount("");
				window.location.href = "http://localhost:3000/";
			},
			onCancel(){
				alert("You have canceled the transaction!")
			}
		});
	};








	// Setting config object to a state to dynamically capture info from Form
	// const [config, setConfig] = useState({
	// 	name: "",
	// 	email: "",
	// 	amount: amount * 100,  // Amount in Naira (displayed to the user)
	// 	publicKey: "pk_test_6970b3ab22034b9a72ff64c8ffd57e9df76ecb4a",
	// });

	// First initialization of the Library
	// const initializePayment = usePaystackPayment({
	// 	name: "",
	//  	email: "",
	//  	amount: amount * 100,  // Amount in Naira (displayed to the user)
	// 	publicKey: "pk_test_6970b3ab22034b9a72ff64c8ffd57e9df76ecb4a",
	// });

	// Callback if transaction is successful
	// const onSuccess = () => {
	// 	alert("Payment Successful, check your email for confirmation!");

		// Redirect to a success page or any other URL after payment
//		 window.location.href = "http://localhost:3000/"; 
//	};

	// Callback if payment gateway is closed
	// const onClose = () => {
	// 	alert("Oops, Payment not completed!");
	// };

	// const handleChange = (e) => {
	// 	const { name, value } = e.target;
	
		// Convert the input amount from Naira to Kobo (multiply by 100) for payment
	//	const amountKobo = parseFloat(value) * 100;
	
	// 	setConfig((prevConfig) => ({
	// 	  ...prevConfig,
	// 	  [name]: value,
	// 	  amountNaira: value, // Update the displayed amount
	// 	  amountKobo, // Update the amount in Kobo
	// 	}));
	//   };

	// const handleChange = (e) => {
	// 	const valueName = e.target.name;
	// 	const value = e.target.value;
	// 	setConfig({ ...config, [valueName]: value });
	// 	//console.log(config);
	// };

	// const handleSubmit = (e) => {
	// 	e.preventDefault();

	// 	// Trigger Payment Gateway on Form Submit
	// 	initializePayment(onSuccess, onClose);
	// };

	return (
		<>
			<div className="my-header text-center">
				<h5>Paystack in Realist App</h5>
			</div>
			<div className="container">
				<div className="row mt-5">
					<div className="col-sm-4 mx-auto my-form text-center">
						<form>
							<div className="mb-3">
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Enter Name"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="email"
									id="email"
									name="email"
									placeholder="Enter Email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="mb-3">
								<input
									type="tel"
									id="amount"
									name="amount"
									placeholder="Enter Amount (in Naira)"
									required
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
								/>
							</div>
							<div>
								<button type="submit" onClick={PayWithPayStack}>Pay Now</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Paystack;