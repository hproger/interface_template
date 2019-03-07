import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import axios from 'axios';
import ListDirections from './ListDirections';
class Directions extends Component {
    constructor() {
        super();
        this.state = {
            directions: [
                {id: 1, name: 'SIP Trunk 1 - onlinePBX'},
                {id: 2, name: 'SIP Trunk 1 - mongo'}
            ]
        };
    }
    getListDirections = () => {
        console.log('Загружаем направления...');
        /*axios
            .get(routes.schedule.list)
            .then(({ data }) => {
                this.setState({
                    users: data
                });
            })
            .catch(function (error) {
                console.log(error);
            });*/
    }
    componentWillMount() {
        this.getListDirections();
    }
   
    render() {
        return(
            <div className="page_directions">
                <BreadcrumbsItem to='/directions'>Направления</BreadcrumbsItem>
               
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <ListDirections
                            directions={this.state.directions}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Directions;