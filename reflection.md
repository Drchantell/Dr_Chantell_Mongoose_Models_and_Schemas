Reflection


1. Why is it beneficial to separate your routes, models, and database connection into different directories?

I think separating my routes, models, and database connection makes my project easier to read and understand. My database file is responsible for connecting to MongoDB, my model describes what a book should look like, and my routes handle the different API requests. Keeping these responsibilities separate also made it easier for me to troubleshoot the project when I had connection problems.

2. What is the difference between PUT and PATCH HTTP methods, and which one does your PUT /:id endpoint more closely resemble?

PUT is normally used when replacing or updating a complete resource, while PATCH is normally used when changing only part of a resource. My PUT route uses `req.body` with `findByIdAndUpdate()`.This means I can send only the fields that I want to change, so my route behaves more like a PATCH request even though the assignment requires me to use PUT.

3. In the DELETE route, what is a good practice for the response you send back to the client after a successful deletion?

I think a simple confirmation message is a good response because it clearly tells the client that the book was deleted successfully. In my project, the DELETE route returns `Book deleted successfully`. If the book cannot be found, the route returns a 404 response instead. This gives the client a clear result without sending unnecessary information.



Author: 
Dr. Chantell McDowell
Per Scholas Student
