    function showSection(sectionId) {
        var sections = document.querySelectorAll("main section");
        var links = document.querySelectorAll("nav a");
        var index;

        for (index = 0; index < sections.length; index++) {
            sections[index].classList.remove("active");
        }

        for (index = 0; index < links.length; index++) {
            links[index].classList.remove("active-link");
        }

        document.getElementById(sectionId).classList.add("active");

        var sectionHeading = document.querySelector("#" + sectionId + " h2");
        if (sectionHeading) {
            document.title = "My Music Hobby | " + sectionHeading.textContent.trim();
        }

        for (index = 0; index < links.length; index++) {
            if (links[index].getAttribute("href") === "#" + sectionId) {
                links[index].classList.add("active-link");
            }
        }
    }

    window.onload = function() {
        var links = document.querySelectorAll("nav a");
        var index;

        for (index = 0; index < links.length; index++) {
            links[index].onclick = function(event) {
                event.preventDefault();
                showSection(this.getAttribute("href").substring(1));
            };
        }

        showSection("what");
    };

