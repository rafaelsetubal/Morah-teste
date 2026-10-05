from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
root=Path('outputs/Morah')
with ZipFile('outputs/Morah-catalogo-dotnet10.zip','w',ZIP_DEFLATED) as archive:
    for path in root.rglob('*'):
        if path.is_file() and not any(x in ('bin','obj','.vs') for x in path.parts):
            archive.write(path,Path('Morah')/path.relative_to(root))
    archive.write('outputs/componentes-busca-e-catalogo.md','componentes-busca-e-catalogo.md')
print('Source package ready')
