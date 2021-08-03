
const app = {};

app.func2 = () => {
    const func = require("./script");
    func(app.func1);
}

app.func1 = () => {
    console.log("hello world");
}

app.func1();

console.log(app);