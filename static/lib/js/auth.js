$(function reset() {
    if (blacket.config) {
        $(".styles__blooketText___1pMBG-camelCase").html(`${blacket.config.name}`);
        blacket.stopLoading();
    } else setTimeout(reset, 1);
});

$(".styles__input___2XTSp-camelCase").click(() => {
    if ($(".styles__errorContainer___1LbDZ-camelCase").length > 0) $(".styles__errorContainer___1LbDZ-camelCase").remove();
});

$(".styles__button___2hNZo-camelCase").click((event) => {
    blacket.startLoading();
    event.preventDefault();
    if ($(".styles__errorContainer___1LbDZ-camelCase").length > 0) $(".styles__errorContainer___1LbDZ-camelCase").remove();
    let username = $("input[type=text]").val();
    let password = $("input[type=password]").val();
    if (blacket.config.path == "register") {
        blacket.stopLoading();
        // $("body").append(`<div class="arts__modal___VpEAD-camelCase">
        // <form class="styles__container___1BPm9-camelCase">
        //     <div class="styles__text___KSL4--camelCase">In order to register, you must fill out a form.<br><br>Please fill out all fields.</div>
        //     <div class="styles__holder___3CEfN-camelCase">
        //         <div style="flex-direction: column;" class="styles__numRow___xh98F-camelCase">
        //         <div style="border: 3px solid rgba(0, 0, 0, 0.17); border-radius: 6px;width: 90%;height: 50px;margin: 0px;display: flex;flex-direction: row;align-items: center;">
        //         <input id="formAge" style="border: none;height: 40px;line-height: 40px;font-size: 28px;text-align: center;font-weight: 700;font-family: Nunito, sans-serif;color: #ffffff;background-color: #3f3f3f;outline: none;width: 100%;" placeholder="What is your age?" value="" style="width: 60px;"/>
        //         </div>
        //         <div style="border: 3px solid rgba(0, 0, 0, 0.17); border-radius: 6px;width: 90%;height: 50px;margin: 0px;display: flex;flex-direction: row;align-items: center;">
        //         <input id="formDiscord" style="border: none;height: 40px;line-height: 40px;font-size: 28px;text-align: center;font-weight: 700;font-family: Nunito, sans-serif;color: #ffffff;background-color: #3f3f3f;outline: none;width: 100%;" placeholder="What is your Discord tag?" value="" style="width: 60px;"/>
        //         </div>
        //         <div style="border: 3px solid rgba(0, 0, 0, 0.17); border-radius: 6px;width: 90%;height: 200px;margin: 0px;display: flex;flex-direction: row;align-items: center;">
        //         <textarea id="formBody" style="border: none;height: 200px;line-height: 40px;font-size: 28px;text-align: center;font-weight: 700;font-family: Nunito, sans-serif;color: #ffffff;background-color: #3f3f3f;outline: none;width: 100%; resize:none;" placeholder="Why do you want to play?"></textarea>
        //         </div>
        //         </div>
        //         </div>
        //         <div class="styles__buttonContainer___2EaVD-camelCase">
        //             <div id="submitButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
        //                 <div class="styles__shadow___3GMdH-camelCase"></div>
        //                 <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
        //                 <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Submit</div>
        //             </div>
        //             <div id="cancelButton" class="styles__button___1_E-G-camelCase styles__button___3zpwV-camelCase" role="button" tabindex="0">
        //                 <div class="styles__shadow___3GMdH-camelCase"></div>
        //                 <div class="styles__edge___3eWfq-camelCase" style="background-color: #2f2f2f;"></div>
        //                 <div class="styles__front___vcvuy-camelCase styles__buttonInside___39vdp-camelCase" style="background-color: #2f2f2f;">Cancel</div>
        //             </div>
        //         </div>
        //         <div style="font-size: 20px; line-height: 20px;" class="styles__text___KSL4--camelCase">This will be checked by a ${blacket.config.name} staff member. Please fill out all fields with REAL answers!</div>
        //     </div>
        // </form></div>`);
        // $(`.styles__container___1BPm9-camelCase`).submit((event) => {
        //     event.preventDefault();
        // });

            blacket.requests.post("/worker/register", {
                username: username,
                password: password
            }, (data) => {
                if (data.error) {
                    $(".styles__container___2VzTy-camelCase").append(`<div class="styles__errorContainer___1LbDZ-camelCase"><i class="styles__errorIcon___3JrS4-camelCase fas fa-times-circle" aria-hidden="true"></i><div class="styles__errorText___3OuU1-camelCase">${data.reason}</div></div>`);
                    blacket.stopLoading();
                    return;
                }
                blacket.stopLoading();
            });
    } else {
        setTimeout(() => {
            blacket.requests.post("/worker/login", {
                username: username,
                password: password
            }, (data) => {
                if (data.error) {
                    $(".styles__container___2VzTy-camelCase").append(`<div class="styles__errorContainer___1LbDZ-camelCase"><i class="styles__errorIcon___3JrS4-camelCase fas fa-times-circle" aria-hidden="true"></i><div class="styles__errorText___3OuU1-camelCase">${data.reason}</div></div>`);
                    blacket.stopLoading();
                } else window.location.href = "/stats";
            });
        }, 500);
    }
});