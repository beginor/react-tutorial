import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

export async function action({ params }: ActionFunctionArgs): Promise<Response> {
    throw new Error('oh dang!');
    await deleteContact(params.contactId as string);
    return redirect('/');
}
