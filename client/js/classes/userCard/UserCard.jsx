
UserCard = React.createClass({
  render() {
    // Just render a placeholder container that will be filled in
    return  <div class="thumbnail">
              <img  class="media-object" 
                        src="https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/12631511_10153655547818598_6704735405212584153_n.jpg?oh=67dc20749bdd53190dcda16441c482a3&oe=57858162" 
                        alt="Foto de perfil"
                        width="50px"/>
              <div class="caption">
                <h3>{this.props.user.name}</h3>
                <p>...</p>
                <p><a href="#" class="btn btn-primary" role="button">Button</a> <a href="#" class="btn btn-default" role="button">Button</a></p>
              </div>
            </div>;
  }
});