import React, { useState, useEffect } from "react";
import Buttons from "./Buttons";

function AddressDetails({ nextStep, prevStep, handleChange, data: initialData = {} }) {
  const [data, setData] = useState({
    presentAddress: initialData.presentAddress || {
      addressLine: "",
      district: "",
      state: "",
      country: "",
      postalCode: "",
    },
    permanentAddress: initialData.permanentAddress || {
      sameAsPresent: false,
      addressLine: "",
      district: "",
      state: "",
      country: "",
      postalCode: "",
    },
  });

  const [errors, setErrors] = useState({
    pAddressErr: "",
    pCountryErr: "",
    perAddressErr: "",
    perCountryErr: "",
  });

  const [formValid, setFormValid] = useState({
    pAddress: false,
    pCountry: false,
    perAddress: false,
    perCountry: false,
    btnactive: false,
  });

  useEffect(() => {
    if (
      data.presentAddress.addressLine &&
      data.presentAddress.country &&
      (data.permanentAddress.sameAsPresent ||
        (data.permanentAddress.addressLine && data.permanentAddress.country))
    ) {
      setFormValid({
        pAddress: true,
        pCountry: true,
        perAddress: true,
        perCountry: true,
        btnactive: true,
      });
    }
  }, [data]);

  function handleInput(e) {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split(".");

    let updatedData = {
      ...data,
      [section]: {
        ...data[section],
        [field]: type === "checkbox" ? checked : value,
      },
    };

    if (name === "permanentAddress.sameAsPresent" && checked) {
      updatedData.permanentAddress = {
        ...updatedData.presentAddress,
        sameAsPresent: true,
      };
    }

    setData(updatedData);
    validateData(name, value, updatedData);
  }

  function validateData(name, value, updatedData) {
    const errorsCopy = { ...errors };
    const formValidCopy = { ...formValid };

    if (updatedData.presentAddress.addressLine === "") {
      errorsCopy.pAddressErr = "Address Line Required";
      formValidCopy.pAddress = false;
    } else {
      errorsCopy.pAddressErr = "";
      formValidCopy.pAddress = true;
    }

    if (updatedData.presentAddress.country === "") {
      errorsCopy.pCountryErr = "Country is Required";
      formValidCopy.pCountry = false;
    } else {
      errorsCopy.pCountryErr = "";
      formValidCopy.pCountry = true;
    }

    if (!updatedData.permanentAddress.sameAsPresent) {
      if (updatedData.permanentAddress.addressLine === "") {
        errorsCopy.perAddressErr = "Address Line is Required";
        formValidCopy.perAddress = false;
      } else {
        errorsCopy.perAddressErr = "";
        formValidCopy.perAddress = true;
      }
      if (updatedData.permanentAddress.country === "") {
        errorsCopy.perCountryErr = "Country is Required";
        formValidCopy.perCountry = false;
      } else {
        errorsCopy.perCountryErr = "";
        formValidCopy.perCountry = true;
      }
    } else {
      formValidCopy.perAddress = true;
      formValidCopy.perCountry = true;
    }

    formValidCopy.btnactive =
      formValidCopy.pAddress &&
      formValidCopy.pCountry &&
      formValidCopy.perAddress &&
      formValidCopy.perCountry;

    setErrors(errorsCopy);
    setFormValid(formValidCopy);
  }

  function handleClear() {
    setData({
      presentAddress: { addressLine: "", district: "", state: "", country: "", postalCode: "" },
      permanentAddress: { sameAsPresent: false, addressLine: "", district: "", state: "", country: "", postalCode: "" },
    });
    setFormValid({ pAddress: false, pCountry: false, perAddress: false, perCountry: false, btnactive: false });
  }

  function handleNext() {
    handleChange("addressDetails", data);
    nextStep();
  }

  return (
    <div className="card">
      <p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>Step 3 of 8</p>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, marginBottom: 24, color: "var(--text-primary)" }}>Address Details</h2>

      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Present Address</p>

      <div className="form-group">
        <label>Address Line</label>
        <input name="presentAddress.addressLine" placeholder="Enter the address Line" value={data.presentAddress.addressLine} onChange={handleInput} />
        {errors.pAddressErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.pAddressErr}</span>}
      </div>
      <div className="form-group">
        <label>District</label>
        <input name="presentAddress.district" placeholder="Enter the district" value={data.presentAddress.district} onChange={handleInput} />
      </div>
      <div className="form-group">
        <label>State</label>
        <input name="presentAddress.state" placeholder="Enter the state" value={data.presentAddress.state} onChange={handleInput} />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input name="presentAddress.country" placeholder="Enter the Country" value={data.presentAddress.country} onChange={handleInput} />
        {errors.pCountryErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.pCountryErr}</span>}
      </div>
      <div className="form-group">
        <label>Postal Code</label>
        <input name="presentAddress.postalCode" placeholder="Enter the postal code" value={data.presentAddress.postalCode} onChange={handleInput} />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <input
          type="checkbox"
          name="permanentAddress.sameAsPresent"
          checked={data.permanentAddress.sameAsPresent}
          onChange={handleInput}
          style={{ accentColor: "var(--accent)", width: 16, height: 16 }}
        />
        <label style={{ fontSize: 14, fontWeight: 400, textTransform: "none", letterSpacing: 0, cursor: "pointer" }}>
          Same as Present Address
        </label>
      </div>

      {!data.permanentAddress.sameAsPresent && (
        <>
          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 }}>Permanent Address</p>
          <div className="form-group">
            <label>Address Line</label>
            <input name="permanentAddress.addressLine" placeholder="Enter the address Line" value={data.permanentAddress.addressLine} onChange={handleInput} />
            {errors.perAddressErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.perAddressErr}</span>}
          </div>
          <div className="form-group">
            <label>District</label>
            <input name="permanentAddress.district" placeholder="Enter the district" value={data.permanentAddress.district} onChange={handleInput} />
          </div>
          <div className="form-group">
            <label>State</label>
            <input name="permanentAddress.state" placeholder="Enter the State" value={data.permanentAddress.state} onChange={handleInput} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input name="permanentAddress.country" placeholder="Enter the Country" value={data.permanentAddress.country} onChange={handleInput} />
            {errors.perCountryErr && <span style={{ fontSize: 12, color: "var(--status-rejected)" }}>{errors.perCountryErr}</span>}
          </div>
          <div className="form-group">
            <label>Postal Code</label>
            <input name="permanentAddress.postalCode" placeholder="Enter the postal code" value={data.permanentAddress.postalCode} onChange={handleInput} />
          </div>
        </>
      )}

      <div style={{ marginTop: 8 }}>
        <Buttons onPrev={prevStep} onNext={handleNext} onClear={handleClear} disableNext={!formValid.btnactive} />
      </div>
    </div>
  );
}

export default AddressDetails;
