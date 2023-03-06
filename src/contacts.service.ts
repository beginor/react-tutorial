import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import sortBy from 'sort-by';

export async function getContacts(query?: string): Promise<ContactInfo[]> {
    await fakeNetwork(`getContacts:${query}`);
    let contacts = await localforage.getItem<ContactInfo[]>('contacts');
    if (!contacts) contacts = [];
    if (query) {
        contacts = matchSorter(contacts, query, { keys: ['first', 'last'] });
    }
    return contacts.sort(sortBy('last', 'createdAt'));
}

export async function createContact(): Promise<ContactInfo> {
    await fakeNetwork('');
    const id = Math.random().toString(36).substring(2, 9);
    const contact = { id, createdAt: Date.now() };
    const contacts = await getContacts('');
    contacts.unshift(contact);
    await set(contacts);
    return contact;
}

export async function getContact(id: string): Promise<ContactInfo | null> {
    await fakeNetwork(`contact:${id}`);
    const contacts = await localforage.getItem('contacts') as ContactInfo[];
    const contact = contacts.find(contact => contact.id === id);
    return contact ?? null;
}

export async function updateContact(id: string, updates: ContactInfo): Promise<ContactInfo> { // eslint-disable-line max-len
    await fakeNetwork('');
    const contacts = await localforage.getItem('contacts') as ContactInfo[];
    const contact = contacts.find(contact => contact.id === id);
    if (!contact) throw new Error('No contact found for ' + id);
    Object.assign(contact, updates);
    await set(contacts);
    return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
    const contacts = await localforage.getItem('contacts') as ContactInfo[];
    const index = contacts.findIndex(contact => contact.id === id);
    if (index > -1) {
        contacts.splice(index, 1);
        await set(contacts);
        return true;
    }
    return false;
}

function set(contacts: ContactInfo[]): Promise<ContactInfo[]> {
    return localforage.setItem('contacts', contacts);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: any } = {};


async function fakeNetwork(key: string): Promise<void> {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise(res => {
        setTimeout(res, Math.random() * 800);
    });
}

export interface ContactInfo {
    id?: string;
    first?: string;
    last?: string;
    avatar?: string;
    twitter?: string;
    notes?: string;
    favorite?: boolean;
    createdAt?: number
}
