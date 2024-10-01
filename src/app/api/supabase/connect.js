import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://omntveugteziqkvruttc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tbnR2ZXVndGV6aXFrdnJ1dHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1MjUxMDQsImV4cCI6MjA0MzEwMTEwNH0.2l-1VjL-zFvNGkN8aV7EEeQYqcfVyO4RG5tVN6yHNMc"
);
