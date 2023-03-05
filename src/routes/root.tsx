import {
    Link, Outlet, useLoaderData, Form, redirect, NavLink
 } from 'react-router-dom';

import { ContactInfo, getContacts, createContact } from '../contacts';

export async function action(): Promise<Response> {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export async function loader(): Promise<{ contacts: ContactInfo[] }> {
    const contacts = await getContacts();
    return { contacts };
}

export default function Root(): JSX.Element {
    const { contacts } = useLoaderData() as { contacts: ContactInfo[] };
    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
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
            </form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length > 0 ? (
              <ul>
                {contacts.map(contact => (
                  <li key={contact.id}>
                    <Link to={`/contacts/${contact.id}`}>
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No name</i>
                      )}{' '}
                      {contact.favorite && <span>★</span>}
                    </Link>
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
        <div id="detail">
          <Outlet />
        </div>
      </>
    );
  }
