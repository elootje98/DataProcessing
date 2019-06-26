# Style guide

## When to use comments
Above every for-loop a comment should be placed. Also above every function a
comment should be made about what the function does. Comments always start
with two //. Try to not add comments at places where it is not necessary, this
keeps the code more comfortable to read for other people.
Above every comment there should be a line without code.

## Tabs or spaces for indentation
In javascript between all {} a tab to the right, for example in functions,
if/else-statements and for-loops.
In html a single tab is put to make clear that this part is part of a certain
block.

## Appropiate use of white space
Use white spaces between different variables. Also after block of code with
a certain purpose, an enter should be placed.

## Proper naming of variables and functions
Use capital letter if a variable consists of two words. For example: taxCountries.
The names should have a name that refers to the variable they hold. The names of
functions should also refer to what the function is doing. Also, names shouldn't
be too long.

## Code grouping an organization
The code for every chart should be put into a different file. Also all the
code should be put together in one separate folder. All the code will be loaded
in the header of the html file. There is one main function where the functions
get called.

## Patterns to be used
When functions are only small, you can make it nameless. However, if the
function is bigger and has a bigger function in the whole, it can not be nameles.
Also try to use 'var' as often as possible, such that no unwanted global
variables occur.

## Patterns to be avoided
Not using 'var' before creating a variable. Not watching the asynchronous way that
javascript can load code. If this is not done, major bugs can occur. Use for
example Promise statements to avoid this. 
