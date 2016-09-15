var AdminSubmitMusic = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	onSubmitClicked: function() {

	},
	render: function() {
    	return (
      		<div className="artist-internal-wrapper-fluid pad-b-lg">
          		<div className="bg-white">  
              		<div>
		            	<div className="pad-box-lg">
		                	<h3>Submit Music</h3>
		                	<p>Submit music to be promoted to our creators</p>
		              	</div>    
	                	<SubmitMusicAlbum 
	                		albumId={ this.props.albumId }
	                	/>
	                	<SubmitMusicTrack 
	                		ref="submitMusicTrack"
	                		albumId={ this.props.albumId }
                        	onSubmitClicked={ this.onSubmitClicked } 
                        	isSubmitting={ this.state.isSubmitting } 
                        	statusMessage={ this.state.statusMessage }
                        	isAdmin={ true }
	                	/>
              		</div>    
          		</div>     
      		</div>
    );
  }
});