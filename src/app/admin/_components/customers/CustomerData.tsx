import { useState } from "react";
import { DetailParagraph } from "../orders/DetailComponents";
import { User } from "../shared.types";
import { updateCustomer } from "@/db/userQueries";

interface CustomerDataProps {
  customer: User;
}

export const CustomerData = ({ customer }: CustomerDataProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCustomer, setUpdatedCustomer] = useState({
    name: customer.name,
    email: customer.email,
  });
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async () => {
    try {
      await updateCustomer(customer.id, updatedCustomer);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
      window.location.reload();
    }
  };

  return (
    <section className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h2 className="text-xl font-bold mb-4">User Data</h2>
      {isEditing ? (
        <CustomerDataEditing
          updatedCustomer={updatedCustomer}
          setUpdatedCustomer={setUpdatedCustomer}
          handleEdit={handleEdit}
          handleSubmit={handleSubmit}
        />
      ) : (
        <CustomerDataNotEditing customer={customer} handleEdit={handleEdit} />
      )}
    </section>
  );
};

interface CustomerDataNotEditingProps extends CustomerDataProps {
  handleEdit: () => void;
}
const CustomerDataNotEditing = ({
  customer,
  handleEdit,
}: CustomerDataNotEditingProps) => {
  return (
    <>
      <DetailParagraph label="ID" value={customer.id} />
      <DetailParagraph label="Name" value={customer.name} />
      <DetailParagraph label="Email" value={customer.email} />
      <DetailParagraph
        label="Created At"
        value={customer.createdAt.toLocaleDateString()}
      />
      <DetailParagraph
        label="Updated At"
        value={customer.updatedAt.toLocaleDateString()}
      />
      <Button onClick={handleEdit}>Edit</Button>
    </>
  );
};

interface UpdatedCustomer {
  name: string;
  email: string;
}
interface CustomerDataEditingProps {
  updatedCustomer: UpdatedCustomer;
  setUpdatedCustomer: (customer: UpdatedCustomer) => void;
  handleSubmit: () => void;
  handleEdit: () => void;
}

const CustomerDataEditing = ({
  updatedCustomer,
  setUpdatedCustomer,
  handleSubmit,
  handleEdit,
}: CustomerDataEditingProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={updatedCustomer.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={updatedCustomer.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
      >
        Save
      </button>
      <button
        type="button"
        onClick={handleEdit}
        className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-black"
      >
        Cancel
      </button>
    </form>
  );
};

interface ButtonProps {
  onClick: () => void;
  children: string;
}
const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
