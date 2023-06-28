import React, { useEffect, useState } from "react";
import { Container, Form, Input, Button } from "reactstrap";
export const Logsection = () => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [countryId, setCountryId] = useState(0);
  const [selectedStateId, setSelectedStateId] = useState(0);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: ""
  });
  useEffect(() => {
    countrydata();
  }, []);
  useEffect(() => {
    if (countryId) {
      statedata(countryId);
    }
  }, [countryId]);
  const countrydata = () => {
    fetch("http://localhost:8000/api/countries", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data);
      });
  };
  const statedata = (countryId) => {
    fetch(`http://localhost:8000/api/regions/${countryId}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setStateData(data);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const addData = () => {
    const { fname, lname, email } = formData;
    fetch("http://localhost:8000/api/saveFormData", {
      method: "POST",
      body: JSON.stringify({
        firstname: fname,
        lastname: lname,
        email: email,
        country_id: countryId,
        regions_id: selectedStateId
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Data added Successfully.");
        console.log(data);
      })
      .catch((error) => {
        alert("oops something went wrong.....");
        console.error(error);
      });
  };
  return (
    <>
       <div className="py-5 container-fluid align-items-center row m-0 justify-content-center main">
      <div className="container col-11 rounded-3 row p-5 justify-content-center">
        <div className="row justify-content-spacebetween col-12">
          {/* Navigation */}
        </div>

        <div className="container-fluid row pt-5 justify-content-center">
          <div className="col-6 row pt-5 justify-content-start">
            <div className="col-8">
        <Form>
          <Input
            className="mb-3 rounded-pill"
            name="fname"
            placeholder="First Name"
            type="text"
            value={formData.fname}
            onChange={handleInputChange}
            
          />
          <Input
            className="mb-3 rounded-pill"
            name="lname"
            placeholder="Last Name"
            type="text"
            value={formData.lname}
            onChange={handleInputChange}
          />
          <Input
            className="mb-3 rounded-pill"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            className="mb-3 rounded-pill"
            type="select"
            onChange={(e) => setCountryId(e.target.value)}
          >
            <option>Select Country</option>
            {countryData.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </Input>
          <Input
            className="mb-3 rounded-pill"
            type="select"
            onChange={(e) => setSelectedStateId(e.target.value)}
          >
            <option>Select State</option>
            {stateData.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </Input>
          <Button onClick={addData} className="rounded-pill">Submit</Button>
        </Form>
        </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};