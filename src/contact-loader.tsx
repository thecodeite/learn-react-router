import { ActionFunction, Params } from "react-router-dom";
import { getContact, updateContact } from "./contacts";

export async function contactLoader({ params }: { params: Params<string>; }) {
  if (!params.contactId) {
    throw new Error("Missing contact ID");
  }
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}


export const updateContactAction: ActionFunction = async ({ request, params }) => {
  if (!params.contactId) {
    throw new Error("Missing contact ID");
  }
  
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}