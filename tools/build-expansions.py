"""Compatibility command: regenerate the split handbook from shared source data."""
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name('build-pages.py')),run_name='__main__')
