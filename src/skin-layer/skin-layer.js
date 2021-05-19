import React from 'react';

import "./skin-layer.css"



export default class SkinLayers extends React.Component {
    state = {
        id: this.props.id,
        src: this.props.src,
        isMain: this.props.isMain,
        onEdit: false,
        onVisible: false,
        label: this.props.label,
    }
   

    componentDidMount() {

    }

    render() {
        const { onDeleted, onToggleHide} = this.props;
        //let className = 'skin-layer';

        if (this.props.hidden) {
            //className += ' hidden';
        }

        if (this.props.chosen){
            //className += ' chosen';
        }


        return (   
            <div className="list-group-item list-group-item-action">
                {this.state.isMain? (
                    <div>
                        <label>{this.state.label}</label>
                        <button type="button"
                            className="btn btn-outline-info float-right"
                            size="sm"
                            onClick={onToggleHide} disabled>
                        hide
                        </button>
                    </div>
                ):(
                    <div>

                        <label>{this.state.label}</label>
                        <button type="button"
                            className="btn btn-outline-danger float-right"
                            onClick={onDeleted}>
                            del
                        </button>
                        <button type="button"
                            className="btn btn-outline-info float-right"
                            onClick={onToggleHide}>
                        hide
                        </button>
                    </div>
                )}
            </div>
        );
    }
};
