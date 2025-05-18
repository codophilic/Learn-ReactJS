import { useContext } from "react";
import { MyContext } from "./store/MyContext";

export default function ChildComponentOfMyComponent() {
    const { items } = useContext(MyContext); //Destructure items from context
    const { onClickHandler } = useContext(MyContext); //Destructure onClickHandler from context
    return (
        <div>
            <button onClick={()=>onClickHandler()}>Add Item</button>
            {items.length > 0 ? (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>No items available</p>
            )}
        </div>
    );
}