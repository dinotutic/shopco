type CustomersListProps = {
  users: {
    id: number;

    email: string;

    password: string;

    name: string;

    createdAt: Date;

    updatedAt: Date;
  }[];
};
const CustomersList = ({ users }: CustomersListProps) => {
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
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-r">{user.id}</td>
              <td className="py-2 px-4 border-b border-r">{user.name}</td>
              <td className="py-2 px-4 border-b border-r">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {user.createdAt.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CustomersList;
