Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts","*.json" | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName)
  if ($content -match "966501234567") {
    $newContent = $content -replace "966501234567","966539388072"
    [System.IO.File]::WriteAllText($_.FullName, $newContent)
    Write-Output "Updated: $($_.FullName)"
  }
}
