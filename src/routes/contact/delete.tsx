import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { deleteContact } from './contacts.service';

export async function action(
    { params, request }: ActionFunctionArgs
): Promise<Response> {
    await deleteContact(params.contactId as string);
    return redirect('/');
}
