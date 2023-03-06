import { ContactInfo } from 'src/contacts';

export default function({ contact }: Props): JSX.Element {
    if (contact.first || contact.last) {
        return <>{contact.first} {contact.last}</>;
    }
    return <i>No Name</i>
}

export interface Props {
    contact: ContactInfo;
}
