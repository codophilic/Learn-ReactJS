import { useParams } from "react-router-dom";

export default function DisplayUser() {

    const params = useParams();
    // Extract userId from the URL parameters
    const userId = params.userId;

    const userList = [
        { id: 1, name: "John Doe", email: "john.gmail.com" },
        { id: 2, name: "Jane Smith", email: "smith.gmail.com" },
        { id: 3, name: "Alice Johnson", email: "alice.gmail.com" },
        { id: 4, name: "Bob Brown", email: "bob.gmail.com" }
    ];
    // Find the user with the matching userId
    const user = userList.find((user) => user.id === parseInt(userId));

  return (
    <div>
        {user ? (
            <div>
            <h2>User Details</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            </div>
        ) : (
            <p>User not found.</p>
        )}
    </div>
  );
}