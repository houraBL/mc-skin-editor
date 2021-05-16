import React from 'react';

import MDBColorPicker from "mdb-react-color-picker";
import { MDBCard, MDBCardBody } from "mdbreact";

import "./tools.css"

const pickr1 = new Pickr({
    el: '#color-picker-1',
    default: "303030",
    components: {
      preview: true,
      opacity: true,
      hue: true,
  
      interaction: {
        hex: true,
      }
    }
  });

const Tools = () => {
    
    return (
        <div>
            <h5>Tools</h5>
            <ul className="item-list list-group list-group-flush list-group-item-action">
                <li className="list-group-item list-group-item-action">Bucket</li>
                <li className="list-group-item list-group-item-action">Pan</li>
                <li className="list-group-item list-group-item-action">Color
                <MDBCard>
                    <MDBCardBody>
                        <p className="text-center">
                            Click the dark square to activate the Color Picker
                        </p>
                        <MDBColorPicker
                            transitionType="linear"
                            isOpen={this.state.colorPicker1}
                            close={this.close}
                            getValue={this.saveColorValue}
                            colorSpace="hex"
                        >
                            <div
                            style={{ backgroundColor: this.state.colorPickerValue1 }}
                            className="pickr mx-auto"
                            onClick={this.toggle}
                            />
                        </MDBColorPicker>
                    </MDBCardBody>
                </MDBCard>
                </li>
                <li className="list-group-item list-group-item-action">Transparent</li>
                <li className="list-group-item list-group-item-action">Easer</li>
                <li className="list-group-item list-group-item-action">Random colors</li>
            </ul>
        </div>
    );
};

export default Tools;