import { User } from "@prisma/client";

const CustomersList = ({ customers }: { customers: User[] }) => {
  return (
    <>
      <table className="w-full border m-4">
        <thead className="bg-gray-200">
          <tr className="">
            <th className="py-2 px-4 border-b border-r border-gray-300 text-start">
              ID
            </th>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-start">
              User
            </th>
            <th className="py-2 px-4 border-b border-r border-gray-300 text-start">
              Email
            </th>
            <th className="py-2 px-4 border-b text-start">Member since</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-r">{customer.id}</td>
              <td className="py-2 px-4 border-b border-r">{customer.name}</td>
              <td className="py-2 px-4 border-b border-r">{customer.email}</td>
              <td className="py-2 px-4 border-b">
                {customer.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomersList;
