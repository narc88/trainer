
UserCard = React.createClass({
  render() {
    // Just render a placeholder container that will be filled in
    return  <div class="media">
              <div class="media-left">
                <a href="#">
                  <img  class="media-object" 
                        src="https://scontent-gru2-1.xx.fbcdn.net/v/t1.0-9/12631511_10153655547818598_6704735405212584153_n.jpg?oh=67dc20749bdd53190dcda16441c482a3&oe=57858162" 
                        alt="Foto de perfil"
                        width="50px"/>
                </a>
              </div>
              <div class="media-body">
                <h4 class="media-heading">{user.name}</h4>
                {user.lastName}
              </div>
            </div>;
  }
});