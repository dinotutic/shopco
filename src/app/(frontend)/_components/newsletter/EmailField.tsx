import mailbox_icon from "@/../public/svg/mailbox_icon.svg";
import Image from "next/image";

const SearchBar = () => {
  return (
    <form className="w-full md:w-1/3 flex flex-col gap-3 justify-center min-w-60">
      <div className="email-bar w-full flex items-center justify-center bg-white rounded-full py-3">
        <Image src={mailbox_icon} className="ml-4" alt="Mailbox icon" />
        <input
          type="text"
          placeholder="Enter your email address"
          className="flex-grow mx-4 outline-none"
        />
      </div>
      <button
        type="submit"
        className="bg-white font-satoshiMedium rounded-full py-3 w-full"
      >
        Subscribe to Newsletter
      </button>
    </form>
  );
};

export default SearchBar;
