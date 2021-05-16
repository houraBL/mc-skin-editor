import React from 'react';

import "./top-panel.css"

const TopPanel = () => {
    return (
        <div className="pos-f-t">
            <nav className="navbar " >
                <h4 className="navbar-brand" >MC Skin Editor</h4>
                <div className="container">                    
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="btn-group" role="group" >
                        <button className="btn " type="button" >2d</button>
                        <button className="btn " type="button" >3d</button>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button className="btn  " type="button" >undo</button>
                        <button className="btn  " type="button" >redo</button>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button className="btn  " type="button" >-</button>
                        <input className="input " placeholder="100%" size="auto"></input>
                        <button className="btn  " type="button" >+</button>
                        <button className="btn " type="button" >[+]</button>
                    </div>                    
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                        <button className="btn btn-primary" type="button" >AIPhoto</button>
                        <button className="btn btn-primary" type="button" >Export</button>
                </div>
            </nav>
        </div>
    );
};

export default TopPanel;