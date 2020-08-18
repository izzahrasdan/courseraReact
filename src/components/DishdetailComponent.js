import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

//user define components always starts with a capital letter
    function RenderDish({dish}){
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
                        <RenderComments comments={dish.comments} />
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

    function RenderComments({comments}){
        if(comments != null){
                       const commentDetail = comments.map((comment) => {
                            return(
                                <ul className="list-unstyled">
                                    <li>
                                        <p>{comment.comment}</p>
                                    </li>
                                    <li>
                                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
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

    const DishDetail = (props) => {
        const dish = props.selectDish;

        return(
            <div className="container">
                <RenderDish dish={dish} />
            </div>
        );
    }


export default DishDetail;