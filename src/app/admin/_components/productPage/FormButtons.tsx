import React from "react";
import Button from "./Button";

interface FormButtonsProps {
  isEditing: boolean;
  mode: "create" | "edit";
  onDiscard: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  isEditing,
  mode,
  onDiscard,
  handleEdit,
}) => {
  return (
    <div>
      {isEditing ? (
        <>
          <Button type="submit">Save Changes</Button>
          {mode === "edit" && (
            <Button type="button" onClick={onDiscard}>
              Discard Changes
            </Button>
          )}
        </>
      ) : (
        <Button type="button" onClick={handleEdit}>
          Edit
        </Button>
      )}
    </div>
  );
};

export default FormButtons;
