import React, {Component} from 'react';
import {Navbar, NavbarBrand} from "reactstrap";
import Menu from './MenuComponent';
import DishDetail from "./DishdetailComponent";
import { DISHES } from "../shared/dishes";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId});
    }

    render() {
        return (
            <div className="App">
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                {/*to see either the dish id matches the dish details in selected dish*/}
                {/*filter keyword will supply as an array for the array details*/}
                <DishDetail selectDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </div>
        );
    }
}

export default Main;
