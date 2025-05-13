export default function MyComponent({ onClickHandler }) {
    return (
        <div>
        <button onClick={()=>onClickHandler()}>Click me!</button>
        </div>
    );
}