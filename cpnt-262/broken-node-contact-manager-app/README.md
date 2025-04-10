# List of Bugs

1) ReferenceError: express is not defined.

2) SyntaxError:  await is only valid in async functions and the top level bodies of modules.

3) SyntaxError: Missing catch or finally after try.

4) ReferenceError: your_jwt_secret_key is not defined - jwt secret key should be a string.

5) TypeError: Cannot create property 'next' on number '3001'. Use google to investigate.

6) 404 Not found Route Error: To reproduce:

- Go to <http://localhost:3001> home route.
- You should be redirected to the login route.

7) ReferenceError: userExists is not defined - Undeclared variable user in register route.

8) 404 Not found Route Error - To reproduce:  

- Go to <http://localhost:3001/register>.
- Register
- Then login, you should be redirected to the contacts route.

9) Logic error - To reproduce, try to add a contact, no contact is displayed.

10) Data error - To reproduce, add a contact and no contact is displayed becayse

11) ReferenceError: c is not defined - To reproduce, add a contact, change phone number and click the update button.

12) TypeError: Cannot read properties of undefined (reading 'id') - To reproduce, add a contact, delete the contact.

13) Routing Error - Clicking the log out button doesn't log the user out.

## Bonus

- Fix the possibility that users can add the same contact twice. Use email or phone number as the requirement.
