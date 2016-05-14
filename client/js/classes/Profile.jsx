Profile = React.createClass({
  getRoutine() {
    let routine = {
        'routine_day' : 2,
        'purpose' : 'Aceleración Metabólica',
        'objective' : 'Entrenamiento De Handball',
        'exercises' : [
            {
                '_id' : 1,
                'name' : 'Movimiento articular',
                'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                'category' : 'Calentamiento',
                'duration' : 5,
                'series'   : [{'number':1,  'status' :'finished' , 'type' : 'timed'}],
                'status'   : 'finished',
                'logo'     : 'images/exercise2.jpg'
            },
            {
                '_id' : 2,
                'name' : 'Abdominales en Plancha',
                'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                'category' : 'Zona Media',
                'series' : [{'number':1 , 'status' :'finished', 'duration' : 30,'type' : 'timed'},
                            {'number':2 , 'status' :'finished','duration' : 30, 'type' : 'timed'},
                            {'number':3 , 'status' :'finished','duration' : 30, 'type' : 'timed'},
                            {'number':4 , 'status' :'finished','duration' : 30, 'type' : 'timed'} ],
                
                'status' :'finished',
                'logo'     : 'images/exercise1.jpg'
            },
            {
                '_id' : 3,
                'name' : 'Abdominales Colgado',
                'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                'category' : 'Zona Media',
                'series' : [{'number':1 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':2 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':3 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':4 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8} ],
                'status' :'finished',
                'logo'     : 'images/exercise3.jpg'
            },
            {
                '_id' : 4,
                'name' : 'Arranques',
                'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                'category' : 'Activador',
                'series' : [{'number':1 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':2 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':3 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':4 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8} ],
                'recommended_weight' : 10,
                'recommended_weight_measure' : 'Kg',
                'status' :'finished',
                'logo'     : 'images/exercise4.jpg'
            },
            {
                '_id' : 4,
                'name' : 'Sentadillas',
                'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                'category' : 'Potencia',
                'series' : [{'number':1 , 'status' :'finished', 'type' : 'repetitions' , 'repetitions' : 8},
                            {'number':2 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':3 , 'status' :'finished', 'type' : 'repetitions', 'repetitions' : 8},
                            {'number':4 , 'status' :'going on', 'type' : 'repetitions', 'repetitions' : 8} ],
                'recommended_weight' : 25,
                'recommended_weight_measure' : 'Kg',
                'status'   : 'going on',
                'logo'     : '/images/exercise5.jpg'
            },
            {
                '_id' : 5,
                'name' : 'Pique Corto',
                'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                'category' : 'Potencia',
                'series' : [{'number':1 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15},
                            {'number':2 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15},
                            {'number':3 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15},
                            {'number':4 , 'status' :'to do', 'type' : 'repetitions', 'repetitions' : 8, 'rest' : 15}],
                'status'   : 'to do',
                'logo'     : '/images/exercise1.jpg'
            },
            {
                '_id' : 6,
                'name' : 'Circuito',
                'description' : 'Los ejercicios abdominales sirven para fortalecer los músculos abdominales. ',
                'category' : 'Aceleración Metabólica',
                'series' : [
                    {
                        'name' : 'Coordinativo Escalera',
                        'category' : 'Coordinación',
                        'description' : 'A mover las patas ameo ',
                        'type' : 'timed',
                        'duration' : 15,
                        'rest' : 15,
                        'logo'     : '/images/exercise1.jpg'

                    },
                    {
                        'name' : 'Golpes con pesas',
                        'category' : 'Coordinación',
                        'description' : 'Tirar piñas te cansa un monton ',
                        'recommended_weight' : 2,
                        'recommended_weight_measure' : 'Kg',
                        'type' : 'timed',
                        'duration' : 15,
                        'rest' : 15,
                        'logo'     : '/images/exercise2.jpg'
                    },
                    {
                        'name' : 'Lanzamiento de pelota a la pared',
                        'category' : 'Coordinación',
                        'description' : 'Lanzamiento de pelota para fortalecer zona media y brazos ',
                        'recommended_weight' : 5,
                        'recommended_weight_measure' : 'Kg',
                        'type' : 'timed',
                        'duration' : 15,
                        'rest' : 15,
                        'logo'     : '/images/exercise4.jpg'
                    },
                    {
                        'name' : 'Saltos',
                        'category' : 'Coordinación',
                        'description' : 'Saltar es una masa',
                        'type' : 'timed',
                        'duration' : 15,
                        'rest' : 15,
                        'logo'     : '/images/exercise5.jpg'
                    }
                    ],
                'duration' : 30,
                'circuit': true,
                'status'   : 'to do'
            },
            {
                '_id' : 7,
                'name' : 'Elongación',
                'category' : 'Elongación',
                'description' : 'Si no elongas mañana te va a doler hasta el culo ',
                'status'   : 'to do',
                'series'    : [{'number':1,  'status' :'to do'}],
                'logo'     : '/images/exercise1.jpg'
            }
        ],
    };
    this.routine = routine;
  },
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    // Add "checked" and/or "private" to the className when needed
    const taskClassName = (this.props.task.checked ? "checked" : "") + " " +
      (this.props.task.private ? "private" : "");

    return (
      <div class="thumbnail">
        <img src="..." alt="..." />
        <div class="caption">
          <h3>{this.props.profile.name} {this.props.profile.lastName}</h3>
          <p>
            <span>Dni:</span>
            <span>{this.props.profile.dni}</span>
          </p>
          <p>
            <span>Teléfono:</span>
            <span>{this.props.profile.phone}</span>
          </p>
          <p>
            <span>Grupo y Factor:</span>
            <span>{this.props.profile.bloodType}</span>
          </p>
          <p>
            <span>Peso:</span>
            <span>{this.props.profile.weight}</span>
          </p>
          <p>
            <span>Altura:</span>
            <span>{this.props.profile.height}</span>
          </p>
          <p>
            <span>Email:</span>
            <span>{this.props.profile.email}</span>
          </p>
          <p>
            <span>Fecha de nacimiento:</span>
            <span>{this.props.profile.birthDate}</span>
          </p>
          <div class="collapse" id="collapseEditProfile">
            <div class="well">
              <form ng-submit="pVm.edit()">
                <div class="form-group">
                    <label for="name">Nombre</label>
                    <input type="text" class="form-control" id="name" placeholder="Nombre"  required/>
                    <label for="name">Apellido</label>
                    <input type="text" class="form-control" id="lastName" placeholder="Apellido" ng-model="pVm.profile.lastName" required/>
                    <label for="dni">Dni</label>
                    <input type="text" class="form-control" id="dni" placeholder="Dni" ng-model="pVm.profile.dni" required/>
                    <label for="name">Teléfono</label>
                    <input type="text" class="form-control" id="phone" placeholder="Teléfono" ng-model="pVm.profile.phone" />
                    <label for="bloodType">Grupo y Factor</label>
                    <input type="text" class="form-control" id="bloodType" placeholder="A+" ng-model="pVm.profile.bloodType" />
                    <label for="weight">Peso</label>
                    <input type="text" class="form-control" id="weight" placeholder="80" ng-model="pVm.profile.weight" />
                    <label for="height">Altura</label>
                    <input type="text" class="form-control" id="height" placeholder="Altura" ng-model="pVm.profile.height" />
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="xxxx@yyy.com" ng-model="pVm.profile.email" />
                    <label for="birthDate">Fecha de nacimiento</label>
                    <input type="text" class="form-control" id="birthDate" placeholder="15/08/1990" ng-model="pVm.profile.birthDate" />
                    <button type="submit" class="btn btn-default">Submit</button>
                </div>
              </form> 
            </div>
          </div>
          <p>
            <a href="#" class="btn btn-default" role="button">Cambiar Foto</a>
            <a href="#" class="btn btn-primary" role="button" data-toggle="collapse" data-target="#collapseEditProfile" aria-expanded="false" aria-controls="collapseEditProfile">Editar</a>
            <a href="#" ng-click="pVm.create()" class="btn btn-default" role="button">Crear Perfil</a>
          </p>
        </div>
    </div>
    );
  }
});