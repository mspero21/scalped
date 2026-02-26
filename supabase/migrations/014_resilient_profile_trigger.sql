-- Make the handle_new_user trigger resilient so it never blocks user creation.
-- Previously: trigger could fail with UNIQUE violation if the same email was used
-- twice (e.g., after deleting a user without deleting their profile row), which
-- caused the Supabase admin API to return a 500 "Internal Server Error".

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (new.id, new.email, split_part(new.email, '@', 1))
  ON CONFLICT (user_id) DO NOTHING;
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Never fail user creation due to profile trigger errors
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
