import React from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss'


import "./tools.css"

export default class Tools extends React.Component {
    state = {
        displayColorPicker: this.props.displayColorPicker,
        color: this.props.color,
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChange = (color) => {
        this.setState({ color: color.rgb })
        console.log(color);
    };

    render() {
        const styles = reactCSS({
            'default': {
              color: {
                width: '24px',
                height: '24px',
                borderRadius: '2px',
                background: `rgba(${ this.props.color.r }, ${ this.props.color.g }, ${ this.props.color.b }, ${ this.state.color.a })`,
              },
              swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
              },
              popover: {
                position: 'absolute',
                zIndex: '5',
              },
              cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
              },
            },
        });
        
        const {color, onColorChange, onSwatchClick, displayColorPicker} = this.props;
        
        return (
            <div className="d-block p-1">
                <h5>Tools</h5>
                <ul className="item-list list-group list-group-flush list-group-item-action">
                    <li className="list-group-item list-group-item-action">
                        <span className = 'row justify-content-center' >Skin parts</span>
                        <span className = 'row '>
                            <span className = 'col-md-6 justify-content-center'>Body</span>
                            <span className = 'col-md-6 justify-content-center'>Overlay</span>
                        </span>
                        <span className = 'row'>
                            <span className = 'col-md-6'>
                                <span className = 'row d-flex justify-content-center'>
                                    <div  className = " body-part" style={{
                                        width: '16px',
                                        height: '16px',                                        
                                        }}  >
                                    </div>
                                </span>
                                <span className = 'row justify-content-center'>
                                    <div  className = " body-part limb" style={{ }}  >
                                    </div>
                                    <div className = " body-part"  style={{
                                        width: '16px',
                                        height: '24px',                                            
                                        }}  >
                                    </div>
                                    <div className = " body-part limb"  style={{ }}  >
                                    </div>
                                </span>
                                <span className = "row justify-content-center">
                                    <div  className = " body-part limb" style={{ }}  >
                                    </div>
                                    <div  className = " body-part limb" style={{ }}  >
                                    </div>
                                </span>
                            </span>
                            <span className = 'col-md-6'>
                                <span className = 'row d-flex justify-content-center'>
                                    <div  className = " body-part" style={{
                                        width: '16px',
                                        height: '16px',                                        
                                        }}  >
                                    </div>
                                </span>
                                <span className = 'row justify-content-center'>
                                    <div  className = " body-part limb" style={{ }}  >
                                    </div>
                                    <div className = " body-part"  style={{
                                        width: '16px',
                                        height: '24px',                                            
                                        }}  >
                                    </div>
                                    <div className = " body-part limb"  style={{ }}  >
                                    </div>
                                </span>
                                <span className = "row justify-content-center">
                                    <div  className = " body-part limb" style={{ }}  >
                                    </div>
                                    <div  className = " body-part limb" style={{ }}  >
                                    </div>
                                </span>
                            </span>
                           
                        </span>
                    </li>
                    <li className="list-group-item list-group-item-action">Bucket
                       
                    </li>
                    <li className="list-group-item list-group-item-action">Pan</li>
                    <li className="list-group-item list-group-item-action">
                        <label>Color</label>
                        <div className=" float-right" style={ styles.color }  onClick={ onSwatchClick }/>
                        <div>
                            { displayColorPicker ? <div style={ styles.popover} >
                            <div style={ styles.cover} onClick={ onSwatchClick }/>
                            <SketchPicker color={ color } onChange={ onColorChange }  />
                            </div> : null }

                        </div>
                    </li>
                    <li className="list-group-item list-group-item-action">Transparent</li>
                    <li className="list-group-item list-group-item-action">Easer</li>
                    <li className="list-group-item list-group-item-action">Random colors</li>
                </ul>
            </div>
        );
    }
};
