const supabaseUrl = "https://xuurcevftflsyrwnaigu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1dXJjZXZmdGZsc3lyd25haWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzExMDcsImV4cCI6MjA3NjIwNzEwN30.KsVM5bDgUOmLlqmYZvqIuNvO4MZK8F7bD4OBojezW_w";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export async function registerUser(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        displayName: name,
      },
    },
  });

  if (data) {
    return data;
  } else {
    return null;
  }
}

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;

    return null;
  } else {
    return data;
  }
}

export async function retrieveSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
    return null;
  } else {
    return data;
  }
}
