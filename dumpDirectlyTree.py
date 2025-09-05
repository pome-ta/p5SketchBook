from __future__ import annotations

from dataclasses import dataclass, field, InitVar, asdict
from pathlib import Path
import json

from pprint import pprint


@dataclass
class FileNode:
  path_obj: InitVar[Path]
  name: str = field(init=False)
  type: str
  path: str = field(init=False)
  suffix: str = field(init=False)
  parent: str = field(init=False)
  st_ctime: float = field(init=False)
  st_mtime: float = field(init=False)
  children: list[FileNode] | None = None

  def __post_init__(self, path_obj):
    self.name = path_obj.name
    self.path = str(path_obj)
    self.suffix = ''.join(path_obj.suffix)
    self.parent = str(path_obj.parent)
    self.st_ctime = path_obj.stat().st_ctime
    self.st_mtime = path_obj.stat().st_mtime


def build_tree(path: Path) -> FileNode:
  if path.is_dir():
    children = [build_tree(child) for child in sorted(path.iterdir())]
    return FileNode(path, type='dir', children=children)
  else:
    return FileNode(path, type='file')


def main(root_path: Path):
  for g in root_path.rglob('*'):
    print(type(g))


if __name__ == '__main__':
  target_path_str = './sounds'
  save_path_srt = './docs'

  target_path = Path(target_path_str)

  #main(target_path)
  tree = build_tree(target_path)
  a = asdict(tree)
  s = json.dumps(a, ensure_ascii=False, indent=2)

  #pprint(a)
  print(s)

