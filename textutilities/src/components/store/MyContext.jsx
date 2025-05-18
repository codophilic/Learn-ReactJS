import React, { createContext } from "react";

export const MyContext = createContext({
    items:[],
    onClickHandler: () => {},
});


export const MyProviderValue = ({ children }) => {
    // Create state to hold the items
    const [items, setItems] = React.useState(['Item 1', 'Item 2', 'Item 3']);

    // Create a function to handle on click event and add a new item
    function onClickHandler() {
        setItems((prevItems) => {
            return [...prevItems, `Item ${prevItems.length + 1}`];
        });
    }
    return (
        <MyContext.Provider value={{ items, onClickHandler }}>
            {children}
        </MyContext.Provider>
    );
}
