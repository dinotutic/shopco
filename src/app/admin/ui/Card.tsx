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
    <div className="flex justify-center items-start flex-col border rounded-xl p-4 gap-4 w-1/3">
      <h2 className="text-2xl inline-block">{title}</h2>
      <h3 className="text-sm inline-block text-gray-500">{subtitle}</h3>
      <p className="text-md inline-block">{body}</p>
    </div>
  );
};

export default DashboardCard;
