import { ColorSchemePreview } from '@/components/test/color-scheme-preview';

export default function Test2() {
  return (
    <ColorSchemePreview
      name="2. Warm White & Emerald"
      bg="#fafaf9"
      bgGradient="linear-gradient(180deg, #f5f5f4 0%, #fafaf9 100%)"
      cardBg="#ffffff"
      cardBorder="#e7e5e4"
      accent="#059669"
      accentDark="#047857"
      accentSubtle="rgba(5, 150, 105, 0.06)"
      text="#1c1917"
      textMuted="#57534e"
      textSubtle="#a8a29e"
      buttonBg="#059669"
      buttonText="#ffffff"
      tagBg="rgba(5, 150, 105, 0.08)"
      tagText="#059669"
      tagBorder="rgba(5, 150, 105, 0.2)"
      navBg="rgba(250, 250, 249, 0.95)"
      navActive="#059669"
      navInactive="#a8a29e"
    />
  );
}
