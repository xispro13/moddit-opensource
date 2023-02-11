blacket = {
    startLoading: () => $("body").append(`<div class="loaderModal"><div class="loader"><div class="blookContainerLoader loaderBox"><img loading="lazy" src="/content/logo.png" class="loaderBlook"></div><div class="styles__shadow___3OUHP-camelCase"></div></div></div>`),
    stopLoading: () => $(".loaderModal").remove(),
    // https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
    getParameter: (name) => {
        name = name.replace(/[\[\]]/g, "\\$&");
        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },
    requests: {
        get: (url, callback) => {
            if (!callback) callback = (data) => {}
            $.ajax({
                type: "GET",
                url: url,
                contentType: "application/json",
                success: (data) => callback(data),
                error: (data) => callback(data)
            });
        },
        post: (url, data, callback) => {
            if (!callback) callback = (data) => {}
            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(data),
                contentType: "application/json",
                success: (data) => callback(data),
                error: (data) => callback(data)
            });
        }
    }
}

blacket.startLoading();

$("head").append(`<link defer rel="stylesheet" href="/lib/css/all.css">`);

blacket.socket = io();
blacket.socket.on('connect', () => {
    console.log(`[Moddit] Connected to socket server.`);
    blacket.socket.onAny((event, ...args) => {
        console.log(event, args[0]);
    });
    blacket.socket.on('disconnect', () => {
        if ($("#socketModal").length > 0) return;
        console.log(`[Moddit] Disconnected from socket server.`);
        $("body").append(`<div id="socketModal" class="loaderModal"><div style="margin-top: 50px;" class="loader"><div class="blookContainerLoader loaderBox"><img loading="lazy" src="/content/logo.png" class="loaderBlook" /></div><div class="styles__shadow___3OUHP-camelCase"></div></div><div class="loader"><p class="loaderText">Reconnecting to socket</p></div></div>`);
        let dots = "";
        setInterval(() => {
            dots += ".";
            if (dots.length > 3) dots = "";
            $(".loaderText").html(`Reconnecting to socket${dots}`);
        }, 500);
        setInterval(() => {
            if (blacket.socket.connected) return $("#socketModal").remove();
            blacket.socket.connect();
        }, 2500);
    });
});

blacket.requests.get("/worker/config", (data) => {
    blacket.config = data;
    console.log(`%cWARNING!`, `font-size: 35px;`);
    console.log(`%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a ${blacket.config.name} feature or "hack" someone else's account, it is most likely a scam and will give them access to your account.`, `font-size: 20px;`);
    console.log(`%cIf you ignore this message and the script does work,t PLEASE contact a ${blacket.config.name} developer immediately.`, `font-size: 20px;`);
    console.log(`[Moddit] Running Moddit v${blacket.config.version}`);
    blacket.config.path = location.pathname.split("/")[1].replaceAll("/", "");
    if (blacket.config.path !== "") $("head").append(`<title>${blacket.config.path[0].toUpperCase() + blacket.config.path.slice(1)} | ${blacket.config.name}</title>`);
    else $("head").append(`<title>${blacket.config.name}</title>`);
});
