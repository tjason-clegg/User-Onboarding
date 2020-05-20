import React from 'react'





const Form = (props) => {
    const { 
    values,
    onInputChange,
    onSubmit,
    disabled,
    erros,
    onCheckboxChange,
    } = props;

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Add a new user!</h2>
                <button disabled={disabled}>Submit</button>
            </div>
            <div>
                <label>
                Username
                <input
                    type='text'
                    placeholder='Enter your username'
                    maxLength='20'
                    name='name'
                    value={values.name}
                    onChange={onInputChange}
                    />
                </label>

                <label>
                Email
                <input
                    type='text'
                     placeholder='Enter your Email Adress'
                    maxLength='30'
                    name='email'
                    value={values.email}
                    onChange={onInputChange}
                    />

                </label>

                <label>
                Password
                <input
                    type='text'
                    placeholder='Enter your Password'
                    maxLength='30'
                    name='password'
                    value={values.password}
                    onChange={onInputChange}
                    />

                </label>

                <label>
                
                <input
                    type='checkbox'
                    name='reading'
                    checked={values.tos}
                    onChange={onCheckboxChange}
                />
                    I accept the Terms of Service
                </label>
            </div>
        </form>
    );  

    
};

export default Form;