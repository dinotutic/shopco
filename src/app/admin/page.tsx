import DashboardCard from "./ui/Card";
import prisma from "@/db/prisma";

export default async function AdminDashboard() {
  return (
    <>
      <h1 className="">
        <DashboardCard title="1" subtitle="0 Orders" body="0€" />
      </h1>
    </>
  );
}
