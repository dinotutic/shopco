import React from "react";

interface TimestampProps {
  label: string;
  date: Date;
}

const Timestamp: React.FC<TimestampProps> = ({ label, date }) => {
  return (
    <p className="text-gray-500">
      {label}: {date.toLocaleString("de-de")}
    </p>
  );
};

export default Timestamp;
