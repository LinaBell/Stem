var AdminSubmitMusic = React.createClass({
	render: function() {
    	return (
      		<div className="artist-internal-wrapper-fluid pad-b-lg">
          		<div className="bg-white">  
              		<div>
		            	<div className="pad-box-lg">
		                	<h3>Submit Music</h3>
		                	<p>Submit music to be promoted to our creators</p>
		              	</div>    
	                	<SubmitMusicAlbum albumId={ this.props.albumId } />
	                	<SubmitMusicTrack albumId={ this.props.albumId } />
              		</div>    
          		</div>     
      		</div>
    );
  }
});