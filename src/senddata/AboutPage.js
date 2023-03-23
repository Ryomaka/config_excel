import { useLocation } from 'react-router-dom';

function AboutPage() {
  const { state } = useLocation();
  console.log(state)
  return (
    <div>
      <h2>About Page</h2>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
    </div>
  );
}
 export default AboutPage