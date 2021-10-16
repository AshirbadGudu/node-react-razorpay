import logo from "./logo.svg";
import "./App.css";
const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
function App() {
  const payNow = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) return alert("Razorpay Failed to load");
      const data = await fetch("http://localhost:5337/razorpay", {
        method: "POST",
      }).then((response) => response.json());
      const options = {
        key: "rzp_test_VULKZYu2VDqjkD",
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: "Node React Razorpay",
        description: "Node React Razorpay",
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "Ashirbada",
          email: "Ashirbada@ashirbada.com",
          phone_number: "9899999999",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={payNow} className="btn">
          Pay Now
        </button>
      </header>
    </div>
  );
}

export default App;
