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
    event.preventDefault();
    if (formIsValid) {
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
    <div className="mx-10 mt-5 text-center border border-gray-300 p-5 rounded-lg">
      <form onSubmit={submitHandler} className="flex flex-wrap">
        <div className="w-full px-3 mb-6">
          <label
            htmlFor="id"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Product ID
          </label>
          <input
            id="id"
            type="number"
            ref={idInputRef}
            value={idState.value}
            onChange={idChangeHandler}
            onBlur={validateIdHandler}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-full px-3 mb-6">
          <label
            htmlFor="name"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Product Name
          </label>
          <input
            id="name"
            type="text"
            ref={nameInputRef}
            value={nameState.value}
            onChange={nameChangeHandler}
            onBlur={validateNameHandler}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-full px-3 mb-6">
          <label
            htmlFor="cat"
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Product Category
          </label>
          <select
            id="cat"
            ref={categoryInputRef}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="Electronics">Electronics</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Food Items">Food Items</option>
          </select>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};
export default InputForm;
