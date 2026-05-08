import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";

function PassportDetails({ nextStep, prevStep, handleChange, data: initialData = {} }) {
  const [data, setData] = useState({
    passportType: initialData.passportType || "",
    passportNumber: initialData.passportNumber || "",
    placeOfIssue: initialData.placeOfIssue || "",
    dateOfIssue: initialData.dateOfIssue || "",
    dateOfExpiry: initialData.dateOfExpiry || "",
  });

  const [errors, setErrors] = useState({
    passportTypeErr: "",
    passportNumberErr: "",
    placeOfIssueErr: "",
    dateOfIssueErr: "",
    dateOfExpiryErr: "",
  });

  const [formValid, setFormValid] = useState({
    passportType: false,
    passportNumber: false,
    placeOfIssue: false,
    dateOfIssue: false,
    dateOfExpiry: false,
    btnactive: false,
  });

  useEffect(() => {
    if (
      data.passportType &&
      data.passportNumber &&
      data.placeOfIssue &&
      data.dateOfIssue &&
      data.dateOfExpiry
    ) {
      setFormValid({
        passportType: true,
        passportNumber: true,
        placeOfIssue: true,
        dateOfIssue: true,
        dateOfExpiry: true,
        btnactive: true,
      });
    }
  }, [data]);

  // Keep parent formData in sync on every change so Save Draft sees latest.
  useEffect(() => {
    handleChange("passportDetails", data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  function handleInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    validateData(name, value);
  }

  function validateData(fieldName, fieldValue) {
    const errorsCopy = { ...errors };
    const formValidCopy = { ...formValid };

    switch (fieldName) {
      case "passportType":
        if (fieldValue === "") {
          errorsCopy.passportTypeErr = "Select passport type";
          formValidCopy.passportType = false;
        } else {
          errorsCopy.passportTypeErr = "";
          formValidCopy.passportType = true;
        }
        break;

      case "passportNumber":
        if (fieldValue === "") {
          errorsCopy.passportNumberErr = "Passport number required";
          formValidCopy.passportNumber = false;
        } else if (!/^[A-Za-z0-9 ]+$/.test(fieldValue)) {
          errorsCopy.passportNumberErr = "Passport number can be only alphanumeric";
          formValidCopy.passportNumber = false;
        } else if (fieldValue.length < 6) {
          errorsCopy.passportNumberErr = "Passport number cannot be less than 6 characters";
          formValidCopy.passportNumber = false;
        } else if (fieldValue.length > 9) {
          errorsCopy.passportNumberErr = "Passport number cannot be more than 9 characters";
          formValidCopy.passportNumber = false;
        } else {
          errorsCopy.passportNumberErr = "";
          formValidCopy.passportNumber = true;
        }
        break;

      case "placeOfIssue":
        if (fieldValue === "") {
          errorsCopy.placeOfIssueErr = "Place required";
          formValidCopy.placeOfIssue = false;
        } else if (!/^[A-Za-z ]+$/.test(fieldValue)) {
          errorsCopy.placeOfIssueErr = "Only alphabets allowed";
          formValidCopy.placeOfIssue = false;
        } else {
          errorsCopy.placeOfIssueErr = "";
          formValidCopy.placeOfIssue = true;
        }
        break;

      case "dateOfIssue":
        if (fieldValue === "") {
          errorsCopy.dateOfIssueErr = "Required";
          formValidCopy.dateOfIssue = false;
        } else {
          errorsCopy.dateOfIssueErr = "";
          formValidCopy.dateOfIssue = true;
        }
        break;

      case "dateOfExpiry":
        if (fieldValue === "") {
          errorsCopy.dateOfExpiryErr = "Required";
          formValidCopy.dateOfExpiry = false;
        } else if (data.dateOfIssue && fieldValue < data.dateOfIssue) {
          errorsCopy.dateOfExpiryErr = "Expiry must be after issue date";
          formValidCopy.dateOfExpiry = false;
        } else {
          errorsCopy.dateOfExpiryErr = "";
          formValidCopy.dateOfExpiry = true;
        }
        break;

      default:
        break;
    }

    formValidCopy.btnactive =
      formValidCopy.passportType &&
      formValidCopy.passportNumber &&
      formValidCopy.placeOfIssue &&
      formValidCopy.dateOfIssue &&
      formValidCopy.dateOfExpiry;

    setErrors(errorsCopy);
    setFormValid(formValidCopy);
  }

  function handleNext() {
    handleChange("passportDetails", data);
    nextStep();
  }

  function handleClear() {
    setData({ passportType: "", passportNumber: "", placeOfIssue: "", dateOfIssue: "", dateOfExpiry: "" });
    setErrors({ passportTypeErr: "", passportNumberErr: "", placeOfIssueErr: "", dateOfIssueErr: "", dateOfExpiryErr: "" });
    setFormValid({ passportType: false, passportNumber: false, placeOfIssue: false, dateOfIssue: false, dateOfExpiry: false, btnactive: false });
  }

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Step 2 of 8</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 24, color: "var(--text-primary)" }}>Passport Details</h2>

      <div className="form-group">
        <label>Passport Type</label>
        <select name="passportType" value={data.passportType} onChange={handleInput}>
          <option value="">Select Type</option>
          <option>Normal</option>
          <option>Diplomatic</option>
          <option>Official</option>
        </select>
        {errors.passportTypeErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.passportTypeErr}</span>}
      </div>

      <div className="form-group">
        <label>Passport Number</label>
        <input name="passportNumber" placeholder="Enter your passport number" value={data.passportNumber} onChange={handleInput} />
        {errors.passportNumberErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.passportNumberErr}</span>}
      </div>

      <div className="form-group">
        <label>Place of Issue</label>
        <input name="placeOfIssue" placeholder="Enter the place of Issue of passport" value={data.placeOfIssue} onChange={handleInput} />
        {errors.placeOfIssueErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.placeOfIssueErr}</span>}
      </div>

      <div className="form-group">
        <label>Date of Issue</label>
        <input type="date" name="dateOfIssue" value={data.dateOfIssue} onChange={handleInput} />
        {errors.dateOfIssueErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.dateOfIssueErr}</span>}
      </div>

      <div className="form-group">
        <label>Date of Expiry</label>
        <input type="date" name="dateOfExpiry" value={data.dateOfExpiry} onChange={handleInput} />
        {errors.dateOfExpiryErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.dateOfExpiryErr}</span>}
      </div>

      <div style={{ marginTop: 8 }}>
        <Buttons onPrev={prevStep} onNext={handleNext} onClear={handleClear} disableNext={!formValid.btnactive} />
      </div>
    </div>
  );
}

export default PassportDetails;
