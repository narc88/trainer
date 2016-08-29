Login = React.createClass({
  getDefaultProps() {
    let registerMsg = "¿No tenes una cuenta todavía?";
    return {
      registerLink: <p>{registerMsg} <a href="/register">Register</a></p>
    };
  },
  loginWithPassword(e) {
    e.preventDefault();
    const email = $('#email').val(),
          password = $('#password').val().trim()
    ;

    Meteor.loginWithPassword(email, password, function(error) {
      if (error) {
        console.log("Hubo un error:" + error.reason);
      } else {
        FlowRouter.go('/');
      }
    });
  }, 
  loginWithFacebook() {
    Meteor.loginWithFacebook({}, function(err){
      if (err) {
        throw new Meteor.Error("Facebook login failed");
      }else{
        FlowRouter.go('/users/'+Meteor.userId());
      }
    });
  }, 
  render() {
        return (
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                  <EmailPasswordForm
                    submitBtnLabel="Login"
                    submitAction={this.loginWithPassword}
                  />
                        {this.props.registerLink}
              </div>
              <button id="facebook-login" onClick={this.loginWithFacebook} className="btn btn-default"> Entrar con Facebook</button>
            </div>
        )
    }
});
