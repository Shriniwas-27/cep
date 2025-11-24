// Initialize Supabase
const supabaseClient = supabase.createClient(
  "https://byrqewqijxzbksbeavzl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5cnFld3Fpanh6YmtzYmVhdnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDk3OTAsImV4cCI6MjA3ODc4NTc5MH0.tIso8wmZWF1MyZm17imeHrGZXv0smuNaGWYkWycKdsw"
);

// LOGIN FUNCTION
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login success!");
  window.location.href = "admin.html"; // redirect
}

// SIGNUP FUNCTION
async function signup() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const division = document.getElementById("division").value;
  const branch = document.getElementById("branch").value;
  const course = document.getElementById("course").value;
  const age = document.getElementById("age").value;

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  const userId = data.user.id;

  const { error: insertError } = await supabaseClient.from("profiles").insert([
    { id: userId, name, phone, division, branch, course, age }
  ]);

  if (insertError) {
    alert(insertError.message);
    return;
  }

  alert("Account created successfully! Now login");
  window.location.reload();
}
