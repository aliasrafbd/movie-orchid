import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <Link to="/"><button className='btn btn-success my-6'>Back to Home</button></Link>
            <h2 className='flex justify-center items-center font-bold text-5xl mt-60'>Not Found</h2>
        </div>
    );
};

export default ErrorPage;