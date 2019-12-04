module.exports = {
    apps: [
      {
        name: "cookie",
        script: "./cookie.js",
        watch: true,
        instances: 2,
        exec_mode: "cluster",
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "auth",
        script: "./auth.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "gateway",
        script: "./gateway.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
      {
        name: "app",
        script: "./app.js",
        watch: true,
        ignore_watch : ["node_modules"],
        watch: true,
      },
    ]
  }