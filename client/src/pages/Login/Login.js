import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repass: ''
    });

    const { email, password } = formData;

    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        // [TODO] Add validation 


    };

    return (
        <>
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