# TodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.
It is a simple dashboard to visualize tasks and realted categories.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## How to Run the Application using Docker

To run the application using docker, execute the following command in the terminal where the docker file is located:

```bash
docker build -t your-image-name .
```

then to run the container 

```bash
docker run -p 80:80 your-image-name
```

This will start the application on the default port 80