import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * @see https://fkhadra.github.io/react-toastify/introduction/
 */
export default function Toast() {
  return (
    <ToastContainer theme="light" position="bottom-right" draggable={false} />
  );
}
