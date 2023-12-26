function skillsMember() {
  var skills = ['HTML', 'CSS', 'JS', 'React', 'Node', 'Python', 'Django'];
  var member = {
    name: 'Sally Jones',
    age: 35,
    skills: skills,
    greet: function() {
      console.log('Hello, my name is ' + this.name + '.');
    }
  };
  return member;
}