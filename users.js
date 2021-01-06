class users {
  constructor({
    id,
    name,
    location,
    phone,
    gender,
    position,
  }) {
    this.__id = id;
    this.__name = name;
    this.__location = location;
    this.__phone = phone;
    this.__gender = gender;
    this.__position = position;
  }

  get id() {
    return this.__id;
  }

  get name() {
    return this.__name ;
  }

  get location() {
    return this.__location;
  }

  get phone() {
    return  this.__phone;
  }

  get gender() {
    return this.__gender;
  }

  get position() {
    return this.__position;
  }

  send() {
    return [
      this.name,
      this.location,
      this.phone,
      this.gender,
      this.position,
      this.id
    ];
  }
}

module.exports = users;
