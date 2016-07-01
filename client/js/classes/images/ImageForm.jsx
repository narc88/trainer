
ImageForm = React.createClass({
	getInitialState() {
		return {errors: {}}
  	},
  	componentDidMount(){
  		let imageUploaded = this.saveImage;
  		$.cloudinary.config({ cloud_name: 'db6uq4jy9', api_key: '346559593378446'});
  		$('.upload_form').append($.cloudinary.unsigned_upload_tag("yjiqelzg", 
  			{ cloud_name: 'db6uq4jy9' }));
  		$('.cloudinary_fileupload').unsigned_cloudinary_upload("yjiqelzg", 
		  { cloud_name: 'db6uq4jy9', tags: 'browser_uploads' }, 
		  { multiple: true }
		).bind('cloudinarydone', function(e, data) {

			$('.thumbnails').append($.cloudinary.image(data.result.public_id, 
			    { format: 'jpg', width: 150, height: 100, 
			      crop: 'thumb', gravity: 'face', effect: 'saturation:50' } ))
		
			imageUploaded(data.result);
		}).bind('cloudinaryprogress', function(e, data) { 

		  $('.progress-bar').css('width', 
		    Math.round((data.loaded * 100.0) / data.total) + '%'); 

		});
  	},
  	saveImage(image) {
  		Meteor.call('storeImage', image, function (error, result) {
  			//Redireccionar al recurso original.
  		});
  	},
  	getFormData() {
		var data = {
				image: this.refs.image.files[0] || undefined
			};
		return data;
  	},
  	render() {
		return 	<div className="form-horizontal">
					<label htmlFor="image" className="col-sm-4 control-label">Image</label>
					<div className="col-sm-6">
						<form className="upload_form"></form>
					</div>
					<div className="progress">
                        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" >
                        </div>
                    </div>
                    <div className="thumbnails"></div>
				</div>;
  	}
})