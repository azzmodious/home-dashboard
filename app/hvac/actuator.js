function Actuator(name, init_state){
    this.name = name; 
    this.state = init_state;
}

Actuator.prototype.getName = function(){
    return this.name;
}

Actuator.prototype.setName = function(newName){
    this.name = newName;
}

Actuator.prototype.getState = function(){
    return this.state;
}

Actuator.prototype.setState = function(newState){
    this.state = newState;
}