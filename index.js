const githubUsername = "kingpranav21";
const userAvatarElement = document.getElementById("user-avatar");
const userNameElement = document.getElementById("user-name");
const userBioElement = document.getElementById("user-bio");
const userLocationElement = document.getElementById("user-location");

const userSocialLinksElement = document.getElementById("user-social-links");
const repoListElement = document.getElementById("repo-list");
let currentPage = 1;
let reposPerPage = parseInt(document.getElementById("reposPerPage").value);

// Fetch user profile information
fetch(`https://api.github.com/users/${githubUsername}`)
  .then((response) => response.json())
  .then((user) => {
    userAvatarElement.src = user.avatar_url;
    userNameElement.textContent = user.name || user.login;
    userBioElement.textContent = user.bio || "No bio available";
    userLocationElement.textContent = `Location: ${
      user.location || "Not specified"
    }`;

    if (user.twitter_username) {
      userSocialLinksElement.innerHTML += `<a href="https://twitter.com/${user.twitter_username}" target="_blank" class="social-link">Twitter</a>`;
    }
    if (user.blog) {
      userSocialLinksElement.innerHTML += `<a href="${user.blog}" target="_blank" class="social-link">Blog</a>`;
    }
  })
  .catch((error) => {
    console.error("Error fetching GitHub profile:", error);
  });

function fetchRepositories() {
  fetch(
    `https://api.github.com/users/${githubUsername}/repos?page=${currentPage}&per_page=${reposPerPage}`
  )
    .then((response) => response.json())
    .then((repos) => {
      repoListElement.innerHTML = "";

      repos.forEach((repo) => {
        const repoItem = document.createElement("li");
        repoItem.className = "repo-item";
        repoItem.innerHTML = `
                            <h3>${repo.name}</h3>
                            <p>${
                              repo.description || "No description available"
                            }</p>
                            <div class="language-container">
                                ${
                                  repo.language
                                    ? `<button class="language-button">${repo.language}</button>`
                                    : ""
                                }
                            </div>
                           
                            <a href="${
                              repo.html_url
                            }" target="_blank">View on GitHub</a>
                        `;
        repoListElement.appendChild(repoItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching GitHub repositories:", error);
    });
}

// Initial fetch when the page loads
fetchRepositories();
