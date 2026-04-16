import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabase = createClient(
  "https://flunkezgleipfsliddel.supabase.co",
  "sb_publishable_vODlS3vfAOXUL-N-P-EBsQ_dYZXCY_K"
);

// REGISTER
window.register = async () => {
  const email = user.value;
  const password = pass.value;

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) alert(error.message);
  else alert("node created");
};

// LOGIN
window.login = async () => {
  const email = user.value;
  const password = pass.value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) alert("denied");
  else window.location.href = "index.html";
};

// CREATE POST
window.createPost = async () => {
  const { data: userData } = await supabase.auth.getUser();

  if (!userData.user) {
    alert("login first");
    return;
  }

  const content = document.getElementById("post").value;

  await supabase.from("posts").insert([
    { content, user_id: userData.user.id }
  ]);

  loadPosts();
};

// LOAD POSTS
async function loadPosts() {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const container = document.getElementById("posts");
  container.innerHTML = "";

  data.forEach(post => {
    container.innerHTML += `
      <div class="thread">
        <p>${post.content}</p>
        <small>${post.created_at}</small>
      </div>
    `;
  });
}

window.onload = loadPosts;
```
