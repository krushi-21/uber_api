import App from './app';

//creating new App instance and passing PORT number
const app = new App(Number(process.env.PORT));

app.listen();
