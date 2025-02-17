import * as React from "react";
import { Student } from "../../utils/interface";
import { getLoginDetailsFromLocalStorage } from "../../utils/services";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataItem: any;
  editField: string;
  add: (dataItem: Student) => void;
  update: (dataItem: Student) => void;
  discard: (dataItem: Student) => void;
  edit: (dataItem: Student) => void;
  remove: (dataItem: Student) => void;
  cancel: (dataItem: Student) => void;
}

export const CommandCell = (props: Props) => {
  const { role } = getLoginDetailsFromLocalStorage();
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.id === undefined;

  return inEdit ? (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command"
        onClick={() =>
          isNewItem ? props.add(dataItem) : props.update(dataItem)
        }
      >
        {isNewItem ? "Add" : "Update"}
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command"
        onClick={() =>
          isNewItem ? props.discard(dataItem) : props.cancel(dataItem)
        }
      >
        {isNewItem ? "Discard" : "Cancel"}
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary k-grid-edit-command"
        onClick={() => props.edit(dataItem)}
        disabled={role !== "admin"}
      >
        Edit
      </button>
      <button
        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command"
        onClick={() =>
          window.confirm("Confirm deleting: " + dataItem.name) &&
          props.remove(dataItem)
        }
        disabled={role !== "admin"}
      >
        Remove
      </button>
    </td>
  );
};
