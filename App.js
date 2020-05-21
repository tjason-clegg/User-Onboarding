import React, { useState, useEffect } from "react";
import Form from "./Form";
import UserList from "./Freind";
import formSchema from "./formSchema";
import axios from "axios";
import * as yup from "yup";

const initialUserList = [
  {
    name: "Jason",
    email: "tjason.clegg@gmail.com",
    password: "thats-cool",
    tos: true,
    id: 0,
  },
];

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  tos: false,
};

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
};

const initialDisabled = true;

const App = () => {
  const [users, setUsers] = useState(initialUserList);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  const postNewUser = (newUser) => {
    axios
      .post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users]);
      })
      .catch((error) => {
        console.error("Server Error", error);
      })
      .finally(() => {
        setFormValues(initialFormValues);
      });
  };

  const onInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((error) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });

    setFormValues({ ...formValues, [name]: value });
  };

  const onCheckboxChange = (event) => {
    const { name } = event.target;
    const { checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newUser = { ...formValues };
    postNewUser(newUser);
  };

  const deleteUser = (email) => {
    const valueToRemove = email;
    const filteredItems = users.filter((item) => item.id !== valueToRemove);
    setUsers(filteredItems);
  };

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  const checkLength = (array) => {
    if (array.length > 0) {
      array.map((user) => {
        return (
          <UserList deleteUser={deleteUser} key={user.id} details={user} />
        );
      });
    }
  };

  return (
    <div className="App">
      <Form
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        disabled={disabled}
        errors={formErrors}
        onCheckboxChange={onCheckboxChange}
      />
      {users.map((user) => {
        return (
          <UserList deleteUser={deleteUser} key={user.id} details={user} />
        );
      })}
    </div>
  );
};

export default App;
