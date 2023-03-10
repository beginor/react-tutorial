import { useCallback, FormEvent } from 'react';
import {
    Form, useLoaderData, LoaderFunctionArgs, useFetcher, ActionFunctionArgs
} from 'react-router-dom';

import ContactDisplayName from './controls/contact-display-name';
import Favorite from './controls/favorite';

import { ContactModel, getContact, updateContact } from './contacts.service';

export async function loader(
    { params, request, context }: LoaderFunctionArgs
): Promise<LoaderDataType> {
    const contact = await getContact(params.contactId as string);
    if (!contact) {
        throw new Response('', {
            status: 404,
            statusText: 'Not found'
        });
    }
    return { model: contact };
}

export interface LoaderDataType {
    model: ContactModel;
}

export default function Contact(): JSX.Element {
    const { model } = useLoaderData() as LoaderDataType;

    const confirmDelete = useCallback((evt: FormEvent<HTMLFormElement>) => {
        if (!confirm('Please confirm you want to delete this record.')) {
            evt.preventDefault();
          }
    }, []);

  return (
    <div id="contact">
      <div>
        <img key={model.avatar} src={model.avatar } />
      </div>

      <div>
        <h1>
           <ContactDisplayName contact={model} />
           <Favorite contact={model} />
        </h1>

        {model.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${model.twitter}`}>
              {model.twitter}
            </a>
          </p>
        )}

        {model.notes && <p>{model.notes}</p>}

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

