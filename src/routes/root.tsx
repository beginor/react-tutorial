import { useEffect, useRef } from 'react';
import {
    Outlet, useLoaderData, Form, redirect, NavLink, useNavigation,
    LoaderFunctionArgs, useSubmit
 } from 'react-router-dom';

 import ContactDisplayName from '../controls/contact-display-name';

import { ContactModel, getContacts, createContact } from '../contacts.service';

export async function action(): Promise<Response> {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader(
    { request }: LoaderFunctionArgs
): Promise<{ contacts: ContactModel[], q: string | null }> {
    const url = new URL(request.url);
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q as string);
    return { contacts, q };
}

export default function Root(): JSX.Element {
    const { contacts, q } = useLoaderData() as { contacts: ContactModel[], q: string | null };
    const navigation = useNavigation();
    const submit = useSubmit();

    const inputRef = useRef<HTMLInputElement>(null);

    const searching = navigation.location && new URLSearchParams(
        navigation.location.search
    ).has('q');

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
              <input id="q" className={searching ? 'loading' : ''}
                aria-label="Search contacts" placeholder="Search"
                type="search" name="q" defaultValue={q as string}
                ref={inputRef}
                onChange={(e) => {
                    const isFirstSearch = q == null;
                    submit(e.currentTarget.form, { replace: !isFirstSearch });
                }}
              />
              <div id="search-spinner" aria-hidden hidden={!searching} />
              <div className="sr-only" aria-live="polite"></div>
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
                      <ContactDisplayName contact={contact} />
                      {' '}
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
        <div className={navigation.state === 'loading' ? 'loading' : ''}
          id="detail" >
          <Outlet />
        </div>
      </>
    );
  }
