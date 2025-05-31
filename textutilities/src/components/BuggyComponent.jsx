import React, { useState } from 'react';

function BuggyComponent() {
  const [triggerError, setTriggerError] = useState(false);

  if (triggerError) {
    // Simulate a render-time error
    throw new Error("I crashed!");
  }

  return (
    <div>
      <h3>This is a buggy component</h3>
      <button onClick={() => setTriggerError(true)}>Crash Me</button>
    </div>
  );
}

export default BuggyComponent;
