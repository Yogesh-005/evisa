import React from "react";

function Buttons({ onNext, onPrev, onClear, onSubmit, disableNext }) {
  return (
    <div className="button-wrapper">
      <div className="left-buttons">
        {onPrev && (
          <button type="button" className="btn btn-outline" onClick={onPrev}>
            ← Back
          </button>
        )}
        {onClear && (
          <button type="button" className="btn btn-outline" onClick={onClear}>
            Clear
          </button>
        )}
      </div>
      <div>
        {onNext && (
          <button
            type="button"
            className={`btn ${disableNext ? "btn-outline" : "btn-primary"} me-2`}
            onClick={onNext}
            disabled={disableNext}
          >
            Next →
          </button>
        )}
        {onSubmit && (
          <button type="button" className="btn btn-success" onClick={onSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Buttons;
