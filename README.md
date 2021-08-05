Used library mathjs to handle the actual logic of the calculator.

Used styled components as I didn't want to use a css framework/stylesheet for something so small.  

Had the most trouble figuring out how to do the transition when using the equals button cleanly, probably should look to use React Transition Group in future.

Tried to use TypeScript where possible.

Run with npm run start  

Notes/Todo:

- useEffect for keydown doesn't seem good - I imagine events are being added/removed every time expressions change which could cause memory/efficiency issues?
- The way keydown is done isn't clean either in terms of the code, it also means that there's no 'pressed' button effect when keys are pressed on the keyboard.
- 'nextValue' persists even after current expression is deleted - small issue, but could probably be fixed.