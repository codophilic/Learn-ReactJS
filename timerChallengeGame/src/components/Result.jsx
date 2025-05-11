import { forwardRef, useImperativeHandle, useRef } from 'react';

const ResultModal = forwardRef(function ResultModal({ result, targetTime, message }, ref) {

  const dialog = useRef();

  // Exposing only the open method to the parent component
  // This is done to prevent the parent from accessing the dialog element directly
  // and to keep the component encapsulated
  useImperativeHandle(ref, () => ({
    open: () => {
      dialog.current.showModal();
    }
  }));
  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>
      
        <p>The target time was <strong>{targetTime}</strong> seconds and you {message} within the <strong>{targetTime} seconds.</strong></p>      
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
})

export default ResultModal;