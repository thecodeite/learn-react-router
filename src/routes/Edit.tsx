import type { ActionFunction } from "react-router-dom";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { Contact } from "../contacts";
import { updateContact } from "../contacts";


const action: ActionFunction = async ({ request, params }) => {
  if (!params.contactId) {
    throw new Error("Missing contact ID");
  }

  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData()  as { contact: Contact };
  const navigate = useNavigate();


  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder={ `https://robohash.org/${contact.id}.png?size=200x200&set=set4`}
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button"
        onClick={() => {
          navigate(-1);
        }}
        >Cancel</button>
      </p>
    </Form>
  );
}

EditContact.editAction = action;