The backend was built using Go. The backend directory structure was loosely based on the [golang-standards/project-layout](https://github.com/golang-standards/project-layout) GitHub repository.

The main.go file is located within the cmd/movieapi directory.

### The backend makes use of the following third party libraries:
- Gin-gonic for API routing. Used in case middleware tasks like authentication or logging was needed and for the simplification of Path parameters.