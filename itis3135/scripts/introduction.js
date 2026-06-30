document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("intro-form");
    const formSection = document.getElementById("form-section");
    const resultSection = document.getElementById("result-section");
    const coursesContainer = document.getElementById("courses-container");
    const addCourseButton = document.getElementById("add-course");
    const clearButton = document.getElementById("clear-form");
    const pictureInput = document.getElementById("picture");
    const defaultPicture = "images3135/bld.png";

    const getValue = (id) => document.getElementById(id).value.trim();

    const escapeHTML = (text) => String(text).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[char]));

    function getPictureSource(callback) {
        const file = pictureInput.files[0];

        if (!file) {
            callback(defaultPicture);
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            callback(reader.result);
        };

        reader.readAsDataURL(file);
    }

    addCourseButton.addEventListener("click", () => {
        const newCourse = document.createElement("div");
        newCourse.className = "course-entry";

        newCourse.innerHTML = `
            <label>Department:</label>
            <input type="text" class="course-department" placeholder="Example: ITIS" required>

            <label>Course Number:</label>
            <input type="text" class="course-number" placeholder="Example: 3135" required>

            <label>Course Name:</label>
            <input type="text" class="course-name" placeholder="Course name" required>

            <label>Reason for Taking:</label>
            <input type="text" class="course-reason" placeholder="Reason for taking this course" required>

            <button type="button" class="delete-course">Delete Course</button>
        `;

        coursesContainer.appendChild(newCourse);
    });

    coursesContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("delete-course")) {
            const courseEntry = event.target.closest(".course-entry");
            courseEntry.remove();
        }
    });

    clearButton.addEventListener("click", () => {
        form.querySelectorAll("input, textarea").forEach((field) => {
            field.value = "";
        });

        pictureInput.value = "";
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            pictureInput.value = "";
            resultSection.innerHTML = "";
            formSection.style.display = "block";
        }, 0);
    });

    function getCoursesHTML() {
        const courses = document.querySelectorAll(".course-entry");

        return Array.from(courses).map((course) => {
            const department = escapeHTML(course.querySelector(".course-department").value.trim());
            const number = escapeHTML(course.querySelector(".course-number").value.trim());
            const name = escapeHTML(course.querySelector(".course-name").value.trim());
            const reason = escapeHTML(course.querySelector(".course-reason").value.trim());

            return `
                <li>
                    <strong>${department} ${number} - ${name}:</strong>
                    ${reason}
                </li>
            `;
        }).join("");
    }

    function getLinksHTML() {
        const divider = escapeHTML(getValue("divider"));

        const linkData = [
            ["link-one-name", "link-one-url"],
            ["link-two-name", "link-two-url"],
            ["link-three-name", "link-three-url"],
            ["link-four-name", "link-four-url"],
            ["link-five-name", "link-five-url"]
        ];

        return linkData.map(([nameId, urlId]) => {
            const name = escapeHTML(getValue(nameId));
            const url = escapeHTML(getValue(urlId));

            if (!name || !url) {
                return "";
            }

            return `<a href="${url}">${name}</a>`;
        }).filter(Boolean).join(` ${divider} `);
    }

    function optionalListItem(label, value) {
        if (!value.trim()) {
            return "";
        }

        return `
            <li>
                <strong>${label}:</strong>
                ${escapeHTML(value)}
            </li>
        `;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        getPictureSource((pictureSource) => {
            const firstName = escapeHTML(getValue("first-name"));
            const middleName = escapeHTML(getValue("middle-name"));
            const lastName = escapeHTML(getValue("last-name"));
            const fullName = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, " ").trim();

            resultSection.innerHTML = `
                <h2>Introduction Form</h2>

                <h3>${fullName}</h3>

                <figure>
                    <img src="${pictureSource}" alt="${fullName}">
                    <figcaption>${escapeHTML(getValue("picture-caption"))}</figcaption>
                </figure>

                <ul>
                    <li>
                        <strong>Personal Background:</strong>
                        ${escapeHTML(getValue("personal-background"))}
                    </li>

                    <li>
                        <strong>Professional Background:</strong>
                        ${escapeHTML(getValue("professional-background"))}
                    </li>

                    <li>
                        <strong>Academic Background:</strong>
                        ${escapeHTML(getValue("academic-background"))}
                    </li>

                    <li>
                        <strong>Background in this Subject:</strong>
                        ${escapeHTML(getValue("subject-background"))}
                    </li>

                    <li>
                        <strong>Primary Computer Platform:</strong>
                        ${escapeHTML(getValue("platform"))}
                    </li>

                    <li>
                        <strong>Courses I'm Taking &amp; Why:</strong>

                        <ul>
                            ${getCoursesHTML()}
                        </ul>
                    </li>

                    ${optionalListItem("Funny/Interesting Item to Remember Me By", getValue("funny-thing"))}

                    <li>
                        <strong>Graduating:</strong>
                        Fall 2026.
                    </li>

                    <li>
                        <strong>From North Carolina?:</strong>
                        No. I am originally from Philadelphia, Pennsylvania.
                    </li>

                    ${optionalListItem("I'd Also Like to Share", getValue("share"))}

                    <li>
                        <strong>Favorite Quote:</strong>
                        "${escapeHTML(getValue("quote"))}"
                        <em>— ${escapeHTML(getValue("quote-author"))}</em>
                    </li>
                </ul>

                <p>${getLinksHTML()}</p>

                <p>
                    <a href="introduction_form.html">Reset Form</a>
                </p>
            `;

            formSection.style.display = "none";
            resultSection.scrollIntoView();
        });
    });
});