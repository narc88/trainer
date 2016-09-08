
Exercise = React.createClass({
	mixins: [ReactMeteorData],
	getMeteorData() {
		let subscription = Meteor.subscribe("exercises");
	    return {
	    	isLoading: !subscription.ready(),
	      	exercise: Exercises.find({ _id : this.props.id}, { sort: { createdAt: -1 } }).fetch()[0] || {},
	    };
	},
	render() {
		var template = '';
		if(!this.data.isLoading){
			template = 	<Card>
						    <CardHeader
							      title="URL Avatar"
							      subtitle="Subtitle"
							      avatar="http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg"
						    />
						    <CardMedia
						      	overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
						    >
						      	<img src="http://res.cloudinary.com/db6uq4jy9/image/upload/v1466101331/c2w7b99g3o21chn5bmxb.jpg" />
						    </CardMedia>
						    <CardTitle title={this.data.exercise.name} subtitle={this.data.exercise.description} />
						    <CardText>
							     {this.data.exercise.explanation}
							     {this.data.exercise.tips}
						    </CardText>
					  	</Card>;
	    }else{
	    	template = 	<Loading/>
	    }
	    return template;
	}
});