const app = {



    func2: () => {
        const func = require("./script");
        func(func1);
    },

    func1: () => {
        console.log("hello world");
    },


}

app.func2();

console.log(app);