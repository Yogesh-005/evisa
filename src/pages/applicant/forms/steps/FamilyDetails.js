import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";

function FamilyDetails({ prevStep, nextStep, handleChange, data: initialData = {} }) {
  const [data, setData] = useState({
    fatherDetails: initialData.fatherDetails || { fullName: "", nationality: "" },
    motherDetails: initialData.motherDetails || { fullName: "", nationality: "" },
    maritalStatus: initialData.maritalStatus || "",
    spouseDetails: initialData.spouseDetails || { fullName: "", nationality: "" },
  });

  const [errors, setErrors] = useState({
    fatherNameErr: "",
    fatherNationalityErr: "",
    motherNameErr: "",
    motherNationalityErr: "",
    maritalStatusErr: "",
    spouseNameErr: "",
    spouseNationalityErr: "",
  });

  const [formValid, setFormValid] = useState({
    fatherName: false,
    fatherNationality: false,
    motherName: false,
    motherNationality: false,
    maritalStatus: false,
    spouseName: false,
    spouseNationality: false,
    btnactive: false,
  });

  // Pre-fill the validity flags when initialData has the section already filled.
  useEffect(() => {
    const baseFilled =
      data.fatherDetails.fullName &&
      data.fatherDetails.nationality &&
      data.motherDetails.fullName &&
      data.motherDetails.nationality &&
      data.maritalStatus;

    const spouseFilled =
      data.maritalStatus !== "Married" ||
      (data.spouseDetails.fullName && data.spouseDetails.nationality);

    if (baseFilled && spouseFilled) {
      setFormValid({
        fatherName: true,
        fatherNationality: true,
        motherName: true,
        motherNationality: true,
        maritalStatus: true,
        spouseName: true,
        spouseNationality: true,
        btnactive: true,
      });
    }
  }, [data]);

  function handleInput(e) {
    const { name, value } = e.target;
    const [section, field] = name.split(".");

    let updatedData;
    if (field) {
      updatedData = { ...data, [section]: { ...data[section], [field]: value } };
    } else {
      updatedData = { ...data, [name]: value };
    }

    setData(updatedData);
    validateData(name, value, updatedData);
  }

  function validateData(name, value, updatedData) {
    const errorsCopy = { ...errors };
    const formValidCopy = { ...formValid };

    switch (name) {
      case "fatherDetails.fullName":
        if (value === "") { errorsCopy.fatherNameErr = "Required"; formValidCopy.fatherName = false; }
        else { errorsCopy.fatherNameErr = ""; formValidCopy.fatherName = true; }
        break;
      case "fatherDetails.nationality":
        if (value === "") { errorsCopy.fatherNationalityErr = "Required"; formValidCopy.fatherNationality = false; }
        else { errorsCopy.fatherNationalityErr = ""; formValidCopy.fatherNationality = true; }
        break;
      case "motherDetails.fullName":
        if (value === "") { errorsCopy.motherNameErr = "Required"; formValidCopy.motherName = false; }
        else { errorsCopy.motherNameErr = ""; formValidCopy.motherName = true; }
        break;
      case "motherDetails.nationality":
        if (value === "") { errorsCopy.motherNationalityErr = "Required"; formValidCopy.motherNationality = false; }
        else { errorsCopy.motherNationalityErr = ""; formValidCopy.motherNationality = true; }
        break;
      case "maritalStatus":
        if (value === "") { errorsCopy.maritalStatusErr = "Select status"; formValidCopy.maritalStatus = false; }
        else { errorsCopy.maritalStatusErr = ""; formValidCopy.maritalStatus = true; }
        break;
      case "spouseDetails.fullName":
        if (updatedData.maritalStatus === "Married" && value === "") { errorsCopy.spouseNameErr = "Required"; formValidCopy.spouseName = false; }
        else { errorsCopy.spouseNameErr = ""; formValidCopy.spouseName = true; }
        break;
      case "spouseDetails.nationality":
        if (updatedData.maritalStatus === "Married" && value === "") { errorsCopy.spouseNationalityErr = "Required"; formValidCopy.spouseNationality = false; }
        else { errorsCopy.spouseNationalityErr = ""; formValidCopy.spouseNationality = true; }
        break;
      default:
        break;
    }

    const baseValid =
      formValidCopy.fatherName &&
      formValidCopy.fatherNationality &&
      formValidCopy.motherName &&
      formValidCopy.motherNationality &&
      formValidCopy.maritalStatus;

    const spouseValid =
      updatedData.maritalStatus === "Married"
        ? (formValidCopy.spouseName && formValidCopy.spouseNationality)
        : true;

    formValidCopy.btnactive = baseValid && spouseValid;

    setErrors(errorsCopy);
    setFormValid(formValidCopy);
  }

  function handleClear() {
    setData({
      fatherDetails: { fullName: "", nationality: "" },
      motherDetails: { fullName: "", nationality: "" },
      maritalStatus: "",
      spouseDetails: { fullName: "", nationality: "" },
    });
    setFormValid({
      fatherName: false, fatherNationality: false,
      motherName: false, motherNationality: false,
      maritalStatus: false, spouseName: false, spouseNationality: false,
      btnactive: false,
    });
  }

  function handleNext() {
    handleChange("familyDetails", data);
    nextStep();
  }

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Step 4 of 8</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 24, color: "var(--text-primary)" }}>Family Details</h2>

      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Father's Details</p>
      <div className="form-group">
        <label>Father's Full Name</label>
        <input name="fatherDetails.fullName" placeholder="Enter your Father's Name" value={data.fatherDetails.fullName} onChange={handleInput} />
        {errors.fatherNameErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.fatherNameErr}</span>}
      </div>
      <div className="form-group">
        <label>Father Nationality</label>
        <input name="fatherDetails.nationality" placeholder="Enter your Father's Nationality" value={data.fatherDetails.nationality} onChange={handleInput} />
        {errors.fatherNationalityErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.fatherNationalityErr}</span>}
      </div>

      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12, marginTop: 8 }}>Mother's Details</p>
      <div className="form-group">
        <label>Mother's Full Name</label>
        <input name="motherDetails.fullName" placeholder="Enter your Mother's Name" value={data.motherDetails.fullName} onChange={handleInput} />
        {errors.motherNameErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.motherNameErr}</span>}
      </div>
      <div className="form-group">
        <label>Mother Nationality</label>
        <input name="motherDetails.nationality" placeholder="Enter your Mother's Nationality" value={data.motherDetails.nationality} onChange={handleInput} />
        {errors.motherNationalityErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.motherNationalityErr}</span>}
      </div>

      <div className="form-group">
        <label>Marital Status</label>
        <select name="maritalStatus" value={data.maritalStatus} onChange={handleInput}>
          <option value="">Select</option>
          <option>Single</option>
          <option>Married</option>
          <option>Divorced</option>
          <option>Widowed</option>
        </select>
        {errors.maritalStatusErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.maritalStatusErr}</span>}
      </div>

      {data.maritalStatus === "Married" && (
        <>
          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Spouse Details</p>
          <div className="form-group">
            <label>Spouse Name</label>
            <input name="spouseDetails.fullName" placeholder="Enter your Spouse Name" value={data.spouseDetails.fullName} onChange={handleInput} />
            {errors.spouseNameErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.spouseNameErr}</span>}
          </div>
          <div className="form-group">
            <label>Spouse Nationality</label>
            <input name="spouseDetails.nationality" placeholder="Enter your Spouse Nationality" value={data.spouseDetails.nationality} onChange={handleInput} />
            {errors.spouseNationalityErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.spouseNationalityErr}</span>}
          </div>
        </>
      )}

      <div style={{ marginTop: 8 }}>
        <Buttons onPrev={prevStep} onNext={handleNext} onClear={handleClear} disableNext={!formValid.btnactive} />
      </div>
    </div>
  );
}

export default FamilyDetails;
