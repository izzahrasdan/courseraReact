import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
import DishDetail from "./DishdetailComponent";


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //default: any dish is not selected yet
                selectedDish: null
            }
    }

    onDishSelect(dish) {
            this.setState({ selectedDish: dish});
    }

    render() {
        /*..map been used alternate the details in dishes*/
        /*for every dish will return layout*/
        const menu = this.props.dishes.map((dish) => {
            return (
                <div  key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <DishDetail selectDish={this.state.selectedDish}/>
            </div>
        );
    }
}

export default Menu;