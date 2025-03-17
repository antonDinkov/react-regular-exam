import { Link } from "react-router";
function Login() {
    return (
        <>
            <header>
                <Link to='/react-regular-exam'><i className="fa-solid fa-xmark"></i></Link>
                <h1>At</h1>
            </header>
            <nav >
                <Link><i className="fa-brands fa-google"></i>Sign in with Google</Link>
                <Link><i className="fa-brands fa-apple"></i>Sign in with Apple</Link>
                <div >
                    <hr />
                    <p>or</p>
                    <hr />
                </div>
                <input type="text" placeholder="Phone, email, or username" />
                <Link to="/react-regular-exam/login/pass">Next</Link>
                <Link to="/react-regular-exam/guest">Forgot password?</Link>
                <p>Don't have an account?<Link to="/react-regular-exam/create">Sign up</Link></p>
            </nav>
        </>

    )
}

export default Login;