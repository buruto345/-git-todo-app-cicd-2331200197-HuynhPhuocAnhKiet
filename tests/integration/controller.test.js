const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();
        service.todos = []; // Reset singleton for tests
        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        controller.handleAddTodo('Test todo');
        
        const todos = service.getTodos();
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('Test todo');
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Todo to remove');
        const todoId = service.getTodos()[0].id;
        
        controller.handleRemoveTodo(todoId);
        
        expect(service.getTodos().length).toBe(0);
    });
});
