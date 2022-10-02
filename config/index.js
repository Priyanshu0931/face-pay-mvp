import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://snstrvxjpdmisdkurtdu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuc3RydnhqcGRtaXNka3VydGR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ3MjkwNDUsImV4cCI6MTk4MDMwNTA0NX0.GRNn9NqAM3XHGHG2VYuh0pqKUZBfDabAoMu4Lbx-Bc4"
);

export { supabase };
