async function getUser() {
  const username = document.getElementById("username").value;
  const errorText = document.getElementById("error");
  const card = document.getElementById("userCard");
  const repoList = document.getElementById("repoList");


  errorText.textContent = "";
  card.classList.add("hidden");
  repoList.innerHTML = "";

  try {

    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) {
      errorText.textContent = "User not found";
      return;
    }

    const data = await res.json();

    document.getElementById("avatar").src = data.avatar_url;
    document.getElementById("login").textContent = data.login;
    document.getElementById("bio").textContent =
      data.bio || "No bio available.";
    document.getElementById("followers").textContent = data.followers;
    document.getElementById("following").textContent = data.following;

   
    const reposRes = await fetch(data.repos_url);
    const repos = await reposRes.json();

    
    if (repos.length === 0) {
      repoList.innerHTML = "<li>No public repositories</li>";
    } else {
      repos.slice(0, data.public_repos).forEach((repo) => {
        const li = document.createElement("li");
        li.textContent = repo.name;
        repoList.appendChild(li);
      });
    }

    card.classList.remove("hidden");
  } catch (err) {
    console.error(err);
    errorText.textContent = "Something went wrong!";
  }
}
