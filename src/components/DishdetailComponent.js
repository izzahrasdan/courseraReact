import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
        super(props);
    }

    renderDish(dish){
        if(dish != null){
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={dish.image} alt={dish.name}/>
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dish.comments)}
                    </div>
                </div>
            );
        }
        else
        {
            return(
                <div></div>
            );
        }
    }

    renderComments(comments){
        if(comments != null){
                       const commentDetail = comments.map((comment) => {
                            return(
                                <ul className="list-unstyled">
                                    <li>
                                        <p>{comment.comment}</p>
                                    </li>
                                    <li>
                                        <p>-- {comment.author}, {comment.date}</p>
                                    </li>
                                </ul>
                            );
                        });
                       return (
                           <div>
                               <h4>Comments</h4>
                               {commentDetail}
                           </div>
                       );
        }
        else{ return (<div></div>); }
    }

    render () {
        const dish = this.props.selectDish;

        return(
            <div>
                {this.renderDish(dish)}
            </div>
        );
    }
}

export default DishDetail;