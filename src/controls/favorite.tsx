import { ActionFunctionArgs, useFetcher } from 'react-router-dom';

import { ContactInfo, updateContact } from '../contacts.service';

export async function action(
    { request, params }: ActionFunctionArgs
): Promise<ContactInfo> {
    const formData = await request.formData();
    return updateContact(params.contactId as string, {
        favorite: formData.get('favorite') === 'true',
    });
}

export default function({ contact }: { contact: ContactInfo }): JSX.Element {
    const fetcher = useFetcher();
    let favorite = contact.favorite;

    if (fetcher.formData) {
        favorite = fetcher.formData.get('favorite') === 'true';
    }

    return (
      <fetcher.Form method="post">
        <button name="favorite" value={favorite ? 'false' : 'true'}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
            {favorite ? '★' : '☆'}
          </button>
      </fetcher.Form>
    );
}
