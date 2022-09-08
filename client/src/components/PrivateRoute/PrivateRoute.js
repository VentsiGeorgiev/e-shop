import { useNavigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import Spinner from '../Spinner/Spinner';

const PrivateRoute = () => {
    const { loggedIn, checkingStatus } = useAuthStatus();

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentPath = searchParams.get('redirect');


    if (checkingStatus) {
        return <Spinner />;
    }

    return loggedIn
        ? <Outlet /> : navigate(`/sign-in?redirect=${currentPath}`);


};

export default PrivateRoute;