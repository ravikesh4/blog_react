import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth'
import Router from 'next/router'

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: '',
        message: '',
        showForm: true
    })

    const {email,password , error , loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push('/')
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.table({name, email,password , error , loading, message, showForm})
        setValues({...values, loading: true, error: false})
        const user = {email, password}

        signin(user)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                // save user token to cookie 

                // save user info to local storage 
                console.log(data);
                
                // auth user 
                authenticate(data, () => {
                    if(isAuth() && isAuth.role === 1) {
                        Router.push(`/admin`)
                    } else {
                        Router.push(`/user`)
                    }
                });
            }
        })
        
    }

    const handleChange = (name) => (e) => {
        // console.log(e.target.value);
        setValues({ ...values, error: false, [name]: e.target.value})
        
    }

    const showLoading = () => (loading ? <div className="alert alert-info">Loading..</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input value={email} onChange={handleChange('email')} className="form-control" type="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <input value={password} onChange={handleChange('password')} className="form-control" type="password" placeholder="Enter your password" />
                </div>
                <div>
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
            </div>
        )
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
}

export default SigninComponent;