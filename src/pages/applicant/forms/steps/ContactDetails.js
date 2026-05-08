import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";

function ContactDetails({ prevStep, handleChange, nextStep, data: initialData = {} }) {
  const [data, setData] = useState({
    email: initialData.email || "",
    mobileNumber: initialData.mobileNumber || "",
    alternateMobileNumber: initialData.alternateMobileNumber || "",
  });

  const [errors, setErrors] = useState({
    emailErr: "",
    mobileErr: "",
    alternateMobileErr: "",
  });

  const [formValid, setFormValid] = useState({
    email: false,
    mobileNumber: false,
    alternateMobileNumber: true, // optional
    btnactive: false,
  });

  // Pre-fill validity flags when initialData has the section already filled.
  // alternateMobileNumber is optional, so it doesn't need a value to be valid.
  useEffect(() => {
    if (data.email && data.mobileNumber) {
      setFormValid({
        email: true,
        mobileNumber: true,
        alternateMobileNumber: true,
        btnactive: true,
      });
    }
  }, [data]);

  // Keep parent formData in sync on every change so Save Draft sees latest.
  useEffect(() => {
    handleChange("contactDetails", data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function handleInput(e) {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    setData(updatedData);
    validateData(name, value, updatedData);
  }

  function validateData(name, value, updatedData) {
    const errorsCopy = { ...errors };
    const formValidCopy = { ...formValid };
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,3}$/;
    const mobileRegex = /^[0-9]{10}$/;

    switch (name) {
      case "email":
        if (value === "") {
          errorsCopy.emailErr = "email id is required";
          formValidCopy.email = false;
        } else if (!emailRegex.test(value)) {
          errorsCopy.emailErr = "Enter valid email";
          formValidCopy.email = false;
        } else {
          errorsCopy.emailErr = "";
          formValidCopy.email = true;
        }
        break;

      case "mobileNumber":
        if (value === "") {
          errorsCopy.mobileErr = "Mobile number is required";
          formValidCopy.mobileNumber = false;
        } else if (!mobileRegex.test(value)) {
          errorsCopy.mobileErr = "Enter valid 10-digit number";
          formValidCopy.mobileNumber = false;
        } else {
          errorsCopy.mobileErr = "";
          formValidCopy.mobileNumber = true;
        }
        break;

      case "alternateMobileNumber":
        if (value !== "" && !mobileRegex.test(value)) {
          errorsCopy.alternateMobileErr = "Enter valid 10-digit number";
          formValidCopy.alternateMobileNumber = false;
        } else {
          errorsCopy.alternateMobileErr = "";
          formValidCopy.alternateMobileNumber = true;
        }
        break;

      default:
        break;
    }

    formValidCopy.btnactive =
      formValidCopy.email && formValidCopy.mobileNumber && formValidCopy.alternateMobileNumber;

    setErrors(errorsCopy);
    setFormValid(formValidCopy);
  }

  function handleClear() {
    setData({ email: "", mobileNumber: "", alternateMobileNumber: "" });
    setFormValid({ email: false, mobileNumber: false, alternateMobileNumber: true, btnactive: false });
  }

  function handleNext() {
    handleChange("contactDetails", data);
    nextStep();
  }

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Step 5 of 8</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 24, color: "var(--text-primary)" }}>Contact Details</h2>

      <div className="form-group">
        <label>Email</label>
        <input name="email" value={data.email} onChange={handleInput} placeholder="example@email.com" />
        {errors.emailErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.emailErr}</span>}
      </div>

      <div className="form-group">
        <label>Mobile Number</label>
        <input name="mobileNumber" value={data.mobileNumber} onChange={handleInput} placeholder="Enter 10-digit mobile number" />
        {errors.mobileErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.mobileErr}</span>}
      </div>

      <div className="form-group">
        <label>Alternate Mobile <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
        <input name="alternateMobileNumber" value={data.alternateMobileNumber} onChange={handleInput} placeholder="Enter alternate 10-digit mobile number" />
        {errors.alternateMobileErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.alternateMobileErr}</span>}
      </div>

      <div style={{ marginTop: 8 }}>
        <Buttons onPrev={prevStep} onNext={handleNext} onClear={handleClear} disableNext={!formValid.btnactive} />
      </div>
    </div>
  );
}

export default ContactDetails;
