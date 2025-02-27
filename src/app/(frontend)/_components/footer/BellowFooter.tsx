import PaymentOptions from "./PaymentOptions";

const BellowFooter = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:justify-between my-4 pb-10 gap-3">
      <p>Shop.co © 2000-2023, All Rights Reserved</p>
      <PaymentOptions />
    </div>
  );
};

export default BellowFooter;
