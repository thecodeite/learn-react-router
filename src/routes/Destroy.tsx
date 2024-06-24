import { ActionFunction, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export const destroyAction: ActionFunction = async ({ params }) => {
  if (!params.contactId) {
    throw new Error("Missing contact ID");
  }
  await deleteContact(params.contactId);
  return redirect("/");
};