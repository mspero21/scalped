import { ColorSchemePreview } from '@/components/test/color-scheme-preview';

export default function Test3() {
  return (
    <ColorSchemePreview
      name="3. Light & Orange/Amber"
      bg="#fffbf5"
      bgGradient="linear-gradient(180deg, #fff7ed 0%, #fffbf5 100%)"
      cardBg="#ffffff"
      cardBorder="#fed7aa"
      accent="#ea580c"
      accentDark="#c2410c"
      accentSubtle="rgba(234, 88, 12, 0.06)"
      text="#1a1512"
      textMuted="#78716c"
      textSubtle="#a8a29e"
      buttonBg="#ea580c"
      buttonText="#ffffff"
      tagBg="rgba(234, 88, 12, 0.08)"
      tagText="#ea580c"
      tagBorder="rgba(234, 88, 12, 0.2)"
      navBg="rgba(255, 251, 245, 0.95)"
      navActive="#ea580c"
      navInactive="#a8a29e"
    />
  );
}
