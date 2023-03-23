import { Link } from 'react-router-dom';

function HomePage() {

  const data = { name: 'John Doe', age: 30 };
 
  
  return (
    <div>
    <Link to="/about" state={data}> ok </Link>
    </div>
  );
}
 export default HomePage