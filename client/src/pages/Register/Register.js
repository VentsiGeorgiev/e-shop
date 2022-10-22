import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/Spinner';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repass: ''
    });

    const { name, email, password, repass } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {

        //  Redirect when logged in
        if (isSuccess || user) {
            navigate('/');
        }

        // dispatch(reset());
    }, [dispatch, isSuccess, navigate, user]);

    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        // [TODO] Add validation 

        const userData = {
            name,
            email,
            password
        };

        dispatch(register(userData));

    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isError && <Message text={message} />}
            <section>
                <form className='form' onSubmit={onSubmitHandler}>
                    <h2>Register</h2>
                    <div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={onChangeHandler}
                            placeholder="Name"
                            className='form__input'
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={onChangeHandler}
                            placeholder="Email"
                            className='form__input'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={onChangeHandler}
                            placeholder="Password"
                            className='form__input'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="repass"
                            id="repass"
                            value={repass}
                            onChange={onChangeHandler}
                            placeholder="Confirm password"
                            className='form__input'
                        />
                    </div>
                    <div>
                        <button className='btn'>Register</button>
                    </div>
                    <h3>Already have an account? <Link className='link' to='/sign-in'>Sign in.</Link> </h3>
                </form>
            </section>
        </>

    );
}

export default Register;