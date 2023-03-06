import { useEffect, useRef } from 'react';
import {
    Form, useLoaderData, redirect, ActionFunctionArgs, useNavigate
} from 'react-router-dom';

import { ContactModel, updateContact } from '../contacts.service';

export async function action(
    { request, params }: ActionFunctionArgs
): Promise<Response> {
    const formData = await request.formData();
    const updates = Object.fromEntries(
        formData as unknown as Iterable<readonly [PropertyKey, any]>
    );
    const { contactId } = params;
    await updateContact(contactId as string, updates);
    return redirect(`/contacts/${contactId}`);
}

export default function EditContact(): JSX.Element {
  const { contact } = useLoaderData() as { contact: ContactModel };
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form method="post" id="contact-form" ref={formRef} noValidate>
      <p>
        <span>Name</span>
        <input placeholder="First" aria-label="First name" type="text"
          name="first" defaultValue={contact.first}
        />
        <input placeholder="Last" aria-label="Last name" type="text"
          name="last" defaultValue={contact.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input type="text" name="twitter" placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text" name="avatar" defaultValue={contact.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </p>
    </Form>
  );
}
