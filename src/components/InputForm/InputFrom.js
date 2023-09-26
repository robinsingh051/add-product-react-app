import React, { useState, useReducer, useRef, useEffect } from "react";

const idReducer = (state, action) => {
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const nameReducer = (state, action) => {
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.trim().length > 0 };
  }
  return { value: "", isValid: false };
};

const InputForm = (props) => {
  const nameInputRef = useRef();
  const idInputRef = useRef();
  const categoryInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);

  const [idState, dispatchId] = useReducer(idReducer, {
    value: "",
    isValid: null,
  });

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(idState.isValid && nameState.isValid > 0);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [idState.isValid, nameState.isValid]);

  const idChangeHandler = (event) => {
    dispatchId({ type: "USER_INPUT", value: event.target.value });
  };

  const nameChangeHandler = (event) => {
    dispatchName({ type: "USER_INPUT", value: event.target.value });
  };

  const validateIdHandler = () => {
    dispatchId({ type: "INPUT_BLUR" });
  };

  const validateNameHandler = () => {
    dispatchName({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    console.log("on submit", formIsValid);

    event.preventDefault();
    if (formIsValid) {
      console.log(
        "valid",
        idState.value,
        nameState.value,
        categoryInputRef.current.value
      );
      props.onSubmit(
        idState.value,
        nameState.value,
        categoryInputRef.current.value
      );
      idInputRef.current.value = "";
      nameInputRef.current.value = "";
    } else if (!idState.isValid) {
      idInputRef.current.focus();
    } else {
      nameInputRef.current.focus();
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="id">Product ID</label>
        <input
          id="id"
          type="number"
          ref={idInputRef}
          value={idState.value}
          onChange={idChangeHandler}
          onBlur={validateIdHandler}
        ></input>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          type="text"
          ref={nameInputRef}
          value={nameState.value}
          onChange={nameChangeHandler}
          onBlur={validateNameHandler}
        ></input>
        <label htmlFor="cat">Product Category</label>
        <select id="cat" ref={categoryInputRef}>
          <option value="electronicItem">Electronics</option>
          <option value="personalCare">Personal Care</option>
          <option value="foodItem">Food Items</option>
        </select>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};
export default InputForm;
