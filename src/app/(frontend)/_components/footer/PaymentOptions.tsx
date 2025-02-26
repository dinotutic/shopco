import Image from "next/image";
import visa from "@/../public/img/visa.png";
import master from "@/../public/img/master.png";
import paypal from "@/../public/img/paypal.png";
import applepay from "@/../public/img/applepay.png";
import gpay from "@/../public/img/gpay.png";
const PaymentOptions = () => {
  return (
    <div className="flex">
      <Image src={visa} alt="Visa icon" />
      <Image src={master} alt="Mastercard icon" />
      <Image src={paypal} alt="Paypal icon" />
      <Image src={applepay} alt="Apple pay icon" />
      <Image src={gpay} alt="Google pay icon" />
    </div>
  );
};

export default PaymentOptions;
