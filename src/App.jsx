import { useState, useEffect } from "react";

import ContactForm from "./components/ContactForm"
import SuccessMessage from "./components/SuccessMessage"

function App() {

  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {

    if (!isSuccessful) return;

    const timeOutId = setTimeout(() => {
      setIsSuccessful(false);
    }, 3000);

    return () => {
      clearTimeout(timeOutId);
    }

  }, [isSuccessful])

  function handleSuccess() {
    setIsSuccessful(true);
  }

  return (
    <main>
      <h1 className="visually-hidden">Sample Contact Form</h1>
      {isSuccessful && <SuccessMessage />}
      <ContactForm onSuccess={handleSuccess} />
    </main>
  )
}

export default App
