import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";

function VisaDetails({ prevStep, nextStep, handleChange, data: initialData = {} }) {
  const [data, setData] = useState({
    countryToVisit: initialData.countryToVisit || "",
    visaType: initialData.visaType || "",
    purposeOfVisit: initialData.purposeOfVisit || "",
    durationOfStay: initialData.durationOfStay || "",
    numberOfEntries: initialData.numberOfEntries || "",
    intendedDateOfArrival: initialData.intendedDateOfArrival || "",
    intendedDateOfDeparture: initialData.intendedDateOfDeparture || "",
  });

  const [errors, setErrors] = useState({
    countryErr: "", visaTypeErr: "", purposeErr: "",
    durationErr: "", entriesErr: "", arrivalErr: "", departureErr: "",
  });

  const [formValid, setFormValid] = useState({
    country: false, visaType: false, purpose: false,
    duration: false, entries: false, arrival: false, departure: false,
    btnactive: false,
  });

  useEffect(() => {
    if (
      data.countryToVisit &&
      data.visaType &&
      data.purposeOfVisit &&
      data.durationOfStay &&
      data.numberOfEntries &&
      data.intendedDateOfArrival &&
      data.intendedDateOfDeparture
    ) {
      setFormValid({
        country: true, visaType: true, purpose: true,
        duration: true, entries: true, arrival: true, departure: true,
        btnactive: true,
      });
    }
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

    switch (name) {
      case "countryToVisit":
        if (value === "") { errorsCopy.countryErr = "Required"; formValidCopy.country = false; }
        else { errorsCopy.countryErr = ""; formValidCopy.country = true; }
        break;
      case "visaType":
        if (value === "") { errorsCopy.visaTypeErr = "Select visa type"; formValidCopy.visaType = false; }
        else { errorsCopy.visaTypeErr = ""; formValidCopy.visaType = true; }
        break;
      case "purposeOfVisit":
        if (value === "") { errorsCopy.purposeErr = "Required"; formValidCopy.purpose = false; }
        else { errorsCopy.purposeErr = ""; formValidCopy.purpose = true; }
        break;
      case "durationOfStay":
        if (value === "" || value < 1 || value > 365) { errorsCopy.durationErr = "Enter 1–365 days"; formValidCopy.duration = false; }
        else { errorsCopy.durationErr = ""; formValidCopy.duration = true; }
        break;
      case "numberOfEntries":
        if (value === "") { errorsCopy.entriesErr = "Select entry type"; formValidCopy.entries = false; }
        else { errorsCopy.entriesErr = ""; formValidCopy.entries = true; }
        break;
      case "intendedDateOfArrival":
        if (value === "") { errorsCopy.arrivalErr = "Required"; formValidCopy.arrival = false; }
        else { errorsCopy.arrivalErr = ""; formValidCopy.arrival = true; }
        break;
      case "intendedDateOfDeparture":
        if (value === "") { errorsCopy.departureErr = "Required"; formValidCopy.departure = false; }
        else if (value <= updatedData.intendedDateOfArrival) {
          errorsCopy.departureErr = "Departure must be after arrival"; formValidCopy.departure = false;
        } else { errorsCopy.departureErr = ""; formValidCopy.departure = true; }
        break;
      default:
        break;
    }

    formValidCopy.btnactive =
      formValidCopy.country && formValidCopy.visaType && formValidCopy.purpose &&
      formValidCopy.duration && formValidCopy.entries && formValidCopy.arrival && formValidCopy.departure;

    setErrors(errorsCopy);
    setFormValid(formValidCopy);
  }

  function handleClear() {
    setData({
      countryToVisit: "", visaType: "", purposeOfVisit: "",
      durationOfStay: "", numberOfEntries: "",
      intendedDateOfArrival: "", intendedDateOfDeparture: "",
    });
    setFormValid({
      country: false, visaType: false, purpose: false,
      duration: false, entries: false, arrival: false, departure: false, btnactive: false,
    });
  }

  function handleNext() {
    handleChange("visaDetails", data);
    nextStep();
  }

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Step 6 of 8</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 24, color: "var(--text-primary)" }}>Visa Details</h2>

      <div className="form-group">
        <label>Country to Visit</label>
        <input name="countryToVisit" value={data.countryToVisit} onChange={handleInput} placeholder="e.g. United Kingdom" />
        {errors.countryErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.countryErr}</span>}
      </div>

      <div className="form-group">
        <label>Visa Type</label>
        <select name="visaType" value={data.visaType} onChange={handleInput}>
          <option value="">Select Visa Type</option>
          <option>Tourist</option>
          <option>Business</option>
          <option>Student</option>
          <option>Transit</option>
          <option>Work</option>
        </select>
        {errors.visaTypeErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.visaTypeErr}</span>}
      </div>

      <div className="form-group">
        <label>Purpose of Visit</label>
        <input name="purposeOfVisit" value={data.purposeOfVisit} onChange={handleInput} placeholder="e.g. Vacation, Conference" />
        {errors.purposeErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.purposeErr}</span>}
      </div>

      <div className="form-group">
        <label>Duration of Stay (days)</label>
        <input type="number" name="durationOfStay" value={data.durationOfStay} onChange={handleInput} placeholder="e.g. 30" />
        {errors.durationErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.durationErr}</span>}
      </div>

      <div className="form-group">
        <label>Number of Entries</label>
        <select name="numberOfEntries" value={data.numberOfEntries} onChange={handleInput}>
          <option value="">Select</option>
          <option>Single</option>
          <option>Double</option>
          <option>Multiple</option>
        </select>
        {errors.entriesErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.entriesErr}</span>}
      </div>

      <div className="form-group">
        <label>Intended Date of Arrival</label>
        <input type="date" name="intendedDateOfArrival" value={data.intendedDateOfArrival} onChange={handleInput} />
        {errors.arrivalErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.arrivalErr}</span>}
      </div>

      <div className="form-group">
        <label>Intended Date of Departure</label>
        <input type="date" name="intendedDateOfDeparture" value={data.intendedDateOfDeparture} onChange={handleInput} />
        {errors.departureErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.departureErr}</span>}
      </div>

      <div style={{ marginTop: 8 }}>
        <Buttons onPrev={prevStep} onNext={handleNext} onClear={handleClear} disableNext={!formValid.btnactive} />
      </div>
    </div>
  );
}

export default VisaDetails;
