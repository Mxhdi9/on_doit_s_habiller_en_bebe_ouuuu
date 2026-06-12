$ErrorActionPreference = "Stop"

$repo = Split-Path -Parent $MyInvocation.MyCommand.Path

$targets = @(
  "assets\images\archive",
  "assets\images\subjects",
  "assets\videos\archive",
  "assets\audio"
)

foreach ($target in $targets) {
  New-Item -ItemType Directory -Path (Join-Path $repo $target) -Force | Out-Null
}

$copies = @(
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\accueil.png"; Target = "assets\images\archive\accueil.png" },
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\cam1.png"; Target = "assets\images\archive\cam1.png" },
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\cam2.png"; Target = "assets\images\archive\cam2.png" },
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\cam3.png"; Target = "assets\images\archive\cam3.png" },
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\cam4.png"; Target = "assets\images\archive\cam4.png" },
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\cam5.png"; Target = "assets\images\archive\cam5.png" },
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\cam6.png"; Target = "assets\images\archive\cam6.png" },
  @{ Source = "D:\Projet ASCALON\Dex.png"; Target = "assets\images\dex.png" },
  @{ Source = "C:\Users\MEHDI\Desktop\Nadir.png"; Target = "assets\images\subjects\nadir.png" },
  @{ Source = "C:\Users\MEHDI\Desktop\panam.png"; Target = "assets\images\subjects\panam.png" },
  @{ Source = "C:\Users\MEHDI\AppData\Local\Temp\codex-clipboard-38364af9-5658-4dcb-99ba-4c41dfcc5112.png"; Target = "assets\images\subjects\cain-voss.png" },
  @{ Source = "D:\Projet ASCALON\Jeu Navigateur\camchambre1.mp4"; Target = "assets\videos\archive\camchambre1.mp4" },
  @{ Source = "C:\Users\MEHDI\Documents\GitHub\on_doit_s_habiller_en_bebe_ouuuu\assets\audio\ascalon-ambient.mp3"; Target = "assets\audio\ascalon-ambient.mp3" }
)

foreach ($copy in $copies) {
  $destination = Join-Path $repo $copy.Target
  if (-not (Test-Path -LiteralPath $copy.Source)) {
    Write-Host "SOURCE INTROUVABLE : $($copy.Source)" -ForegroundColor Red
    continue
  }

  Copy-Item -LiteralPath $copy.Source -Destination $destination -Force
  Write-Host "OK : $($copy.Target)" -ForegroundColor Green
}

Write-Host ""
Write-Host "Medias Vercel copies. Tu peux maintenant commit/push le repo." -ForegroundColor Cyan
