$("#search-box").keypress(function(event) {
    if (event.keyCode == "13") {
        $("#entries-body").find(".entries__body__item").remove();
        $("#entries-body").find(".text").remove();
        getEntry();
    }
});

$("#button").click(function() {
    $("#entries-body").find(".entries__body__item").remove();
    $("#entries-body").find(".text").remove();
    getEntry();
});

function getEntry() {

    const url = "https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=" + $("#search-box").val() + "&limit=10&format=json";

    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Api-User-Agent", "MyTest/9.9   (https://test.org/MyTest/; MyTest@test.org) Testest/1.9");
    xhr.send();
    xhr.onload = function() {

        const data = JSON.parse(this.response);
        const titles = data[1];
        const descriptions = data[2];
        const links = data[3];
        const input = document.getElementById("search-box");
        const app = document.getElementById("entries-body");

        if (titles.length === 0) {
            console.log(data);
            console.log("aaaa");
            const message = document.createElement("h2");
            message.className = "text text--style-body";
            message.textContent = `Sorry, no entries found... try again!`;
            app.appendChild(message);
        }

        for (let i = 0; i < titles.length; i++) {

            const card = document.createElement("div");
            card.className = "entries__body__item";
            app.appendChild(card);
            const entryLink = document.createElement("a");
            entryLink.setAttribute("href", links[i]);
            entryLink.setAttribute("target", "_blank");
            const entryTitle = document.createElement("h2");
            entryTitle.className = "text text--style-body text--type-bold";
            entryTitle.textContent = titles[i];
            card.appendChild(entryTitle);
            card.appendChild(entryLink);
            entryLink.appendChild(entryTitle);
            const entryDescription = document.createElement("p");
            entryDescription.className = "text text--style-body";
            entryDescription.textContent = descriptions[i];
            card.appendChild(entryDescription);
            entryLink.appendChild(entryDescription);

            if (descriptions[i] === "") {
                $("p").text(`Click to know more...`);
            }
        }
    }
}
