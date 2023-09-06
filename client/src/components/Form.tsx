import { useState, FormEvent, useRef } from "react";
//@ts-ignore
import InputMask from "react-input-mask";
import "./Form.css";

type Results = {
  email: string;
  number: string;
};

const Form = () => {
  const numberRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [searchResults, setSearchResults] = useState<Results | "">();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSearchResults("");
    const numberValue = numberRef.current?.value || "";
    const emailValue = emailRef.current?.value || "";

    if (!emailValue.trim() || !emailValue.includes("@")) {
      setError('Email field is required and should contain "@"');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:4200/users/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue, number: numberValue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (!data) {
        setError("No results found");
        return;
      }
      setSearchResults(data);
      setError("");
    } catch (err) {
      setError("No results found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={onSubmit} className="form">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="number">Number</label>
          <InputMask mask="99-99-99" ref={numberRef} placeholder="12-34-56" id="number" />
        </div>
        <button type="submit">{loading ? "Submitting..." : "Submit"}</button>
      </form>
      {error && <div className="error">{error}</div>}

      {searchResults && (
        <div className="results">
          <h3>Results</h3>
          <p>Email: {searchResults.email}</p>
          <p>Number: {searchResults.number}</p>
        </div>
      )}
    </div>
  );
};

export default Form;
