"""Build Vercel's static output from explicitly public portfolio files."""
from pathlib import Path
from shutil import copyfile
from h1cloud_portfolio import PUBLIC_FILE, SITE_PATHS

output = Path("public-dist")
for source_root in map(Path, SITE_PATHS):
    files = [source_root] if source_root.is_file() else source_root.rglob("*")
    for path in files:
        if path.is_file() and PUBLIC_FILE.fullmatch(path.as_posix()) and path.resolve().is_relative_to(Path.cwd()):
            dest = output / path
            dest.parent.mkdir(parents=True, exist_ok=True)
            copyfile(path, dest)
