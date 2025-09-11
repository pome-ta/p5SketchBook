from __future__ import annotations

from dataclasses import dataclass, field, InitVar, asdict
from pathlib import Path
import json


@dataclass
class FileNode:
  path_obj: InitVar[Path]
  root_str: InitVar[str | None]
  name: str = field(init=False)
  type: str
  path: str = field(init=False)
  suffix: str = field(init=False)
  parent: str = field(init=False)
  st_ctime: float = field(init=False)
  st_mtime: float = field(init=False)
  children: list[FileNode] | None = None

  def __post_init__(self, path_obj, root_str):
    _path = path_obj.relative_to(root_str) if root_str else path_obj
    self.path = str(_path)
    self.parent = str(_path.parent)

    self.name = path_obj.name
    self.suffix = ''.join(path_obj.suffix)
    self.st_ctime = path_obj.stat().st_ctime
    self.st_mtime = path_obj.stat().st_mtime


def build_tree(path: Path, root: str | None = None) -> FileNode:
  if path.is_dir():
    children = [build_tree(child, root) for child in sorted(path.iterdir())]
    return FileNode(path, root, type='dir', children=children)
  else:
    return FileNode(path, root, type='file')


if __name__ == '__main__':
  root_path_str = './docs/'
  target_dir_str = 'sketchBooks'
  save_path_srt = './docs'

  target_path = Path(root_path_str, target_dir_str)

  tree_node = build_tree(target_path, root_path_str)
  tree_dict = asdict(tree_node)
  tree_json = json.dumps([tree_dict,], ensure_ascii=False, indent=2)

  json_file = Path(save_path_srt, 'tree.json')
  json_file.write_text(tree_json, encoding='utf-8')

