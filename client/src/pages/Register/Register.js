import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import Message from '../../components/Message/Message';

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

    return (
        <>
            {isError && <Message text={message} />}

            <section>
                <h2>Register</h2>

                <form>

                </form>
            </section>
            <section>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={onChangeHandler}
                            placeholder="Name"
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
                        />
                    </div>
                    <div>
                        <button>Register</button>
                    </div>
                </form>
            </section>

            <section>
                <h3>Already Registered? <Link to='/sign-in'>Log in.</Link> </h3>
            </section>
        </>

    );
}

export default Register;