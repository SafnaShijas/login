import { useState, useEffect } from "react";
import { Nav, NavItem, NavLink, Form, FormGroup, Input, Label } from "reactstrap";

export const Logsection = () => {
  const [termsChecked, setTermsChecked] = useState(false);
  const [countries, setCountries] = useState([]);
  const [regions, setStateData] = useState([]);
  const [countryId, setCountryId] = useState(0);

  const handleTermsCheck = (e) => {
    setTermsChecked(e.target.checked);
  };

  useEffect(() => {
    // Fetch countries from the database and set the countries state
    fetchCountries().then((data) => {
      setCountries(data);
    });
});
    // Fetch regions from the database and set the regions state
    
  useEffect(() => {
    if (countryId) {
      statedata(countryId);
    }
  }, [countryId]);

  const fetchCountries = () => {
    // Replace this with your actual API call to fetch countries from the database
    return fetch("http://localhost:8000/api/countries")
      .then((response) => response.json())
      .then((data) => data);
  };

  const statedata = (countryId) => {
    fetch(`http://localhost:8000/api/countries/${countryId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStateData(data);
      });
  };

  return (
    <div className="py-5 container-fluid align-items-center row m-0 justify-content-center main">
      <div className="container col-11 rounded-3 row p-5 justify-content-center">
        <div className="row justify-content-spacebetween col-12">
          {/* Navigation */}
        </div>

        <div className="container-fluid row pt-5 justify-content-center">
          <div className="col-6 row pt-5 justify-content-start">
            <div className="col-8">
              <Form>
                <FormGroup>
                  <Input
                    id="fname"
                    name="fname"
                    placeholder="Enter Your First Name"
                    type="text"
                    className="rounded-pill"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="lname"
                    name="lname"
                    placeholder="Enter your Last Name"
                    type="text"
                    className="rounded-pill"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter your Email"
                    type="email"
                    className="rounded-pill"
                  />
                </FormGroup>
                <FormGroup>
                  <select
                    id="country"
                    name="country"
                    className="rounded-pill"
                    onChange={(e) => setCountryId(e.target.value)}
                  >
                    <option value="">Select your Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.name}>
                        {country.name}
                      </option>))}
                  </select>
                </FormGroup>
                <FormGroup>
                  <select
                    id="region"
                    name="region"
                    className="rounded-pill"
                  >
<option value="">Select your Region</option>
                    {regions.map((region) => (
                      <option key={region.id} value={region.name}>
                        {region.name}
                      </option>))}
                  </select>
                </FormGroup>
                
                <FormGroup check>
                  <Label check>
                    <Input
                      id="termsCheck"
                      name="termsCheck"
                      type="checkbox"
                      checked={termsChecked}
                      onChange={handleTermsCheck}
                    />{" "}
                    I agree to the terms and conditions
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Input
                    id="submit"
                    name="submit"
                    value="Signup"
                    type="submit"
                    className="rounded-pill btn btn-success"
                  />
                </FormGroup>
              </Form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
