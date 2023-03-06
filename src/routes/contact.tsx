import { useCallback, FormEvent } from 'react';
import {
    Form, useLoaderData, LoaderFunctionArgs, useFetcher, ActionFunctionArgs
} from 'react-router-dom';

import ContactDisplayName from '../controls/contact-display-name';
import Favorite from '../controls/favorite';

import { ContactInfo, getContact, updateContact } from '../contacts';

export async function loader(
    { params, request, context }: LoaderFunctionArgs
): Promise<{ contact: ContactInfo | null }> {
    const contact = await getContact(params.contactId as string);
    if (!contact) {
        throw new Response('', {
            status: 404,
            statusText: 'Not found'
        });
    }
    return { contact };
}

export async function action(
    { request, params }: ActionFunctionArgs
): Promise<ContactInfo> {
    const formData = await request.formData();
    return updateContact(params.contactId as string, {
        favorite: formData.get('favorite') === 'true',
    });
}

export default function Contact(): JSX.Element {
    const { contact } = useLoaderData() as { contact: ContactInfo };

    const confirmDelete = useCallback((evt: FormEvent<HTMLFormElement>) => {
        if (!confirm('Please confirm you want to delete this record.')) {
            evt.preventDefault();
          }
    }, []);

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar } />
      </div>

      <div>
        <h1>
           <ContactDisplayName contact={contact} />
           <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form method="post" action="destroy"
            onSubmit={confirmDelete}>
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

