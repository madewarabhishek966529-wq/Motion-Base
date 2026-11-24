import { DesignTokenItem, GradientItem } from "@/types";

/**
 * Calculates relative luminance according to WCAG 2.1 specifications
 */
export function getRelativeLuminance(hex: string): number {
  const sanitized = hex.replace("#", "");
  if (sanitized.length !== 6 && sanitized.length !== 3) return 0.5;

  let r = 0, g = 0, b = 0;
  if (sanitized.length === 3) {
    r = parseInt(sanitized[0] + sanitized[0], 16) / 255;
    g = parseInt(sanitized[1] + sanitized[1], 16) / 255;
    b = parseInt(sanitized[2] + sanitized[2], 16) / 255;
  } else {
    r = parseInt(sanitized.substring(0, 2), 16) / 255;
    g = parseInt(sanitized.substring(2, 4), 16) / 255;
    b = parseInt(sanitized.substring(4, 6), 16) / 255;
  }

  const sRGB = [r, g, b].map((val) => {
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}

/**
 * Calculates WCAG contrast ratio between two hex colors (returns between 1.0 and 21.0)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return parseFloat(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

/**
 * Determines WCAG AA compliance (4.5:1 for normal text, 3:1 for large/UI components)
 */
export function checkWcagCompliance(ratio: number): {
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  level: "AAA" | "AA" | "AA Large" | "Fail";
} {
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;

  let level: "AAA" | "AA" | "AA Large" | "Fail" = "Fail";
  if (aaaNormal) level = "AAA";
  else if (aaNormal) level = "AA";
  else if (aaLarge) level = "AA Large";

  return { aaNormal, aaLarge, aaaNormal, level };
}

/**
 * Exports Design Tokens to CSS Custom Properties format (:root)
 */
export function exportToCssVariables(tokens: DesignTokenItem[]): string {
  const lines: string[] = [":root {"];

  tokens.forEach((token) => {
    const varName = `--${token.tokenName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
    if (token.tokenType === "color") {
      lines.push(`  ${varName}: ${token.tokenValue.hex || "#000000"}; /* ${token.provenance} */`);
    } else if (token.tokenType === "radius" || token.tokenType === "spacing") {
      lines.push(`  ${varName}: ${token.tokenValue.value || "0px"};`);
    } else if (token.tokenType === "typography") {
      lines.push(`  ${varName}-size: ${token.tokenValue.size || "16px"};`);
      if (token.tokenValue.family) lines.push(`  ${varName}-family: ${token.tokenValue.family};`);
    }
  });

  lines.push("}");
  return lines.join("\n");
}

/**
 * Exports Design Tokens to Tailwind CSS theme extension snippet
 */
export function exportToTailwindConfig(tokens: DesignTokenItem[]): string {
  const colors: Record<string, string> = {};
  const borderRadius: Record<string, string> = {};

  tokens.forEach((t) => {
    const key = t.tokenName.replace(/[^a-zA-Z0-9]/g, "");
    if (t.tokenType === "color" && t.tokenValue.hex) {
      colors[key] = t.tokenValue.hex;
    } else if (t.tokenType === "radius" && t.tokenValue.value) {
      borderRadius[key] = t.tokenValue.value;
    }
  });

  const configObj = {
    theme: {
      extend: {
        colors,
        borderRadius,
      },
    },
  };

  return `// tailwind.config.js\nmodule.exports = ${JSON.stringify(configObj, null, 2)};`;
}

/**
 * Exports Design Tokens to W3C Design Tokens Community Group (DTCG) specification format
 */
export function exportToW3cFormat(tokens: DesignTokenItem[]): string {
  const result: Record<string, any> = {
    $description: "Motionbase Extracted Design Tokens",
    $version: "1.0.0",
  };

  tokens.forEach((t) => {
    const category = t.tokenType;
    if (!result[category]) result[category] = {};

    result[category][t.tokenName] = {
      $value: t.tokenType === "color" ? t.tokenValue.hex : t.tokenValue.value || t.tokenValue,
      $type: t.tokenType,
      $extensions: {
        "motionbase:provenance": t.provenance,
        "motionbase:confidence": t.confidence,
        "motionbase:evidence": t.evidenceNote || null,
      },
    };
  });

  return JSON.stringify(result, null, 2);
}
