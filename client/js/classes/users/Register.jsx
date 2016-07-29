Register = React.createClass({
  getDefaultProps() {
    let loginMsg = "Already have an account?";
    return {
      loginLink: <p>{loginMsg} <a href="/login">Entrar</a></p>
    };
  },
  createUser(e) {
    e.preventDefault();
    const
      email = $('#email').val(),
      password = $('#password').val().trim()
    ;

    Accounts.createUser(
      {
        email: email,
        password: password
      },
      function(error) {
        if (error) {
          console.log("there was an error: " + error.reason);
        } else { 
          FlowRouter.go('/');
        };
      }
    );
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Registrate</h1>
            <EmailPasswordForm
              submitBtnLabel="Registrate"
              submitAction={this.createUser}
            />
           {this.props.loginLink}
        </div>
      </div>
    )
  }
});