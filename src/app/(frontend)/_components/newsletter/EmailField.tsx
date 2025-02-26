const EmailField = () => {
  return (
    <div className="flex flex-col items-end gap-2 w-1/3">
      <input
        type="email"
        placeholder="Enter your email"
        className="border rounded-full py-2 w-3/4"
      />
      <button className="text-white border rounded-full py-2 w-3/4">
        Subscribe to Newsletter
      </button>
    </div>
  );
};

export default EmailField;
