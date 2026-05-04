const { test, expect, _electron: electron } = require('@playwright/test');

test('End-to-end user workflow', async () => {
    // Launch the Electron app
    const electronApp = await electron.launch({ args: ['.'] });
    const window = await electronApp.firstWindow();

    const taskText = 'My new E2E test task';

    // --- TODO: Task 1: Add a new todo item ---
    // 1. Find the input field (use a locator like window.locator('#todo-input')).
    // 2. Type the `taskText` into it.
    // 3. Find and click the "Add" button.
    const inputField = window.locator('#todo-input');
    await inputField.fill(taskText);

    const addButton = window.locator('#add-todo-btn');
    await addButton.click();


    // --- TODO: Task 2: Verify the todo item was added ---
    // 1. Locate the new todo item in the list. A good locator might be `window.locator('.todo-item')`.
    // 2. Assert that its text content contains the `taskText`.
    const todoItem = window.locator('.todo-item').first();
    await expect(todoItem).toContainText(taskText);
    

    // --- TODO: Task 3: Mark the todo item as complete ---
    // 1. Find the checkbox within the new todo item.
    // 2. Click the checkbox.
    // 3. Assert that the todo item now has the 'completed' class.
    const checkbox = window.locator('.todo-item').first().locator('input[type="checkbox"]');
    await checkbox.click();

    const completedTodoItem = window.locator('.todo-item').first();
    await expect(completedTodoItem).toHaveClass(/completed/);


    // --- TODO: Task 4: Delete the todo item ---
    // 1. Find the delete button within the todo item.
    // 2. Click the delete button.
    // 3. Assert that the todo item is no longer visible on the page.
    const deleteButton = window.locator('.todo-item').first().locator('.delete-btn');
    await deleteButton.click();

    const todoItemAfterDelete = window.locator('.todo-item').first();
    await expect(todoItemAfterDelete).not.toBeVisible();


    // Close the app
    await electronApp.close();
});
