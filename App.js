import React, { useState } from 'react';
import Form from './Form';
import Team from './Freind';
import * as yup from 'yup';
import axios from 'axios';
import formSchema from './formSchema'

const initialFormValues = {
    name: '',
    email: '',
    password: '',
    tos: false,

}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  
}

const users = []
const initialDisabled = true

const App = () => {
    const [user, setUser] = useState(users)
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)


    const onInputChange = (event) => {
        const { name } = event.target.name;
        const { value } = event.target.value;

        yup
      .reach(formSchema, name)
      
      .validate(value)
    
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: ""
        })
      })
      
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })

    // setFormValues({ 
    //         ...formValues, 
    //         [name]: value 
    //     });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (
            !formValues.name.trim() ||
            !formValues.email.trim() ||
            !formValues.password.trim() 
        ) { return 'Please enter all required fields' }

        const newUser = { ...formValues };

        setUser([newUser, ...team ]);

        setFormValues(initialFormValues);
    };

    

    const onCheckboxChange = evt => {
        const { name } = evt.target
        const { checked } = evt.target

        setFormValues({
        ...formValues,
        tos: {
            ...formValues.tos,
            [name]: checked, 
        }
        })
    }

//     const postNewFriend = newFriend => {
    
//     axios.post('https://reqres.in/api/users', newUser)
//       .then(res => {
//         setUser([res.data, ...users])
//       })
//       .catch(err => {
//         debugger
//       })
//       .finally(() => {
//         setFormValues(initialFormValues)
//       })
//   }

    return (
        <div className='App'>
            <Form 
                values={formValues}
                onInputChange={onInputChange}
                onSubmit={onSubmit}
                disabled={disabled}
                onCheckboxChange={onCheckboxChange}
            />

            {
                user.map(users => {
                    return (
                         <Team key={users.id} details={users} />
                     )
                })
            }
        </div>
    );
};
    


export default App;

