describe('angularjs homepage todo list', function() {
  it('should add a todo', function() {
    browser.get('https://angularjs.org');

    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);


    var projectCount = element.all(by.repeater('project in projectList.projects'));

    expect(projectCount.count()).toEqual(12);
    expect(projectCount.get(1).element(by.css('a')).getText()).toEqual('AngularJS');
    projectCount.get(1).element(by.css('i')).click();
    element(by.model('editProject.project.name')).clear();
    element(by.model('editProject.project.name')).sendKeys('AngularJS New');
    element(by.css('[ng-click="editProject.save()"]')).click();

    expect(projectCount.count()).toEqual(12);
    expect(projectCount.get(1).element(by.css('a')).getText()).toEqual('AngularJS New');

  });
});