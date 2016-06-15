
ImageForm = React.createClass({
	getInitialState() {
		return {errors: {}}
  	},
  	componentDidMount(){
  		$.cloudinary.config({ cloud_name: 'db6uq4jy9', api_key: '346559593378446'})
  	},
  	handleSubmit() {

  	},
  	getFormData() {
		var data = {
				image: this.refs.image.files[0] || undefined
			};
		return data;
  	},
  	render() {
		return 	<div className="form-horizontal">
					{this.renderFileInput('image', 'Image')}
					<button onClick={this.handleSubmit}>Guardar</button>
				</div>;
  	},
 	renderFileInput(id, label) {
		return this.renderField(id, label,
	  								<input type="file" name={id} id={id} ref={id} accept="image/*" />
								);
  	},
  	renderField(id, label, field) {
		return <div>
					<label htmlFor={id} className="col-sm-4 control-label">{label}</label>
					<div className="col-sm-6">
						<input name="file" type="file" 
						   className="cloudinary-fileupload" data-cloudinary-field="image_id" 
						   data-form-data="{ 
							  &quot;timestamp&quot;:  1345719094, 
							  &quot;callback&quot;: &quot;https://www.example.com/cloudinary_cors.html&quot;,
							  &quot;signature&quot;: &quot;7ac8c757e940d95f95495aa0f1cba89ef1a8aa7a&quot;, 
							  &quot;api_key&quot;: &quot;346559593378446&quot; 
							}" >
						</input>
					</div>
				</div>;
	}
})