// Store profiles (this can be replaced with a backend API)
const profiles = JSON.parse(localStorage.getItem("profiles")) || [];

// Handle form submission
const form = document.getElementById("profile-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const username = document.getElementById("instagram").value; // Get IG username
    const instagram = `https://instagram.com/${username}`; // Generate IG link
    const photo = document.getElementById("photo").files[0];

    const reader = new FileReader();
    reader.onload = () => {
      const newProfile = { name, instagram, photo: reader.result };
      profiles.push(newProfile);
      localStorage.setItem("profiles", JSON.stringify(profiles)); // Save to local storage

      alert("Profile created successfully!");
      window.location.href = "view.html";
    };
    reader.readAsDataURL(photo);
  });
}

// Render profiles
const profilesDiv = document.getElementById("profiles");
if (profilesDiv) {
  profiles.forEach((profile) => {
    const profileCard = document.createElement("div");
    profileCard.className = "profile-card";
    profileCard.innerHTML = `
      <img src="${profile.photo}" alt="${profile.name}'s Photo">
      <h3>${profile.name}</h3>
      <a href="${profile.instagram}" target="_blank">@${profile.instagram
      .split("/")
      .pop()}</a>
    `;
    profilesDiv.appendChild(profileCard);
  });
}
