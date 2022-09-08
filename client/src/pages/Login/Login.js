import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import Message from '../../components/Message/Message';
import Spinner from '../../components/Spinner/Spinner';

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repass: ''
    });

    const { email, password } = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const path = searchParams.get('redirect');

    useEffect(() => {
        if (isSuccess || user) {
            path ? navigate(`/${path}`) : navigate('/');
        }
    }, [isSuccess, navigate, user, path]);

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
            email,
            password
        };

        dispatch(login(userData));


    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {isError && <Message text={message} />}
            <section>
                <h2>Login</h2>

                <form>

                </form>
            </section>
            <section>
                <form onSubmit={onSubmitHandler}>
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
                        <button>Login</button>
                    </div>
                </form>
            </section>

            <section>
                <h3>New to e-Shop? <Link to='/sign-up'>Create an account.</Link> </h3>
            </section>
        </>

    );
}

export default Login;