
UserListItem = React.createClass({
	loadUser(){
		FlowRouter.go('/users/'+this.props.user._id);
	},
	render() {
	    return	<li className="list-group-item clickable" onClick={this.loadUser}>
	    			<div className="media">
						<div className="media-left">
						    <a href="#">
						    	<img className="media-object user-list-img img-circle" src="http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg"  alt="..." />
						    </a>
						</div>
						<div className="media-body">
						    <h4 className="media-heading">{this.props.user.name}</h4>
						    {this.props.user.description}
						</div>
		            </div>
		        </li>;
	}
});