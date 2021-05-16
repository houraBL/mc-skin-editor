import React from 'react';

import './library.css';

const Library = () => {
    return (
        <div className="">
            <h5>Library</h5>
            <ul className="item-list list-group list-group-flush list-group-item-action">
                <li className="list-group-item list-group-item-action">Head</li>
                <li className="list-group-item list-group-item-action">Body</li>
                <li className="list-group-item list-group-item-action">Legs</li>
                <li className="list-group-item list-group-item-action">Boots</li>
                <li className="list-group-item list-group-item-action">Suit</li>
            </ul>
        </div>
    )
};

export default Library;