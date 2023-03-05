import { useEffect, useRef } from 'react';
import {
    Outlet, useLoaderData, Form, redirect, NavLink, useNavigation,
    LoaderFunctionArgs
 } from 'react-router-dom';

import { ContactInfo, getContacts, createContact } from '../contacts';

export async function action(): Promise<Response> {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader({ request }: LoaderFunctionArgs): Promise<{ contacts: ContactInfo[], q: string | null }> { // eslint-disable-line max-len
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q as string);
    return { contacts, q };
}

export default function Root(): JSX.Element {
    const { contacts, q } = useLoaderData() as { contacts: ContactInfo[], q: string | null };
    const navigation = useNavigation();

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!inputRef.current) {
            return;
        }
        inputRef.current.value = q as string;
    }, [q]);

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                defaultValue={q as string}
                ref={inputRef}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length > 0 ? (
              <ul>
                {contacts.map(contact => (
                  <li key={contact.id}>
                    <NavLink to={`/contacts/${contact.id}`}
                      className={({isActive, isPending}) =>
                        isActive ? 'active' : isPending ? 'pending' : '' }>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No name</i>
                      )}{' '}
                      {contact.favorite && <span>★</span>}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail"
          className={navigation.state === 'loading' ? 'loading' : ''}>
          <Outlet />
        </div>
      </>
    );
  }
