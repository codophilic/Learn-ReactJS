import { useFormStatus } from 'react-dom';

export default function SubmitBtn(){

    const {pending} = useFormStatus();
    console.log('SubmitBtn', pending);
    return (
        <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button disabled={pending} className="button">
        {pending ? 'Submitting...' : 'Submit'}
        </button>
        </p>
    );
} 