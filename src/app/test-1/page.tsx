import { ColorSchemePreview } from '@/components/test/color-scheme-preview';

export default function Test1() {
  return (
    <ColorSchemePreview
      name="1. Clean White & Blue"
      bg="#ffffff"
      bgGradient="linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)"
      cardBg="#ffffff"
      cardBorder="#e2e8f0"
      accent="#2563eb"
      accentDark="#1d4ed8"
      accentSubtle="rgba(37, 99, 235, 0.06)"
      text="#0f172a"
      textMuted="#64748b"
      textSubtle="#94a3b8"
      buttonBg="#2563eb"
      buttonText="#ffffff"
      tagBg="rgba(37, 99, 235, 0.08)"
      tagText="#2563eb"
      tagBorder="rgba(37, 99, 235, 0.2)"
      navBg="rgba(255, 255, 255, 0.95)"
      navActive="#2563eb"
      navInactive="#94a3b8"
    />
  );
}
