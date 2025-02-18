import React from "react";
import Button from "./Button";
import Loading from "../../../../(frontend)/_components/ui/Loading";
interface FormButtonsProps {
  isEditing: boolean;
  mode: "create" | "edit";
  onDiscard: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  isEditing,
  mode,
  onDiscard,
  handleEdit,
  isLoading,
}) => {
  return (
    <div>
      {isEditing ? (
        <>
          <Button type="submit" isLoading={isLoading}>
            {isLoading && <Loading />}Save Changes
          </Button>
          {mode === "edit" && (
            <Button type="button" isLoading={isLoading} onClick={onDiscard}>
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
