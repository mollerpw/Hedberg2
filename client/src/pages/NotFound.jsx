import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>Oj! Den här sidan finns inte</h1>
      <p>Här är några länkar</p>
      <Link to='/'>Hem</Link>
      <br />
      <Link to='/contact'>Kontaktinfo</Link>
    </div>
  );
}
