import os
import json
from supabase import create_client, Client
from dotenv import load_dotenv

def main():
    load_dotenv(r"d:\Hackathon Projects\Root-Claim\backend\.env")
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    
    if not url or not key:
        print("Missing SUPABASE_URL or SUPABASE_KEY.")
        return
        
    print(f"Connecting to Supabase at {url}")
    supabase = create_client(url, key)
    
    print("Deleting all submitted claims...")
    try:
        # Supabase Python client requires a filter for delete
        res = supabase.table("claims").delete().neq("title", "dummy_never_exists_123").execute()
        print(f"Deleted {len(res.data)} claims.")
    except Exception as e:
        print(f"Failed to delete claims: {e}")
        
    print("Clearing reports.json...")
    try:
        reports_path = r"d:\Hackathon Projects\Root-Claim\backend\data\reports.json"
        if os.path.exists(reports_path):
            with open(reports_path, "w") as f:
                json.dump([], f)
            print("reports.json cleared.")
    except Exception as e:
        print(f"Failed to clear reports: {e}")
        
    print("Database and reports successfully reset to 0.")

if __name__ == "__main__":
    main()
