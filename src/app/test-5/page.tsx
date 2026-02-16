import { ColorSchemePreview } from '@/components/test/color-scheme-preview';

export default function Test5() {
  return (
    <ColorSchemePreview
      name="5. Light & Rose Pink"
      bg="#fffbfb"
      bgGradient="linear-gradient(180deg, #fff1f2 0%, #fffbfb 100%)"
      cardBg="#ffffff"
      cardBorder="#fecdd3"
      accent="#e11d48"
      accentDark="#be123c"
      accentSubtle="rgba(225, 29, 72, 0.06)"
      text="#1a1114"
      textMuted="#78716c"
      textSubtle="#a8a29e"
      buttonBg="#e11d48"
      buttonText="#ffffff"
      tagBg="rgba(225, 29, 72, 0.08)"
      tagText="#e11d48"
      tagBorder="rgba(225, 29, 72, 0.2)"
      navBg="rgba(255, 251, 251, 0.95)"
      navActive="#e11d48"
      navInactive="#a8a29e"
    />
  );
}
