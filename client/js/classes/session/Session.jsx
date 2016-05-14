// App component - represents the whole app
Session = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let subscription = Meteor.subscribe("sessions");

      return {
        isLoading: !subscription.ready(),
        session: Sessions.find({ _id : this.props.id} , { sort: { createdAt: -1 }, limit : 1 }).fetch()[0],
      };
  },
  render() {
      if ( this.data.isLoading ) {
        return <span></span>;
      }else{
        return <div>
                  <ul>
                    {this.data.session.exercises.map(function(object, i){
                      return <CompleteSessionExercise exercise={object} />;
                    })}
                  </ul>
                  <div className="modal fade" id="videoModal" tabindex="-1" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 className="modal-title">Video Ejercicio</h4>
                        </div>
                        <div className="modal-body">
                          <p><iframe width="565" height="338" src="https://www.youtube.com/embed/Tj75Arhq5ho" frameborder="0" allowfullscreen></iframe></p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal fade" id="infoModal" tabindex="-1" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 className="modal-title">Informacion Sobre el ejercicio</h4>
                        </div>
                        <div className="modal-body">
                          <p ng-bind=""></p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal fade" id="tipsModal" tabindex="-1" role="dialog">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                          <h4 className="modal-title">Tips para realizar el ejercicio</h4>
                        </div>
                        <div className="modal-body">
                          <p ng-bind=""></p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
      };
  }
});