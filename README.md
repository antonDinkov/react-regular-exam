# react-regular-exam

The course project is a Social Network. Due to limited time and lack of experience, the application is not fully completed, but it meets all the specified requirements.
The design of the application is inspired by X.com.
The application has both a public and a private section.
The public section is accessible without authentication and includes a guest page, login forms, and create account forms.
Logging into the application can be done in two ways: by creating a new account or by logging into an existing one.
In the application, the left section is the navigation, while the right section displays different pages.
The Welcome page features a keyword search bar. It loads all posts one below the other and includes infinite scroll pagination.
Each post has a message field and allows image uploads.
Below each post, there is a counter for comments, likes, and views.
Clicking on a post loads a detail page where comments can be read, and the post can be liked again. The counts for views, likes, and comments update in real time.
For the backend, I have used Firebase and Cloudinary. In Cloudinary, I store only the uploaded media, while the link to the media is saved in Firebase.
The requests to Firebase are made via the SDK, while the requests to Cloudinary are RESTful.
Only logged-in users can view the detail page, as well as like, post their own posts, and comment.
Only the owner of a post can delete or edit it.
The application features a responsive design, where for smaller screens, the navigation text is hidden, and only the icons remain visible.
Everything is custom-made, with no pre-made templates used. Each component has its own modular CSS.
Error handling is implemented in every function.
The application is deployed on GitHub Pages.
The application also features a functional profile page, which is mostly completed.
The non-functional pages redirect to an "Under construction" page.
Context, multiple hooks, and custom hooks have been used. The application is highly labor-intensive and full of features. I have made sure to eliminate all bugs in the working parts, even in the smallest details.
Validation has been added for the data during registration and post creation.
Lazy loading has been added for each route.
A function to prevent XSS attacks has been added.
Media queries have been added for mobile screen compatibility.
A spinner has been added in many places for a better user experience, along with new redirects.
The profile page and the edit functionality are fully completed.
I’m uploading the README at the last moment. Due to time constraints, it’s possible that I may have missed some important details.
I hope you are satisfied with the result!
