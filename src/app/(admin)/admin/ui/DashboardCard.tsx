import React from "react";

type DashboardCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  body,
}) => {
  return (
    <div className="flex flex-col justify-center items-start border rounded-lg p-4 gap-4 w-full max-w-md bg-gray-50">
      <h2 className="text-2xl font-bold">{title}</h2>
      <h3 className="text-sm text-gray-500">{subtitle}</h3>
      <p className="text-md text-gray-700">{body}</p>
    </div>
  );
};

export default DashboardCard;
