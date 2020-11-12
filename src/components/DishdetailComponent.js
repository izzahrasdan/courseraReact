import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Button, Label, Row} from 'reactstrap';
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";

//user define components always starts with a capital letter
    function RenderDish({dish}){
            return (
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={baseUrl + dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
    }

    function RenderComments({comments, addComment, dishId}){
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
                           <div  className="col-12 col-md-5 m-1">
                               <h4>Comments</h4>
                               {commentDetail}
                               <CommentForm dishId={dishId} addComment={addComment} />
                           </div>
                       );
        }
        else{ return (<div></div>); }
    }

    const DishDetail = (props) => {
        if (props.isLoading){
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row row-content">
                        <RenderDish dish={props.dish} />
                        <RenderComments
                            comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            );
        }
        else
            {return (<div></div>);}

    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => (val) && (val.length >= len);

    class CommentForm extends Component {
        constructor(props) {
            super(props);

            this.state = {
                isCommentOpen: false
            };
            this.toggleComment = this.toggleComment.bind(this);
            this.handleComment = this.handleComment.bind(this);

        }

        toggleComment() {
            this.setState({
                isCommentOpen: !this.state.isCommentOpen
            });
        }

        handleComment(values) {
            this.toggleComment();
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        }

        render() {
            return(
                <>
                    <Button outline onClick={this.toggleComment}>
                        <div className="fa fa-pencil fa-md">
                            Submit Comment
                        </div>
                    </Button>
                    <Modal isOpen={this.state.isCommentOpen} toggle={this.toggleComment}>
                        <ModalHeader toggle={this.toggleComment}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div className="col-12 col-md-9">
                            <LocalForm onSubmit={(values) => this.handleComment(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="name">Your Name</Label>
                                    <Control.text model=".name" id="name" name="name" placeholder="Enter Your Name" className="form-control"
                                                  validators={{required, minLength: minLength(3), maxLength:maxLength(15)}}
                                    />
                                    <Errors model=".name" className="text-danger" show="touched"
                                            messages={
                                                { required: 'Required ',
                                                    minLength: 'Must be greater than 2 characters ',
                                                    maxLength: 'Not more than 15 characters '}
                                            }
                                    />
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment" rows="6" placeholder="Your comment" className="form-control" />
                                </Row>
                                <Row className="form-group">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Row>
                            </LocalForm>
                            </div>
                        </ModalBody>
                    </Modal>
                </>
            );
        }
    }


export default DishDetail;