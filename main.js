async function getUser() {
  const username = document.getElementById("username").value;
  var res = await fetch(`https://api.github.com/users/${username}`);
    var data = await res.json();
    if (!res.ok) {
     alert("invaild user");
    }
    console.log(data.html_url);

}

getUser().then