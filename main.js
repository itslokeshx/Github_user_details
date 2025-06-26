async function getUser() {
  const username = document.getElementById("username").value;
  const result = document.getElementById("result");
  result.innerHTML = "";

  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      result.innerHTML = `<p style="color:red;">User not found</p>`;
      return;
    }

    const data = await res.json();

    const reposRes = await fetch(data.repos_url);
    const repos = await reposRes.json();

    result.innerHTML = `
        <div class="user-card">
          <div class="user-header">
            <img src="${data.avatar_url}" alt="Profile" />
            <div class="user-meta">
              <h2>${data.login}</h2>
              <div class="bio">${data.bio || "No bio available."}</div>
            </div>
          </div>
  
          <div class="stats">
            <div>Followers: ${data.followers}</div>
            <div>Following: ${data.following}</div>
          </div>
  
          <div class="repos">
            <h3>Public Repos</h3>
            <ul>
              ${repos
                .slice(0, 6)
                .map((repo) => `<li>${repo.name}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      `;
  } catch (err) {
    result.innerHTML = `<p style="color:red;">Something went wrong</p>`;
    console.error(err);
  }
}
