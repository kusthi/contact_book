import { createRoot } from 'react-dom/client';
import App from './App';
import { contactsList } from './Data';
import './styles.css';

const rootElm = document.getElementById('root');
const root = createRoot(rootElm);

/* Load Data into SessionStorage */
const keys = Object.keys(sessionStorage);
contactsList.forEach(contact => {
  const id = String(contact.id);
  //only reload deleted contacts to preserve edits
  !keys.includes(id)
    ? sessionStorage.setItem(id, JSON.stringify(contact))
    : null;
});

root.render(<App />);
