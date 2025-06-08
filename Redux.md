# About Redux

- What is Redux? Redux is a state management library that helps you manage and share data (called "state") across components in a predictable and centralized way.
- Think of it like a global storage box that React components can use to read from or write to.

## Different types of States

![alt text](image.png)


- We have seen React's State Management Hooks like `useState` or `useReducer` so that we can tell React that some data changed and so that it then updates the UI. But we can split the definition of state into three main kinds of state.

1. Local State
    - Local state is state so data which changes that affects UI which belongs to a single component. And for example, if we listen to a user input and we use `useState` to store that input with every keystroke in a state variable. Or we have a button that toggles some detailed field.
    - So if we click that button we show the details if we click it again we hide them. That would be local state. And typically we manage such local state inside of a single component with `useState`

2. Cross-component State
    - Now we also often have state that affects not just one component but multiple components. That would be cross component state.
    - For example, if we have a button that opens or closes a modal overlay such a modal component might affect multiple components. So then we have multiple components working together to display and hide a modal. And we can also implement that with `useState` or `useReducer` we then just need to pass props around so we need to build those prop chains or do this prop drilling as it's also called where we pass drops across multiple components where we also might pass functions as props across multiple components
    - That's not bad or anything like that it's just a little bit more complex than local state.


3. App-wide State
    - Sometimes we also have State that does not just affect multiple components but basically all components of an application. Now when that happens we could call this app-wide state
    - An example here would be user authentication. If we logged in we might need to change the navigation bar because we now show new options or menu on application and we also certainly affect a lot of other components which now show more or less data.
    - We can also manage this with the `useState`, `useReducer` and then by passing state values like prop-drilling




- Now for cross-component and app-wide state passing around data and updating function fruit props can become cumbersome though. And that's why we came across about React Context. React Context is a built in feature in React that makes managing cross-component or application wide state easier. So that's one way of simplifying cross-component and app-wide state management.
- Redux solves the same problem. So both React Context and Redux are there to help us manage such cross-component or app-wide States.
- **`But Why do we need Redux if we already have React Context for managing state that affects multiple components?`**

### React Context Potential Disadvantages

![alt text](image-1.png)


- One potential disadvantage is that with React Context, you can have a very complex setup and managing state with React Context can become quite complex. And that definitely depends on the kind of application you're building.
- For a lot of small or medium-sized applications that will very likely not be a problem. But if you're building a large application an enterprise level application with a lot of components and a lot of things going on, then when using React Context, you can end up with code like this

![alt text](image-2.png)

- Where you have a lot of different pieces of Context,  lot of different States that affect multiple components or the entire app, and therefore a lot of different Context Provider components which you built for managing these states. And you can end up with deeply nested JSX code
- Either using this way or you could just use one big Context and one Context Provider component for a managing the entire state and all the different kinds of state of your application.

![alt text](image-3.png)


- But that could lead in a large Context Provider component which manages a lot of different things, and therefore itself becomes quite difficult to maintain and manage because it's doing a lot of things. You might end up with a large Context that cares about authentication, theming, user input, if a modal should be displayed or not, and maybe a lot of other things as well.
- You can absolutely face this problem in real react projects you might be working on, and therefore this is one potential disadvantage.
- Another potential disadvantage could be performance. We have an official quote by a member of their React team, who basically says that the React Context, **that React Context is great for low-frequency updates like changing a theme, or maybe also authentication, but it's not that great if your data changes a lot**.

![alt text](image-4.png)

- So he says that React Context is not really a great replacement for Redux in all scenarios, in all cases. So therefore Redux is an alternative for React Context.


>[!NOTE]
> - Typically for application wide-state, you will only use one of the two, but then you could be using Redux for the general application wide-state and still use Context for selected multi-component states which are important in parts of your application.
> - So mixing and matching like that would also be possible


