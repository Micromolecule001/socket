import React from 'react';
import { setError } from '../App';

export const errorComponent = () => {
    return (
        <div>
            <h2> word is already exist </h2>
            {setError(false)};
        </div>
    )
}
