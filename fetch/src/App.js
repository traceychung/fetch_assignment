import { useEffect, useState } from "react";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupations, setOccupations] = useState([]);
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://frontend-take-home.fetchrewards.com/form";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setOccupations(data.occupations);
        setStates(data.states);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const occupation = selectedOccupation;
    const state = selectedState;
    const data = {
      name,
      email,
      password,
      occupation,
      state,
    };

    const userUrl = "https://frontend-take-home.fetchrewards.com/form";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(userUrl, fetchConfig);
    if (response.ok) {
      event.target.reset();
      setName("");
      setEmail("");
      setPassword("");
      setSelectedOccupation("");
      setSelectedState("");
      setSubmitted(true);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-center">Create a New User</h1>
          <form id="create-user-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Full Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="mb-3">
              <select
                onChange={(e) => setSelectedOccupation(e.target.value)}
                required
                name="occupation"
                id="occupation"
                className="form-select">
                <option value="">Select an occupation</option>
                {occupations.map((occupation) => {
                  return (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={(e) => setSelectedState(e.target.value)}
                required
                name="state"
                id="state"
                className="form-select">
                <option value="">Select a state</option>
                {states.map((state) => {
                  return (
                    <option key={state.abbreviation} value={state.abbreviation}>
                      {state.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col text-center">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
          {submitted && (
            <div
              className="alert alert-success mb-0 p-4 mt-4"
              id="success-message">
              Your account has been created
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserForm;
