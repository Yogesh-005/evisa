import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";

function PersonalDetails({ nextStep, handleChange, data: initialData = {} }) {
  const [data, setData] = useState({
    fullName: initialData.fullName || "",
    gender: initialData.gender || "",
    dateOfBirth: initialData.dateOfBirth || "",
    placeOfBirth: initialData.placeOfBirth || "",
    nationalIdNo: initialData.nationalIdNo || "",
    nationality: initialData.nationality || "",
    educationQualification: initialData.educationQualification || "",
  });

  const [errors, setErrors] = useState({
    fullNameErr: "",
    genderErr: "",
    dateOfBirthErr: "",
    placeOfBirthErr: "",
    nationalIdNoErr: "",
    nationalityErr: "",
    educationQualificationErr: "",
  });

  const [formValid, setFormValid] = useState({
    fullName: false,
    gender: false,
    dateOfBirth: false,
    placeOfBirth: false,
    nationalIdNo: false,
    nationality: false,
    educationQualification: false,
    btnactive: false,
  });

  useEffect(() => {
    if (
      data.fullName &&
      data.gender &&
      data.dateOfBirth &&
      data.placeOfBirth &&
      data.nationalIdNo &&
      data.nationality &&
      data.educationQualification
    ) {
      setFormValid({
        fullName: true,
        gender: true,
        dateOfBirth: true,
        placeOfBirth: true,
        nationalIdNo: true,
        nationality: true,
        educationQualification: true,
        btnactive: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorMessages = {
    fullName_required_err: "Name is Required",
    fullName_regex_err: "Name should only contain alphabets",
    fullName_length_err: "Name should contain min 3 characters",
    gender_required_err: "Select the Gender",
    dateOfBirth_required_err: "Date of Birth is required",
    dateOfBirth_err: "Date of Birth cannot be in the future",
    placeOfBirth_required_err: "Birth Place is required",
    placeOfBirth_regex_err: "Birth place should contain only alphabets",
    nationalIdNo_err: "National Id is required",
    nationality_err: "Nationality is required",
    nationality_regex_err: "Nationality should contain only alphabets",
    educationQualification_err: "Education Qualification is required",
  };

  function handleInput(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    validateData(name, value);
  }

  function validateData(fieldName, fieldValue) {
    const errorsCopy = { ...errors };
    const formValidCopy = { ...formValid };

    switch (fieldName) {
      case "fullName":
        if (fieldValue === "") {
          errorsCopy.fullNameErr = errorMessages.fullName_required_err;
          formValidCopy.fullName = false;
        } else if (fieldValue.length < 3) {
          errorsCopy.fullNameErr = errorMessages.fullName_length_err;
          formValidCopy.fullName = false;
        } else if (!/^[A-Za-z ]+$/.test(fieldValue)) {
          errorsCopy.fullNameErr = errorMessages.fullName_regex_err;
          formValidCopy.fullName = false;
        } else {
          errorsCopy.fullNameErr = "";
          formValidCopy.fullName = true;
        }
        break;

      case "gender":
        if (fieldValue === "") {
          errorsCopy.genderErr = errorMessages.gender_required_err;
          formValidCopy.gender = false;
        } else {
          errorsCopy.genderErr = "";
          formValidCopy.gender = true;
        }
        break;

      case "dateOfBirth":
        if (fieldValue === "") {
          errorsCopy.dateOfBirthErr = errorMessages.dateOfBirth_required_err;
          formValidCopy.dateOfBirth = false;
        } else if (new Date(fieldValue) > new Date()) {
          errorsCopy.dateOfBirthErr = errorMessages.dateOfBirth_err;
          formValidCopy.dateOfBirth = false;
        } else {
          errorsCopy.dateOfBirthErr = "";
          formValidCopy.dateOfBirth = true;
        }
        break;

      case "placeOfBirth":
        if (fieldValue === "") {
          errorsCopy.placeOfBirthErr = errorMessages.placeOfBirth_required_err;
          formValidCopy.placeOfBirth = false;
        } else if (!/^[A-Za-z ]+$/.test(fieldValue)) {
          errorsCopy.placeOfBirthErr = errorMessages.placeOfBirth_regex_err;
          formValidCopy.placeOfBirth = false;
        } else {
          errorsCopy.placeOfBirthErr = "";
          formValidCopy.placeOfBirth = true;
        }
        break;

      case "nationalIdNo":
        if (fieldValue === "") {
          errorsCopy.nationalIdNoErr = errorMessages.nationalIdNo_err;
          formValidCopy.nationalIdNo = false;
        } else {
          errorsCopy.nationalIdNoErr = "";
          formValidCopy.nationalIdNo = true;
        }
        break;

      case "nationality":
        if (fieldValue === "") {
          errorsCopy.nationalityErr = errorMessages.nationality_err;
          formValidCopy.nationality = false;
        } else if (!/^[A-Za-z ]+$/.test(fieldValue)) {
          errorsCopy.nationalityErr = errorMessages.nationality_regex_err;
          formValidCopy.nationality = false;
        } else {
          errorsCopy.nationalityErr = "";
          formValidCopy.nationality = true;
        }
        break;

      case "educationQualification":
        if (fieldValue === "") {
          errorsCopy.educationQualificationErr = errorMessages.educationQualification_err;
          formValidCopy.educationQualification = false;
        } else {
          errorsCopy.educationQualificationErr = "";
          formValidCopy.educationQualification = true;
        }
        break;

      default:
        break;
    }

    formValidCopy.btnactive =
      formValidCopy.fullName &&
      formValidCopy.gender &&
      formValidCopy.dateOfBirth &&
      formValidCopy.placeOfBirth &&
      formValidCopy.nationalIdNo &&
      formValidCopy.nationality &&
      formValidCopy.educationQualification;

    setFormValid(formValidCopy);
    setErrors(errorsCopy);
  }

  function handleNext() {
    handleChange("personalDetails", data);
    nextStep();
  }

  function handleClear() {
    setData({
      fullName: "",
      gender: "",
      dateOfBirth: "",
      placeOfBirth: "",
      nationalIdNo: "",
      nationality: "",
      educationQualification: "",
    });
    setErrors({
      fullNameErr: "",
      genderErr: "",
      dateOfBirthErr: "",
      placeOfBirthErr: "",
      nationalIdNoErr: "",
      nationalityErr: "",
      educationQualificationErr: "",
    });
    setFormValid({
      fullName: false,
      gender: false,
      dateOfBirth: false,
      placeOfBirth: false,
      nationalIdNo: false,
      nationality: false,
      educationQualification: false,
      btnactive: false,
    });
  }

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Step 1 of 8</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 24, color: "var(--text-primary)" }}>Personal Details</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input name="fullName" placeholder="Enter your full name" value={data.fullName} onChange={handleInput} />
        {errors.fullNameErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.fullNameErr}</span>}
      </div>

      <div className="form-group">
        <label>Gender</label>
        <div style={{ display: "flex", gap: 20, paddingTop: 4 }}>
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="radio" name="gender" value={g} checked={data.gender === g} onChange={handleInput} />
              {g}
            </label>
          ))}
        </div>
        {errors.genderErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.genderErr}</span>}
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" name="dateOfBirth" value={data.dateOfBirth} onChange={handleInput} />
        {errors.dateOfBirthErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.dateOfBirthErr}</span>}
      </div>

      <div className="form-group">
        <label>Place of Birth</label>
        <input name="placeOfBirth" placeholder="Enter your place of Birth" value={data.placeOfBirth} onChange={handleInput} />
        {errors.placeOfBirthErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.placeOfBirthErr}</span>}
      </div>

      <div className="form-group">
        <label>Nationality</label>
        <input name="nationality" placeholder="Enter your Nationality" value={data.nationality} onChange={handleInput} />
        {errors.nationalityErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.nationalityErr}</span>}
      </div>

      <div className="form-group">
        <label>National ID</label>
        <input name="nationalIdNo" placeholder="Enter your National Id" value={data.nationalIdNo} onChange={handleInput} />
        {errors.nationalIdNoErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.nationalIdNoErr}</span>}
      </div>

      <div className="form-group">
        <label>Education</label>
        <select name="educationQualification" value={data.educationQualification} onChange={handleInput}>
          <option value="">Select Education</option>
          <option>Below Matric</option>
          <option>Graduate</option>
          <option>Post Graduate</option>
          <option>Professional</option>
          <option>Other</option>
        </select>
        {errors.educationQualificationErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.educationQualificationErr}</span>}
      </div>

      <div className="w-100 mt-3">
        <Buttons onNext={handleNext} onClear={handleClear} disableNext={!formValid.btnactive} />
      </div>
    </div>
  );
}

export default PersonalDetails;
