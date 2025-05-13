import ChildComponentOfMyComponent from './ChildComponentOfMyComponent.jsx';
export default function MyComponent({ children }) {
  return (
    <div>
      <h1>My Component</h1>
      <p>This is a simple component that uses a function handler.</p>
      {children}
    </div>
  );
}