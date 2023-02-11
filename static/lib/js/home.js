$(function reset() {
  if (blacket.config) {
    $(".styles__logoText___1eUDm-camelCase").html(`${blacket.config.name}`);
    blacket.config.welcome = blacket.config.welcome.split(" ").join("<br>");
    blacket.config.welcome = blacket.config.welcome.replaceAll("[<br>]", " ");
    blacket.config.description = blacket.config.description.split(", ").join("<br>");
    blacket.config.description = blacket.config.description.replaceAll("[,]", ",");
    $(".styles__welcomeDesc___OyjZk-camelCase").html(blacket.config.description);
    $(".styles__welcomeText___30V14-camelCase").html(blacket.config.welcome);
    $(".styles__pronounceButton___3lV1b-camelCase").html(`<i class="fas fa-volume-up" aria-hidden="true"></i>&nbsp; Pronunciation ("${blacket.config.pronunciation}")`);
    $(".styles__pronounceButton___3lV1b-camelCase").click(() => new Audio('/content/pronunciation.ogg').play());
    $(".styles__copyrightInformation___f4Dky-camelCase").html(`We are not affiliated with Blooket in any way.<br>Please do not contact Blooket about any issues you may have with ${blacket.config.name}.<br>${blacket.config.name} © ${new Date().getFullYear()} All Rights Reserved.`);
    $(".styles__versionInformation___rk3A2-camelCase").html(`Running v${blacket.config.version}`);
    blacket.stopLoading();
  } else setTimeout(reset, 1);
});