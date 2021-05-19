import React from 'react';

import "./top-panel.css"

const TopPanel = () => {
    return (
        <div className="pos-f-t">
            <nav className="navbar " >
                <h4 className=" col-md-3" >MC Skin Editor</h4>
                <div className="container col-md-7">                    
                   
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
                <div className="btn-group col-md-2" role="group" aria-label="Basic example">
                        <button className="btn btn-primary" type="button" >AIPhoto</button>
                        <button className="btn btn-primary" type="button" >Export</button>
                </div>
            </nav>
        </div>
    );
};

export default TopPanel;